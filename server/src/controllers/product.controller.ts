import { Request, Response } from "express";
import { prisma } from "../lib/prisma";



async function createProduct(req: Request, res: Response) {

    const { name, description, price, skinType, categoryType } = req.body;

    try {

        // Basic validation
        if (!name || !description || !price || !skinType || !categoryType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                skinType,
                categoryType
            }

        })
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export { createProduct };
