import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { SkinType, CategoryType } from "@prisma/client";



async function createProduct(req: Request, res: Response) {
    const { name, description, price, skinType, categoryType, img } = req.body;

    try {
        console.log("Received product data:", { name, description, price, skinType, categoryType, img });

        if (!name || !price || !skinType || !categoryType) {
            return res.status(400).json({ message: "Required fields (name, price, skinType, categoryType) are missing" });
        }

        const mappedSkinType = SkinType[skinType as keyof typeof SkinType];
        const mappedCategoryType = CategoryType[categoryType as keyof typeof CategoryType];

        if (!mappedSkinType) {
            return res.status(400).json({ message: `Invalid skinType provided: ${skinType}. Expected one of ${Object.keys(SkinType).join(', ')}` });
        }
        if (!mappedCategoryType) {
            return res.status(400).json({ message: `Invalid categoryType provided: ${categoryType}. Expected one of ${Object.keys(CategoryType).join(', ')}` });
        }

        console.log("Mapped SkinType:", mappedSkinType);
        console.log("Mapped CategoryType:", mappedCategoryType);

        const product = await prisma.product.create({
            data: {
                name,
                description: description || null,
                price,
                img: img || null,
                skinType: mappedSkinType,
                categoryType: mappedCategoryType,
            },
        });
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error: any) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

export { createProduct };
