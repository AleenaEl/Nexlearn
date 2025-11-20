"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { testLogout } from "@/services/verifyServices";
import toast from "react-hot-toast";

function Navbar() {
   const router = useRouter();

   const logoutMutation = useMutation({
     mutationFn: testLogout,
     onSuccess: (res) => {
       toast.success(res.message );

       
       localStorage.removeItem("access_token");
       localStorage.removeItem("refresh_token");

       router.push("/"); 
     },
     onError: () => {
       toast.error("Logout failed. Try again.");
     },
   });
  return (
    <div className="bg-white h-16 py-2 pe-4 flex flex-row justify-between md:justify-end items-center w-full ">
      <div className="flex justify-between items-center ps-2 md:ps-0 w-full md:w-[55%]   ">
        <div className=" ">
          <Image
            src="/color_logo.svg"
            alt="nexlearn Logo"
            width={150}
            height={150}
            // className="rounded-lg"
            // priority // Optional: Load immediately (for above-the-fold)
          />
        </div>
        <div>
          <Button
            className="w-full bg-[#177A9C] text-white rounded-lg text-sm "
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
