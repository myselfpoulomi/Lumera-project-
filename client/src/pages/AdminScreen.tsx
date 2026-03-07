import React, { useState } from "react";
import { useProducts, useDeleteProduct, useUpdateProduct, useCreateProduct, Product } from "../api/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { useToast } from "../components/ui/use-toast";
import { Database, Plus, LogOut, Pencil, Trash2, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminScreenProps {}

const AdminScreen: React.FC<AdminScreenProps> = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { toast } = useToast();

  const deleteMutation = useDeleteProduct();
  const updateMutation = useUpdateProduct();
  const createMutation = useCreateProduct();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleDeleteConfirm = () => {
    if (!productToDelete) return;
    deleteMutation.mutate(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null);
        toast({
          title: "Product Deleted",
          description: "The product has been successfully deleted.",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: `Failed to delete product: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default",
    });

    navigate("/admin-login");
  };

  const handleUpdate = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleSave = (updatedProduct: Product) => {
    updateMutation.mutate(updatedProduct, {
      onSuccess: () => {
        handleEditModalClose();
        toast({
          title: "Product Updated",
          description: "The product has been successfully updated.",
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to update product: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  const handleCreate = (newProduct: Omit<Product, "id">) => {
    createMutation.mutate(newProduct, {
      onSuccess: () => {
        handleCreateModalClose();
        toast({
          title: "Product Created",
          description: "A new product has been successfully created.",
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to create product: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="text-muted-foreground font-sans text-lg animate-pulse">Loading products...</div>
      </div>
    );
  if (isError)
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="text-destructive font-sans text-lg">Error loading products.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background" style={{ background: "var(--gradient-blush)", backgroundAttachment: "fixed" }}>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <header className="mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 lg:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-soft">
            <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-accent/20 text-accent">
                <Database className="w-7 h-7" />
              </span>
              Admin Dashboard
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-card transition-all duration-300 hover:shadow-glow"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Product
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-border hover:bg-muted/50 text-foreground font-medium"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <article
              key={product.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
            >
              {product.img ? (
                <div className="relative h-52 w-full overflow-hidden bg-muted/50">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-52 w-full flex items-center justify-center bg-muted/30">
                  <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="font-display text-xl font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h2>
                <p className="text-accent font-semibold text-xl mb-3">${Number(product.price).toFixed(2)}</p>
                <p className="text-muted-foreground text-sm flex-grow line-clamp-3 mb-4">{product.description}</p>
                <div className="mt-auto flex gap-3">
                  <Button
                    onClick={() => handleUpdate(product)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-border hover:bg-accent/10 hover:border-accent/30 text-foreground"
                  >
                    <Pencil className="w-4 h-4 mr-1.5" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(product)}
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {isEditModalOpen && editingProduct && (
          <EditProductModal product={editingProduct} onSave={handleSave} onClose={handleEditModalClose} />
        )}

        {isCreateModalOpen && <CreateProductModal onSave={handleCreate} onClose={handleCreateModalClose} />}

        {/* Delete Product Confirmation */}
        <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{productToDelete?.name}&quot;? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

interface EditProductModalProps {
  product: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onSave, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [description, setDescription] = useState(product.description || "");
  const [img, setImg] = useState(product.img || "");
  const [categoryType, setCategoryType] = useState<"SKINCARE" | "MAKEUP" | undefined>(product.categoryType);
  const [skinType, setSkinType] = useState<
    "DRY" | "OILY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | undefined
  >(product.skinType);

  const handleSubmit = () => {
    onSave({
      ...product,
      name,
      price: parseFloat(price),
      description,
      img,
      categoryType,
      skinType,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-card text-foreground border-border shadow-card">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="font-display text-2xl font-semibold">Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium text-muted-foreground">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right font-medium text-muted-foreground">
              Price
            </label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right font-medium text-muted-foreground">
              Description
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="categoryType" className="text-right font-medium text-muted-foreground">
              Category
            </label>
            <select
              id="categoryType"
              value={categoryType || ""}
              onChange={(e) => setCategoryType(e.target.value as "SKINCARE" | "MAKEUP")}
              className="col-span-3 bg-background border border-border rounded-md p-2 text-foreground"
            >
              <option value="">Select Category</option>
              <option value="SKINCARE">Skincare</option>
              <option value="MAKEUP">Makeup</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="skinType" className="text-right font-medium text-muted-foreground">
              Skin Type
            </label>
            <select
              id="skinType"
              value={skinType || ""}
              onChange={(e) =>
                setSkinType(e.target.value as "DRY" | "OILY" | "COMBINATION" | "SENSITIVE" | "NORMAL")
              }
              className="col-span-3 bg-background border border-border rounded-md p-2 text-foreground"
            >
              <option value="">Select Skin Type</option>
              <option value="DRY">Dry</option>
              <option value="OILY">Oily</option>
              <option value="COMBINATION">Combination</option>
              <option value="SENSITIVE">Sensitive</option>
              <option value="NORMAL">Normal</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="imgUrl" className="text-right font-medium text-muted-foreground">
              Image URL
            </label>
            <Input
              id="imgUrl"
              type="url"
              placeholder="Paste Cloudinary or image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          {img && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1" />
              <div className="col-span-3">
                <img
                  src={img}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded-lg border border-border shadow-soft"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="border-border">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface CreateProductModalProps {
  onSave: (product: Omit<Product, "id">) => void;
  onClose: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [categoryType, setCategoryType] = useState<"SKINCARE" | "MAKEUP" | undefined>(undefined);
  const [skinType, setSkinType] = useState<
    "DRY" | "OILY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | undefined
  >(undefined);

  const handleSubmit = () => {
    onSave({
      name,
      price: parseFloat(price),
      description,
      img,
      categoryType,
      skinType,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-card text-foreground border-border shadow-card">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="font-display text-2xl font-semibold">Create New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium text-muted-foreground">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right font-medium text-muted-foreground">
              Price
            </label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right font-medium text-muted-foreground">
              Description
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="categoryType" className="text-right font-medium text-muted-foreground">
              Category
            </label>
            <select
              id="categoryType"
              value={categoryType || ""}
              onChange={(e) => setCategoryType(e.target.value as "SKINCARE" | "MAKEUP")}
              className="col-span-3 bg-background border border-border rounded-md p-2 text-foreground"
            >
              <option value="">Select Category</option>
              <option value="SKINCARE">Skincare</option>
              <option value="MAKEUP">Makeup</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="skinType" className="text-right font-medium text-muted-foreground">
              Skin Type
            </label>
            <select
              id="skinType"
              value={skinType || ""}
              onChange={(e) =>
                setSkinType(e.target.value as "DRY" | "OILY" | "COMBINATION" | "SENSITIVE" | "NORMAL")
              }
              className="col-span-3 bg-background border border-border rounded-md p-2 text-foreground"
            >
              <option value="">Select Skin Type</option>
              <option value="DRY">Dry</option>
              <option value="OILY">Oily</option>
              <option value="COMBINATION">Combination</option>
              <option value="SENSITIVE">Sensitive</option>
              <option value="NORMAL">Normal</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="imgUrl-create" className="text-right font-medium text-muted-foreground">
              Image URL
            </label>
            <Input
              id="imgUrl-create"
              type="url"
              placeholder="Paste Cloudinary or image URL"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="col-span-3 bg-background border-border"
            />
          </div>
          {img && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1" />
              <div className="col-span-3">
                <img
                  src={img}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded-lg border border-border shadow-soft"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="border-border">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Create Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminScreen;
