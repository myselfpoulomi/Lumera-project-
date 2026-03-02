import { useState, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OTP_LENGTH = 4;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = (location.state as { email?: string })?.email ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
        const newOtp = [...otp];
        digits.forEach((digit, i) => {
          if (index + i < OTP_LENGTH) {
            newOtp[index + i] = digit;
          }
        });
        setOtp(newOtp);
        const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
        inputRefs.current[nextIndex]?.focus();
        return;
      }

      const digit = value.replace(/\D/g, "").slice(-1);
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);

      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const digits = pastedData.split("");
    const newOtp = Array(OTP_LENGTH).fill("");
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  }, []);

const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();

  const otpString = otp.join("");
  if (otpString.length !== OTP_LENGTH) return;

  setIsVerifying(true);

  try {
    const { name, password } =
      (location.state as { name?: string; password?: string }) ?? {};

    const response = await fetch(
      "http://localhost:3000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          otp: otpString,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    const { id, name: userName, email: userEmail, createdAt } = data.user;
    login({ id, name: userName, email: userEmail, createdAt: createdAt ?? new Date().toISOString() });

    alert("Account created successfully 🎉");
    navigate("/", { replace: true });

  } catch (error: any) {
    alert(error.message || "Something went wrong");
  } finally {
    setIsVerifying(false);
  }
};

const handleResend = async () => {
  if (resendCooldown > 0) return;

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to resend OTP");
    }

    setResendCooldown(60);

    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

  } catch (error: any) {
    alert(error.message || "Something went wrong");
  }
};

  const otpComplete = otp.join("").length === OTP_LENGTH;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 lg:px-8">
            <div className="text-center animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We&apos;ve sent a 6-digit code to{" "}
                {email ? (
                  <span className="font-medium text-foreground">{email}</span>
                ) : (
                  "your email"
                )}
                . Enter it below to complete your registration.
              </p>
            </div>
          </div>
        </section>

        {/* OTP Form */}
        <section className="py-20 lg:py-32">
          <div className="container px-4 lg:px-8">
            <div className="max-w-md mx-auto">
              <div
                className="bg-card rounded-2xl p-8 shadow-soft animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <form onSubmit={handleVerify} className="space-y-8">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold"
                        aria-label={`Digit ${index + 1} of verification code`}
                      />
                    ))}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    size="lg"
                    disabled={!otpComplete || isVerifying}
                  >
                    {isVerifying ? "Verifying..." : "Verify Email"}
                  </Button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Didn&apos;t receive the code?{" "}
                      {resendCooldown > 0 ? (
                        <span className="text-muted-foreground">
                          Resend in {resendCooldown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="text-accent hover:underline font-medium"
                        >
                          Resend code
                        </button>
                      )}
                    </p>
                    <Link
                      to="/signup"
                      className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Back to signup
                    </Link>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already verified?{" "}
                    <Link to="/login" className="text-accent hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyOTP;
