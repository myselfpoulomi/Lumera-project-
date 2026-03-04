import React, { useState } from "react";
import { useProducts, useDeleteProduct, useUpdateProduct, useUploadImage, useCreateProduct, Product } from "../api/products";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useToast } from "../components/ui/use-toast";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface AdminScreenProps { }

const AdminScreen: React.FC<AdminScreenProps> = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { toast } = useToast();

  const deleteMutation = useDeleteProduct();
  const updateMutation = useUpdateProduct();
  const createMutation = useCreateProduct();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

const handleDelete = (id: string) => {
  toast({
    title: "Delete Product?",
    description: "Are you sure you want to delete this product?",
    variant: "destructive",
    action: (
      <Button
        variant="destructive"
        onClick={() => {
          deleteMutation.mutate(id, {
            onSuccess: () => {
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
        }}
      >
        Confirm
      </Button>
    ),
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

  navigate("/admin-login"); // adjust route if needed
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

  if (isLoading) return <div className="flex justify-center items-center h-screen text-lg">Loading products...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-lg text-red-500">Error loading products.</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2338bdf8" fill-opacity="0.12"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10-10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm10-10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM14 2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM14 22v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM14 42v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 2v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 22v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 42v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z" fill="%239C92AC"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), radial-gradient(at 0% 0%, #1e293b, transparent 50%), radial-gradient(at 100% 100%, #1e293b, transparent 50%)' }}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-700">
          <h1 className="text-3xl font-extrabold text-indigo-400 flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-500" /> Admin Dashboard
          </h1>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
              {product.img && (
                <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-700">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-100 mb-2">{product.name}</h2>
                <p className="text-gray-200 text-2xl font-semibold mb-3">${Number(product.price).toFixed(2)}</p>
                <p className="text-gray-400 text-sm flex-grow line-clamp-3 mb-4">{product.description}</p>
                <div className="mt-auto flex justify-between space-x-3">
                  <Button
                    onClick={() => handleUpdate(product)}
                    variant="outline"
                    className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 border-blue-700"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="destructive"
                    className="flex-1 bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 border-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg"
            >
              Logout
            </Button>
          </div>

        </div>

        {isEditModalOpen && editingProduct && (
          <EditProductModal
            product={editingProduct}
            onSave={handleSave}
            onClose={handleEditModalClose}
          />
        )}

        {isCreateModalOpen && (
          <CreateProductModal
            onSave={handleCreate}
            onClose={handleCreateModalClose}
          />
        )}
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
  const [description, setDescription] = useState(product.description);
  const [img, setImg] = useState(product.img || "");
  const [categoryType, setCategoryType] = useState<'SKINCARE' | 'MAKEUP' | undefined>(product.categoryType);
  const [skinType, setSkinType] = useState<'DRY' | 'OILY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL' | undefined>(product.skinType);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const uploadImageMutation = useUploadImage();

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImageFile(e.target.files[0]);
  //     setImageUrl(URL.createObjectURL(e.target.files[0])); // For preview
  //   }
  // };

  const handleSubmit = async () => {
    let newImg = img;
    if (imageFile) {
      newImg = await uploadImageMutation.mutateAsync(imageFile);
    }

    onSave({
      ...product,
      name,
      price: parseFloat(price),
      description,
      img: newImg,
      categoryType,
      skinType,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-50">Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium text-gray-300">Name</label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right font-medium text-gray-300">Price</label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right font-medium text-gray-300">Description</label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="categoryType" className="text-right font-medium text-gray-300">Category Type</label>
            <select
              id="categoryType"
              value={categoryType || ""}
              onChange={(e) => setCategoryType(e.target.value as 'SKINCARE' | 'MAKEUP')}
              className="col-span-3 bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="SKINCARE">Skincare</option>
              <option value="MAKEUP">Makeup</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="skinType" className="text-right font-medium text-gray-300">Skin Type</label>
            <select
              id="skinType"
              value={skinType || ""}
              onChange={(e) => setSkinType(e.target.value as 'DRY' | 'OILY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL')}
              className="col-span-3 bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
            >
              <option value="">Select Skin Type</option>
              <option value="DRY">DRY</option>
              <option value="OILY">OILY</option>
              <option value="COMBINATION">COMBINATION</option>
              <option value="SENSITIVE">SENSITIVE</option>
              <option value="NORMAL">NORMAL</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="image" className="text-right font-medium text-gray-300">Image</label>
            <Input id="image" type="file" className="col-span-3 bg-gray-700 border-gray-600 text-gray-100 file:text-gray-100 file:bg-gray-600 hover:file:bg-gray-500" />
          </div>
          {img && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1"></div>
              <img src={img} alt="Product Preview" className="col-span-3 w-32 h-32 object-cover rounded-md shadow-md border border-gray-600" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white border-gray-700">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={uploadImageMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2">
            {uploadImageMutation.isPending ? "Uploading..." : "Save Changes"}
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
  const [categoryType, setCategoryType] = useState<'SKINCARE' | 'MAKEUP' | undefined>(undefined);
  const [skinType, setSkinType] = useState<'DRY' | 'OILY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL' | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const uploadImageMutation = useUploadImage();

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImageFile(e.target.files[0]);
  //     setImageUrl(URL.createObjectURL(e.target.files[0])); // For preview
  //   }
  // };

  const handleSubmit = async () => {
    let newImg = img;
    if (imageFile) {
      newImg = await uploadImageMutation.mutateAsync(imageFile);
    }

    onSave({
      name,
      price: parseFloat(price),
      description,
      img: newImg,
      categoryType,
      skinType,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100 border border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-50">Create New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium text-gray-300">Name</label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right font-medium text-gray-300">Price</label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right font-medium text-gray-300">Description</label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="categoryType" className="text-right font-medium text-gray-300">Category Type</label>
            <select
              id="categoryType"
              value={categoryType || ""}
              onChange={(e) => setCategoryType(e.target.value as 'SKINCARE' | 'MAKEUP')}
              className="col-span-3 bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
            >
              <option value="">Select Category</option>
              <option value="SKINCARE">Skincare</option>
              <option value="MAKEUP">Makeup</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="skinType" className="text-right font-medium text-gray-300">Skin Type</label>
            <select
              id="skinType"
              value={skinType || ""}
              onChange={(e) => setSkinType(e.target.value as 'DRY' | 'OILY' | 'COMBINATION' | 'SENSITIVE' | 'NORMAL')}
              className="col-span-3 bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
            >
              <option value="">Select Skin Type</option>
              <option value="DRY">DRY</option>
              <option value="OILY">OILY</option>
              <option value="COMBINATION">COMBINATION</option>
              <option value="SENSITIVE">SENSITIVE</option>
              <option value="NORMAL">NORMAL</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="image" className="text-right font-medium text-gray-300">Image</label>
            <Input id="image" type="file" className="col-span-3 bg-gray-700 border-gray-600 text-gray-100 file:text-gray-100 file:bg-gray-600 hover:file:bg-gray-500" />
          </div>
          {img && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1"></div>
              <img src={img} alt="Product Preview" className="col-span-3 w-32 h-32 object-cover rounded-md shadow-md border border-gray-600" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white border-gray-700">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={uploadImageMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2">
            {uploadImageMutation.isPending ? "Uploading..." : "Create Product"}
          </Button>
        </div>
      </DialogContent>

    </Dialog>

  );
};

export default AdminScreen;
