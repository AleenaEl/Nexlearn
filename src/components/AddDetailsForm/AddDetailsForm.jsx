"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import FloatingInput from "../ui/floating-input";
import { useRouter } from "next/navigation";
import FloatingDropdown from "../ui/FloatingDropdown";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "@/services/verifyServices";
import toast from "react-hot-toast";

export default function AddDetailsForm({ mobile }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualification: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const profileMutation = useMutation({
    mutationFn: (data) => createProfile(data),
    onSuccess: (res) => {
      toast.success(res.message || "Profile created");
      if (res.success===true) {
        
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
    router.push("/exam/instructions");
      }
    },
    onError: (err) => {
      toast.error(err?.message || "Error creating profile");
    },
  });
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };


  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.qualification)
      return toast.error("Please fill all fields");

    if (!formData.image)
      return toast.error("Please upload your profile picture");

    const formdata = new FormData();
    formdata.append("mobile", mobile);
    formdata.append("name", formData.name);
    formdata.append("email", formData.email);
    formdata.append("qualification", formData.qualification);
    formdata.append("profile_image", formData.image);

    profileMutation.mutate(formdata);
  };

  return (
    <div className="space-y-6 w-full h-full overflow-y-auto">
    
      <h2 className="text-2xl font-semibold text-[#1C3141]">
        Add Your Details
      </h2>

 
      <div className="flex flex-col items-center justify-center">
        <label className="relative border w-[40%] h-28 p-1 border-dashed border-gray-300 rounded-xl text-center cursor-pointer">
          
          {preview && (
            <button
              onClick={handleRemoveImage}
              type="button"
              className="absolute top-1 right-1 bg-black   rounded-full p-1 "
            >
              <X size={10} className="text-white" />
            </button>
          )}

        
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={150}
              height={150}
              className="rounded-xl object-cover mx-auto h-full"
            />
          ) : (
            <div className="p-4 flex flex-col items-center justify-center w-full h-full">
              <UploadCloud size={28} className="text-gray-500" />
              <p className="text-gray-500 text-[8px] mt-1">
                Add Your Profile picture
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>
      </div>

  
      <FloatingInput
        label="Name"
        type="text"
        required
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <FloatingInput
        label="Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <FloatingDropdown
        label="Qualification"
        value={formData.qualification}
        required
        onChange={(value) => handleChange("qualification", value)}
        options={["High School", "Degree", "Masters"]}
      />

      <Button
        className="w-full bg-[#0D1B2A] text-white rounded-lg"
        onClick={handleSubmit}
        disabled={profileMutation.isPending}
      >
        {profileMutation.isPending ? "Saving..." : "Get Started"}
      </Button>
    </div>
  );
}