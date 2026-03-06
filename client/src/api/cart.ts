import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "http://localhost:3000/api/cart";

const axiosConfig = {
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
};

export interface CartProduct {
  id: string;
  name: string;
  price: number | string;
  img?: string | null;
  description?: string | null;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: CartProduct;
}

export interface CartResponse {
  cart: { id: string; userId: string } | null;
  items: CartItem[];
}

const fetchCart = async (): Promise<CartResponse> => {
  const { data } = await axios.get<CartResponse>(`${API_BASE}/`, axiosConfig);
  return data;
};

const addToCart = async ({
  productId,
  quantity = 1,
}: {
  productId: string;
  quantity?: number;
}): Promise<{ message: string; cart: unknown }> => {
  const { data } = await axios.post(
    `${API_BASE}/add`,
    { productId, quantity },
    axiosConfig
  );
  return data;
};

const updateCartItem = async ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}): Promise<{ message: string; cart: unknown }> => {
  const { data } = await axios.put(
    `${API_BASE}/items/${itemId}`,
    { quantity },
    axiosConfig
  );
  return data;
};

const removeCartItem = async (itemId: string): Promise<{ message: string }> => {
  const { data } = await axios.delete(
    `${API_BASE}/items/${itemId}`,
    axiosConfig
  );
  return data;
};

export const useCart = (enabled = true) => {
  return useQuery<CartResponse, Error>({
    queryKey: ["cart"],
    queryFn: fetchCart,
    retry: false,
    enabled,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
