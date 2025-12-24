

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
// import { toast } from "sonner";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";

// export default function EditProfile() {
//   const [fullName, setFullName] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [image, setImage] = useState(null); // State to hold the selected image
//   const [uploading, setUploading] = useState(false); // Track upload state

//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     toast.error("Token not found, please login again.");
//     return;
//   }

//   // Handle image change
//   const handleImageChange = (e:any) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   // Handle form submission (PATCH request)
//   const handleSave = async () => {
//     // Collect only the data that is filled/changed
//     if (
//       !fullName &&
//       !oldPassword &&
//       !newPassword &&
//       !confirmPassword &&
//       !image
//     ) {
//       toast.error("No changes detected.");
//       return;
//     }

//     const formData = new FormData();

//     if (fullName) formData.append("full_name", fullName);
//     if (oldPassword && newPassword && confirmPassword) {
//       if (newPassword !== confirmPassword) {
//         toast.error("Passwords do not match.");
//         return;
//       }
//       formData.append("old_password", oldPassword);
//       formData.append("new_password", newPassword);
//     }
//     if (image) formData.append("image", image); // Append image if selected

//     setUploading(true);

//     try {
//       // Make PATCH request to update profile
//       const response = await baseApi.patch(
//         ENDPOINTS?.updateShopperProfile,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data.detail === "Profile updated successfully.") {
//         toast.success("Profile updated successfully!");
//         setUploading(false);
//         // Optionally, update UI or local storage with new data
//       }
//     } catch (error) {
//       setUploading(false);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow md:mt-20">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">
//         Edit Profile
//       </h2>

//       {/* Profile Image */}
//       <div className="flex justify-center mb-6 relative">
//         <div className="w-24 h-24 rounded-full overflow-hidden">
//           <Image
//             src={image ? URL.createObjectURL(image) : "/default-image.png"}
//             alt="Profile"
//             width={96}
//             height={96}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="absolute bottom-0 right-[42%] bg-white rounded-full p-1 border shadow">
//           <label htmlFor="file-upload" className="cursor-pointer">
//             <FaCamera className="h-4 w-4 text-gray-700" />
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </div>
//       </div>

//       {/* Full Name */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Full Name
//         </label>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Old Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Old Password
//         </label>
//         <div className="relative">
//           <input
//             type={showOldPassword ? "text" : "password"}
//             placeholder="********"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <div
//             className="absolute top-3 right-3 cursor-pointer text-gray-600"
//             onClick={() => setShowOldPassword(!showOldPassword)}
//           >
//             {showOldPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>
//       </div>

//       {/* New Password */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           New Password
//         </label>
//         <div className="relative">
//           <input
//             type={showNewPassword ? "text" : "password"}
//             placeholder="********"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <div
//             className="absolute top-3 right-3 cursor-pointer text-gray-600"
//             onClick={() => setShowNewPassword(!showNewPassword)}
//           >
//             {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>
//       </div>

//       {/* Confirm New Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Confirm Password
//         </label>
//         <div className="relative">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="********"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <div
//             className="absolute top-3 right-3 cursor-pointer text-gray-600"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <button
//         className={`w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-md hover:bg-indigo-700 transition ${
//           uploading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={handleSave}
//         disabled={uploading}
//       >
//         {uploading ? "Saving..." : "Change & Save"}
//       </button>
//     </div>
//   );
// }






// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
// import { toast } from "sonner";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";

// export default function EditProfile() {
//   const [fullName, setFullName] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [image, setImage] = useState(null); // State to hold the selected image
//   const [uploading, setUploading] = useState(false); // Track upload state

//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     toast.error("Token not found, please login again.");
//     return;
//   }

//   // Assuming you have the userId available dynamically (could be from URL or context)
//   const userId = "58";  // Replace this with dynamic user ID

//   // Fetch the shopper profile when the component is mounted
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await baseApi.get(`ENDPOINTS?.getShopperProfile/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const profileData = response.data; // Assuming profile data contains 'full_name' and 'image'

//         if (profileData) {
//           setFullName(profileData.full_name);
//           setImage(profileData.image || null); // Set image if available
//         }
//       } catch (error) {
//         toast.error("Failed to fetch profile. Please try again.");
//       }
//     };

//     fetchProfile();
//   }, [userId, token]);

//   // Handle image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   // Handle form submission (PATCH request)
//   const handleSave = async () => {
//     // Collect only the data that is filled/changed
//     if (
//       !fullName &&
//       !oldPassword &&
//       !newPassword &&
//       !confirmPassword &&
//       !image
//     ) {
//       toast.error("No changes detected.");
//       return;
//     }

//     const formData = new FormData();

//     if (fullName) formData.append("full_name", fullName);
//     if (oldPassword && newPassword && confirmPassword) {
//       if (newPassword !== confirmPassword) {
//         toast.error("Passwords do not match.");
//         return;
//       }
//       formData.append("old_password", oldPassword);
//       formData.append("new_password", newPassword);
//     }
//     if (image) formData.append("image", image); // Append image if selected

//     setUploading(true);

//     try {
//       // Make PATCH request to update profile
//       const response = await baseApi.patch(
//         ENDPOINTS?.updateShopperProfile,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data.detail === "Profile updated successfully.") {
//         toast.success("Profile updated successfully!");
//         setUploading(false);
//         // Optionally, update UI or local storage with new data
//       }
//     } catch (error) {
//       setUploading(false);
//       toast.error("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow md:mt-20">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">
//         Edit Profile
//       </h2>

//       {/* Profile Image */}
//       <div className="flex justify-center mb-6 relative">
//         <div className="w-24 h-24 rounded-full overflow-hidden">
//           <Image
//             src={image ? URL.createObjectURL(image) : "/default-image.png"}
//             alt="Profile"
//             width={96}
//             height={96}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="absolute bottom-0 right-[42%] bg-white rounded-full p-1 border shadow">
//           <label htmlFor="file-upload" className="cursor-pointer">
//             <FaCamera className="h-4 w-4 text-gray-700" />
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//         </div>
//       </div>

//       {/* Full Name */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Full Name
//         </label>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Old Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Old Password
//         </label>
//         <div className="relative">
//           <input
//             type={showOldPassword ? "text" : "password"}
//             placeholder="********"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <div
//             className="absolute top-3 right-3 cursor-pointer text-gray-600"
//             onClick={() => setShowOldPassword(!showOldPassword)}
//           >
//             {showOldPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>
//       </div>

//       {/* New Password */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           New Password
//         </label>
//         <div className="relative">
//           <input
//             type={showNewPassword ? "text" : "password"}
//             placeholder="********"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <div
//             className="absolute top-3 right-3 cursor-pointer text-gray-600"
//             onClick={() => setShowNewPassword(!showNewPassword)}
//           >
//             {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>
//       </div>

//       {/* Confirm New Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Confirm Password
//         </label>
//         <div className="relative">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="********"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <div
//             className="absolute top-3 right-3 cursor-pointer text-gray-600"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <button
//         className={`w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-md hover:bg-indigo-700 transition ${
//           uploading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={handleSave}
//         disabled={uploading}
//       >
//         {uploading ? "Saving..." : "Change & Save"}
//       </button>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { toast } from "sonner";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { jwtDecode } from "jwt-decode";

// Define types for API responses
interface ProfileData {
  full_name: string;
  image?: string;
  email?: string;
}

interface DecodedToken {
  user_id: string | number;
  exp?: number;
}

interface UpdateProfileResponse {
  detail?: string;
  message?: string;
}

export default function EditProfile() {
  const [fullName, setFullName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Fetch the shopper profile when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    // Decode the token to extract the user_id
    let userId: string | number;
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      userId = decodedToken?.user_id;
    } catch (err) {
      toast.error("Invalid token, please login again.");
      console.error("Token decode error:", err);
      return;
    }

    if (!userId) {
      toast.error("User ID not found in token.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await baseApi.get<ProfileData>(`${ENDPOINTS.getShopperProfile}${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileData = response.data;

        if (profileData) {
          setFullName(profileData.full_name || "");
          if (profileData.image) {
            setProfileImage(profileData.image);
            setPreviewUrl(""); // Clear preview when loading backend image
          }
        }
      } catch (err) {
        toast.error("Failed to fetch profile. Please try again.");
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create preview URL for the selected file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Handle form submission (PATCH request)
  const handleSave = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    if (
      !fullName &&
      !oldPassword &&
      !newPassword &&
      !confirmPassword &&
      !image
    ) {
      toast.error("No changes detected.");
      return;
    }

    const formData = new FormData();

    if (fullName) formData.append("full_name", fullName);
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      formData.append("old_password", oldPassword);
      formData.append("new_password", newPassword);
    }
    if (image && image instanceof File) formData.append("image", image);

    setUploading(true);

    try {
      const response = await baseApi.patch<UpdateProfileResponse>(
        ENDPOINTS?.updateShopperProfile,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.detail === "Profile updated successfully." || response.data.message === "Profile updated successfully.") {
        toast.success("Profile updated successfully!");
        setUploading(false);
      }
    } catch (err) {
      setUploading(false);
      toast.error("Failed to update profile. Please try again.");
      console.error("Update profile error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow md:mt-20">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 relative">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : profileImage ? (
            <img
              src={`http://10.10.7.85:8001${profileImage}`}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/default-image.png"
              alt="Default Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="absolute bottom-0 right-[42%] bg-white rounded-full p-1 border shadow">
          <label htmlFor="file-upload" className="cursor-pointer">
            <FaCamera className="h-4 w-4 text-gray-700" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Old Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Old Password
        </label>
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="********"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div
            className="absolute top-3 right-3 cursor-pointer text-gray-600"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div
            className="absolute top-3 right-3 cursor-pointer text-gray-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div
            className="absolute top-3 right-3 cursor-pointer text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        className={`w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-md hover:bg-indigo-700 transition ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSave}
        disabled={uploading}
      >
        {uploading ? "Saving..." : "Change & Save"}
      </button>
    </div>
  );
}
