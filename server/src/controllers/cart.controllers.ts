import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export async function addToCart(req: AuthRequest, res: Response) {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: { productId, quantity },
          },
        },
        include: { items: { include: { product: true } } },
      });
    } else {
      const existingItem = cart.items.find((i) => i.productId === productId);
      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      } else {
        await prisma.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        });
      }
      cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      })!;
    }

    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error: unknown) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function getCart(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      return res.status(200).json({ cart: null, items: [] });
    }

    const items = cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product,
    }));

    return res.status(200).json({ cart, items });
  } catch (error: unknown) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function updateCartItem(req: AuthRequest, res: Response) {
  const itemId = typeof req.params.itemId === "string" ? req.params.itemId : req.params.itemId?.[0];
  const { quantity } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!itemId) {
    return res.status(400).json({ message: "Item ID is required" });
  }
  if (quantity === undefined || quantity < 1) {
    return res.status(400).json({ message: "Valid quantity is required" });
  }

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return res.status(200).json({ message: "Cart updated", cart: updatedCart });
  } catch (error: unknown) {
    console.error("Error updating cart:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function removeCartItem(req: AuthRequest, res: Response) {
  const itemId = typeof req.params.itemId === "string" ? req.params.itemId : req.params.itemId?.[0];
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!itemId) {
    return res.status(400).json({ message: "Item ID is required" });
  }

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id },
    });
    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    return res.status(200).json({ message: "Item removed", cart: updatedCart });
  } catch (error: unknown) {
    console.error("Error removing cart item:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
