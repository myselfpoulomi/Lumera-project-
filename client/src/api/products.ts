import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  img?: string;
  categoryType: 'skincare' | 'makeup';
  skinType: 'DRY' | 'OILY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL';
}

// Placeholder API functions
const fetchProducts = async (): Promise<Product[]> => {
  // Replace with actual API call
  return [
    {
      id: "1", name: "Product A", price: 29.99, description: "Description A", img: "https://picsum.photos/id/10/300/200",
      categoryType: "skincare",
      skinType: "DRY"
    },
    {
      id: "2", name: "Product B", price: 49.99, description: "Description B", img: "https://picsum.photos/id/20/300/200",
      categoryType: "skincare",
      skinType: "DRY"
    },
  ];
};

const deleteProduct = async (id: string): Promise<void> => {
  // Replace with actual API call
  console.log(`Deleting product with id: ${id}`);
  return new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
};

const updateProduct = async (product: Product): Promise<Product> => {
  // Replace with actual API call
  console.log(`Updating product with id: ${product.id}`);
  return new Promise((resolve) => setTimeout(() => resolve(product), 500)); // Simulate API call
};

export const useProducts = () => {
  return useQuery<Product[], Error>({ queryKey: ["products"], queryFn: fetchProducts });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, Product>({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

const uploadImage = async (imageFile: File): Promise<string> => {
  console.log("Uploading image:", imageFile.name);
  // Simulate API call to upload image and return a URL
  return new Promise((resolve) => setTimeout(() => resolve(`/images/${imageFile.name}`), 1000));
};

export const useUploadImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: uploadImage,
  });
};

// const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
//   // Simulate API call and assign a new ID
//   return new Promise((resolve) =>
//     setTimeout(() => resolve({ id: Date.now().toString(), ...product }), 500)
//   );
// };

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const productWithDefaults = {
        ...newProduct,
        categoryType: newProduct.categoryType || 'skincare',
        skinType: newProduct.skinType || 'NORMAL',
      };
      console.log("Product being sent to backend:", productWithDefaults);
      const response = await fetch(
        "http://localhost:3000/api/products/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productWithDefaults),
        }
      );
      const data = await response.json(); // 👈 important

      if (!response.ok) {
        console.log("Backend error:", data); // 👈 log it
        throw new Error(data.message || "Failed to create product");
      }

      return data;
    },
  });
};
