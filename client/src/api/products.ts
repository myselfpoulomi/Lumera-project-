import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  // Add other product fields as necessary
}

// Placeholder API functions
const fetchProducts = async (): Promise<Product[]> => {
  // Replace with actual API call
  return [
    { id: "1", name: "Product A", price: 29.99, description: "Description A", imageUrl: "https://picsum.photos/id/10/300/200" },
    { id: "2", name: "Product B", price: 49.99, description: "Description B", imageUrl: "https://picsum.photos/id/20/300/200" },
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

const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  console.log("Creating product:", product);
  // Simulate API call and assign a new ID
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: Date.now().toString(), ...product }), 500)
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
