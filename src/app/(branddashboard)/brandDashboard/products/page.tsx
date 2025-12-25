// "use client"

// import React, { useState, useEffect } from 'react';
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";
// import { FiPlus, FiTrash2, FiUpload, FiImage, FiSave, FiX } from "react-icons/fi";
// import { toast } from "sonner";

// export default function CreateProductPage() {
//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     categories: [{ name: "" }],  // For dynamic categories
//     barcode: "",
//     price: "",
//     tags: [{ name: "" }],  // For dynamic tags
//     is_active: true,
//   });

//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);  // For image preview
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Category states
//   const [categoriesList, setCategoriesList] = useState<any[]>([]);
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [creatingCategory, setCreatingCategory] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await baseApi.get(ENDPOINTS.categoryList, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });


//       console.log(response.data,"naeem data" )

//       if (response.status === 200) {
//         setCategoriesList(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleCreateCategory = async () => {
//     if (!newCategoryName.trim()) {
//       toast.error("Category name is required");
//       return;
//     }
    
//     setCreatingCategory(true);
//     try {
//       const token = localStorage.getItem("access_token");
//       const response = await baseApi.post(ENDPOINTS.createCategory, {
//         name: newCategoryName,
//         is_active: true
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         toast.success("Category created successfully");
//         setNewCategoryName("");
//         setShowCategoryModal(false);
//         fetchCategories(); // Refresh list
//       }
//     } catch (error) {
//       console.error("Error creating category:", error);
//       toast.error("Failed to create category");
//     } finally {
//       setCreatingCategory(false);
//     }
//   };

//   // Handle form field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldName: string, index: number, arrayName: string) => {
//     const value = e.target.value;

//     setProductData((prevData) => {
//       const newArray = prevData[arrayName].map((item:any, i:any) => {
//         if (i === index) {
//           return { ...item, [fieldName]: value };
//         }
//         return item;
//       });

//       return {
//         ...prevData,
//         [arrayName]: newArray,
//       };
//     });
//   };

//   // Handle image file change
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);  // Set image preview
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   // Remove a dynamic field (category or tag)
//   const removeField = (index: number, arrayName: string) => {
//     setProductData((prevData) => {
//       const newArray = [...prevData[arrayName]];
//       newArray.splice(index, 1);
//       return {
//         ...prevData,
//         [arrayName]: newArray,
//       };
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     // Check if image is selected
//     if (!image) {
//       toast.error("Please upload a product image.");
//       setIsLoading(false);
//       return;
//     }

//     // Prepare form data for submission
//     const formData = new FormData();
//     formData.append("image", image);

//     const brandId = localStorage.getItem("id") 

//     console.log(brandId)

//     // Append the product data to the formData
//     formData.append("brand", brandId); 
//     formData.append("name", productData.name);
//     formData.append("description", productData.description);
//     productData.categories.forEach((category) => formData.append("category[]", category.name));
//     formData.append("barcode", productData.barcode);
//     formData.append("price", productData.price);
//     formData.append("is_active", productData.is_active.toString()); 
//     formData.append("created_by", brandId); 
//     formData.append("updated_by", brandId);

//     try {
//       // API call to create product
//       const token = localStorage.getItem("access_token");
//       const response = await baseApi.post(ENDPOINTS?.createProduct, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Handle successful response
//       if (response.status === 200) {
//         toast.success("Product created successfully!");
//         // Reset form
//         setProductData({
//             name: "",
//             description: "",
//             categories: [{ name: "" }],
//             barcode: "",
//             price: "",
//             tags: [{ name: "" }],
//             is_active: true,
//             created_by:brandId,
//             updated_by:brandId,
//         });
//         setImage(null);
//         setImagePreview(null);
//       }
//     } catch (error) {
//       toast.error("Error creating product. Please try again.");
//       console.error("Error creating product:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-6">
//       <div className="">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Create New Product</h2>
//           <p className="text-gray-500 mt-2">Add a new product to your inventory with details and images.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Info */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Information Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Basic Information</h3>
              
//               <div className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={productData.name}
//                     onChange={(e) => setProductData({ ...productData, name: e.target.value })}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//                     placeholder="e.g. Organic Green Tea"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     id="description"
//                     rows={4}
//                     value={productData.description}
//                     onChange={(e) => setProductData({ ...productData, description: e.target.value })}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
//                     placeholder="Describe your product..."
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 ">
//                   <div>
//                     <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
//                     <input
//                       type="number"
//                       id="price"
//                       value={productData.price}
//                       onChange={(e) => setProductData({ ...productData, price: e.target.value })}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//                       placeholder="0.00"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Fields Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Categories</h3>
              
//               <div className="space-y-8">
//                 {/* Categories */}
//                 <div>
//                   <div className="flex justify-between items-center mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Categories</label>
//                     <div className="flex gap-4">
//                       <button 
//                         type="button" 
//                         onClick={() => setShowCategoryModal(true)}
//                         className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
//                       >
//                         <FiPlus /> Create New
//                       </button>
//                       {/* <button 
//                         type="button" 
//                         onClick={() => addField("categories")}
//                         className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
//                       >
//                         <FiPlus /> Add Field
//                       </button> */}
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     {productData.categories.map((category, index) => (
//                       <div key={index} className="flex gap-3">
//                         <select
//                           value={category.name}
//                           onChange={(e) => handleChange(e, "name", index, "categories")}
//                           className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
//                         >
//                           <option value="">Select Category</option>
//                           {categoriesList.map((cat: any) => (
//                             <option key={cat.id} value={cat.name}>
//                               {cat.name}
//                             </option>
//                           ))}
//                         </select>
//                         {productData.categories.length > 1 && (
//                           <button 
//                             type="button" 
//                             onClick={() => removeField(index, "categories")}
//                             className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Image & Actions */}
//           <div className="space-y-6">
//             {/* Image Upload Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Product Image</h3>
              
//               <div className="relative group">
//                 <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${imagePreview ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}>
//                   <input
//                     type="file"
//                     id="receipt_image"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
                  
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img 
//                         src={imagePreview} 
//                         alt="Preview" 
//                         className="w-full h-64 object-cover rounded-lg shadow-md" 
//                       />
//                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
//                         <p className="text-white font-medium flex items-center gap-2">
//                           <FiUpload /> Change Image
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="py-8">
//                       <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
//                         <FiImage size={24} />
//                       </div>
//                       <p className="text-gray-700 font-medium mb-1">Click to upload image</p>
//                       <p className="text-gray-400 text-sm">SVG, PNG, JPG or GIF</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Action Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <div className="mb-6">
//                 <label className="flex items-center gap-3 cursor-pointer group">
//                   <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${productData.is_active ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
//                     {productData.is_active && <FiPlus className="text-white rotate-45" size={16} />}
//                   </div>
//                   <input 
//                     type="checkbox" 
//                     checked={productData.is_active}
//                     onChange={(e) => setProductData({ ...productData, is_active: e.target.checked })}
//                     className="hidden"
//                   />
//                   <span className="text-gray-700 font-medium">Active Product</span>
//                 </label>
//               </div>

//               <button 
//                 type="submit" 
//                 disabled={isLoading}
//                 className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     <FiSave size={20} />
//                     Create Product
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* Create Category Modal */}
//       {showCategoryModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
//             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//               <h3 className="text-xl font-semibold text-gray-800">Create New Category</h3>
//               <button 
//                 onClick={() => setShowCategoryModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>
            
//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
//                 <input
//                   type="text"
//                   value={newCategoryName}
//                   onChange={(e) => setNewCategoryName(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//                   placeholder="e.g. Electronics"
//                   autoFocus
//                 />
//               </div>
//             </div>

//             <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowCategoryModal(false)}
//                 className="px-6 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateCategory}
//                 disabled={creatingCategory}
//                 className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center gap-2"
//               >
//                 {creatingCategory ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Creating...
//                   </>
//                 ) : (
//                   'Create Category'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client"

import React, { useState, useEffect } from 'react';
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { FiPlus, FiTrash2, FiUpload, FiImage, FiSave, FiX } from "react-icons/fi";
import { toast } from "sonner";

export default function CreateProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categories: [{ name: "" }],  // For dynamic categories
    barcode: "",
    price: "",
    tags: [{ name: "" }],  // For dynamic tags
    is_active: true,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);  // For image preview
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Category states
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await baseApi.get(ENDPOINTS.categoryList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure we are properly updating the categories list
      console.log(response.data, "naeem data");
      
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data)) {
          setCategoriesList(data);
        } else if (Array.isArray(data.categories)) {
          setCategoriesList(data.categories);
        } else {
          setCategoriesList([]);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setCreatingCategory(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await baseApi.post(ENDPOINTS.createCategory, {
        name: newCategoryName,
        is_active: true,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Category created successfully");
        setNewCategoryName("");
        setShowCategoryModal(false);
        fetchCategories(); // Refresh list
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setCreatingCategory(false);
    }
  };

  // Handle form field changes for dynamic categories and tags
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldName: string, index: number, arrayName: string) => {
    const value = e.target.value;

    setProductData((prevData) => {
      const newArray = prevData[arrayName].map((item:any, i:any) => {
        if (i === index) {
          return { ...item, [fieldName]: value };
        }
        return item;
      });

      return {
        ...prevData,
        [arrayName]: newArray,
      };
    });
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);  // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove a dynamic field (category or tag)
  const removeField = (index: number, arrayName: string) => {
    setProductData((prevData) => {
      const newArray = [...prevData[arrayName]];
      newArray.splice(index, 1);
      return {
        ...prevData,
        [arrayName]: newArray,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if image is selected
    if (!image) {
      toast.error("Please upload a product image.");
      setIsLoading(false);
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("image", image);

    const brandId = localStorage.getItem("id");

    // Append the product data to the formData
    formData.append("brand", brandId!);
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    productData.categories.forEach((category) => formData.append("category[]", category.name));
    formData.append("barcode", productData.barcode);
    formData.append("price", productData.price);
    formData.append("is_active", productData.is_active.toString());
    formData.append("created_by", brandId!);
    formData.append("updated_by", brandId!);

    try {
      // API call to create product
      const token = localStorage.getItem("access_token");
      const response = await baseApi.post(ENDPOINTS.createProduct, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Product created successfully!");
        setProductData({
          name: "",
          description: "",
          categories: [{ name: "" }],
          barcode: "",
          price: "",
          tags: [{ name: "" }],
          is_active: true,
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      toast.error("Error creating product. Please try again.");
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create New Product</h2>
          <p className="text-gray-500 mt-2">Add a new product to your inventory with details and images.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Basic Information</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="e.g. Organic Green Tea"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    placeholder="Describe your product..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 ">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      id="price"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Fields Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Categories</h3>

              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => setShowCategoryModal(true)}
                        className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                      >
                        <FiPlus /> Create New
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {productData.categories.map((category, index) => (
                      <div key={index} className="flex gap-3">
<select
  value={category.name}
  onChange={(e) => handleChange(e, "name", index, "categories")}
  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
>
  <option value="">Select Category</option>
  {/* Check if categoriesList has data before mapping */}
  {categoriesList.length > 0 ? (
    categoriesList.map((cat: any) => (
      <option key={cat.id} value={cat.name}>
        {cat.name}
      </option>
    ))
  ) : (
    <option disabled>No categories available</option> // Show message if no categories
  )}
</select>
                        {productData.categories.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeField(index, "categories")}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Actions */}
          <div className="space-y-6">
            {/* Image Upload Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Product Image</h3>

              <div className="relative group">
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${imagePreview ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}>
                  <input
                    type="file"
                    id="receipt_image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg shadow-md" 
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <p className="text-white font-medium flex items-center gap-2">
                          <FiUpload /> Change Image
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <FiImage size={24} />
                      </div>
                      <p className="text-gray-700 font-medium mb-1">Click to upload image</p>
                      <p className="text-gray-400 text-sm">SVG, PNG, JPG or GIF</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${productData.is_active ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                    {productData.is_active && <FiPlus className="text-white rotate-45" size={16} />}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={productData.is_active}
                    onChange={(e) => setProductData({ ...productData, is_active: e.target.checked })}
                    className="hidden"
                  />
                  <span className="text-gray-700 font-medium">Active Product</span>
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <FiSave size={20} />
                    Create Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Create Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Create New Category</h3>
              <button 
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder="e.g. Electronics"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-6 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                disabled={creatingCategory}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {creatingCategory ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : (
                  'Create Category'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
