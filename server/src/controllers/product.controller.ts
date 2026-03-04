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


async function getProducts(req: Request, res: Response) {
    try {
        const products = await prisma.product.findMany();   
        res.status(200).json(products);
    } catch (error: any) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }   
}


async function getProductByID(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;   
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        }); 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error: any) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }    
}

async function updateProduct(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const { name, description, price, skinType, categoryType, img } = req.body;
    try {
        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: name || existingProduct.name,
                description: description || existingProduct.description,
                price: price || existingProduct.price,
                img: img || existingProduct.img,
                skinType: skinType ? SkinType[skinType as keyof typeof SkinType] : existingProduct.skinType,
                categoryType: categoryType ? CategoryType[categoryType as keyof typeof CategoryType] : existingProduct.categoryType,
            },
        });
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error: any) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function deleteProduct(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    try {
        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { createProduct, getProducts, getProductByID , updateProduct, deleteProduct};
