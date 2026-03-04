import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  img?: string;
  categoryType: 'SKINCARE' | 'MAKEUP';
  skinType: 'DRY' | 'OILY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL';
}


const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    "http://localhost:3000/api/products/get-products"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.map((product: any) => ({
    ...product,
    price: Number(product.price),
  }));
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(
    `http://localhost:3000/api/products/delete-product/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return;
};

const updateProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(
    `http://localhost:3000/api/products/update-product/${product.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        description: product.description,
        img: product.img,
        categoryType: product.categoryType,
        skinType: product.skinType,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
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
