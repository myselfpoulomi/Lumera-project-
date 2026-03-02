
# JWT Session Flow in Your Project

Here’s how the JWT-based session works end-to-end in your app.

---

## 1. What Is a JWT?

A **JWT (JSON Web Token)** is a signed string that encodes data (e.g. user id). It has three parts:

- **Header** – algorithm and type
- **Payload** – data (e.g. `{ id: "user-123" }`)
- **Signature** – created with a secret so the server can verify it wasn’t changed

Your server creates it with:

```5:11:server/src/lib/jwt.ts
export const generateToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};
```

So the token is a signed “proof” that the server issued it for that user.

---

## 2. High-Level Flow

```
┌─────────────┐                    ┌─────────────┐
│   Browser   │                    │   Server    │
│  (Client)   │                    │  (Express)  │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │  1. POST /login (email, password) │
       │ ───────────────────────────────>│
       │                                  │
       │                    2. Verify credentials
       │                    3. Create JWT
       │                    4. Set cookie "token"
       │                                  │
       │  5. Response + Set-Cookie header │
       │ <───────────────────────────────│
       │                                  │
       │  (Browser stores cookie)         │
       │                                  │
       │  6. GET /me (cookie sent auto)   │
       │ ───────────────────────────────>│
       │                                  │
       │                    7. Read cookie
       │                    8. Verify JWT
       │                    9. Return user
       │                                  │
       │  10. User data                   │
       │ <───────────────────────────────│
       │                                  │
```

---

## 3. Step-by-Step Flow

### Phase A: Login or Register

**1. User submits credentials**

- Login: `POST /api/auth/login` with `{ email, password }`
- Register: `POST /api/auth/register` with `{ name, email, password, otp }`

**2. Server validates**

- Checks email/password (or OTP for register)
- If invalid → 401

**3. Server creates JWT**

```119:121:server/src/controllers/auth.controllers.ts
    const token = generateToken(existingUser.id);
    res.cookie("token", token, COOKIE_OPTIONS);
    return res.status(200).json({ message: "Login successful", user: existingUser });
```

- `generateToken(userId)` creates a signed token with `{ id: userId }` and 7-day expiry
- `res.cookie("token", token, COOKIE_OPTIONS)` sends a `Set-Cookie` header

**4. Cookie options**

```10:16:server/src/controllers/auth.controllers.ts
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};
```

- `httpOnly: true` – JavaScript cannot read it (helps against XSS)
- `sameSite: "lax"` – sent on same-site requests
- `maxAge` – 7 days
- `path: "/"` – sent for all paths on your domain

**5. Response**

- Body: `{ message, user }`
- Header: `Set-Cookie: token=<jwt>; HttpOnly; ...`

**6. Browser**

- Stores the cookie
- Sends it automatically on future requests to the same origin

---

### Phase B: App Load / Page Refresh

**1. AuthContext runs on mount**

```34:57:client/src/contexts/AuthContext.tsx
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const u = data.user;
          setUserState({
            id: u.id,
            name: u.name,
            email: u.email,
            createdAt: u.createdAt ?? new Date().toISOString(),
          });
        } else {
          setUserState(null);
        }
      } catch {
        setUserState(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);
```

**2. `credentials: "include"`**

- Sends cookies with the request
- Without it, the browser would not send the auth cookie

**3. Route**

```18:18:server/src/routers/auth.routes.ts
router.get("/me", requireAuth, getMe);
```

- `requireAuth` runs first
- If it passes, `getMe` runs

**4. `requireAuth` middleware**

```8:21:server/src/middleware/auth.middleware.ts
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = verifyToken(token) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch {
    res.clearCookie("token", { path: "/" });
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
```

- Reads `req.cookies.token` (parsed by `cookie-parser`)
- If no token → 401
- If token invalid → clear cookie and 401
- If valid → sets `req.user = { id }` and calls `next()`

**5. `getMe` controller**

```163:180:server/src/controllers/auth.controllers.ts
async function getMe(req: AuthRequest, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!user) {
      res.clearCookie("token", { path: "/" });
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get Me Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
```

- Uses `req.user.id` from the middleware
- Loads user from DB and returns it
- If user not found → clear cookie and 404

**6. Client**

- Sets `user` in state
- UI shows logged-in state

---

### Phase C: Protected Actions (e.g. Delete Account)

**1. User clicks “Delete account”**

**2. Client calls**

```typescript
fetch(`${API_BASE}/delete-account`, {
  method: "DELETE",
  credentials: "include",  // ← sends cookie
});
```

**3. Route**

```21:21:server/src/routers/auth.routes.ts
router.delete("/delete-account", requireAuth, deleteUser);
```

- `requireAuth` runs first
- If it passes, `deleteUser` runs

**4. `deleteUser`**

```187:209:server/src/controllers/auth.controllers.ts
async function deleteUser(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    // ...
    await prisma.user.delete({
      where: { id: userId },
    });

    res.clearCookie("token", { path: "/" });
    return res.status(200).json({ message: "Account deleted successfully" });
```

- Uses `req.user.id` from the JWT (never from the request body)
- Deletes the user and clears the cookie

---

### Phase D: Logout

**1. User clicks “Log out”**

**2. Client calls**

```70:81:client/src/contexts/AuthContext.tsx
  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
    }
  }, [setUser]);
```

**3. Server**

```183:186:server/src/controllers/auth.controllers.ts
async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token", { path: "/" });
  return res.status(200).json({ message: "Logged out successfully" });
}
```

- Clears the cookie
- Client sets `user` to `null`

---

## 4. Server Setup That Makes It Work

1. **`cookie-parser`** – parses cookies into `req.cookies`
2. **`cors({ credentials: true })`** – allows cookies from the frontend origin
3. **`credentials: "include"`** – client sends cookies with the request

---

## 5. Summary Diagram

```
LOGIN/REGISTER:
  Client → POST /login or /register
  Server → validate → create JWT → Set-Cookie
  Browser → stores cookie

EVERY REQUEST (to protected routes):
  Browser → sends cookie automatically (if credentials: "include")
  Server → cookie-parser reads req.cookies.token
  Server → requireAuth verifies JWT → sets req.user
  Controller → uses req.user.id

LOGOUT:
  Client → POST /logout (with cookie)
  Server → res.clearCookie("token")
  Client → setUser(null)
```

---

## 6. Why Use Cookie vs localStorage?

| Storage | Pros | Cons |
|--------|------|------|
| **localStorage** | Easy to use | JS can read it → vulnerable to XSS |
| **HttpOnly cookie** | JS cannot read it → safer | More setup (cookie-parser, CORS, credentials) |

Your setup uses an HttpOnly cookie so the token is never exposed to JavaScript.

---

## 7. Quick Reference

| Concept | Where |
|--------|--------|
| Create JWT | `generateToken()` in `jwt.ts` |
| Verify JWT | `verifyToken()` in `jwt.ts` |
| Set cookie | `res.cookie("token", token, COOKIE_OPTIONS)` in login/register |
| Read cookie | `req.cookies?.token` in `requireAuth` |
| Clear cookie | `res.clearCookie("token", { path: "/" })` in logout/delete |
| Protect route | `router.get("/me", requireAuth, getMe)` |
| Send cookie | `credentials: "include"` in fetch |