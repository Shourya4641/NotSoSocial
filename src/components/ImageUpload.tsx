"use client";

import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        <Image
          src={value}
          alt="Upload"
          className="rounded-md object-cover"
          fill
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload complete response:", res);
        if (res && res[0]?.ufsUrl) {
          onChange(res[0].ufsUrl);
        }
        // onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />

    // <UploadDropzone
    //   endpoint={endpoint}
    //   onClientUploadComplete={(res) => {
    //     console.log("Upload complete response:", res);
    //     if (res && res[0]?.ufsUrl) {
    //       onChange(res[0].ufsUrl);
    //     }
    //     // onChange(res?.[0].url);
    //   }}
    //   onUploadError={(error: Error) => {
    //     console.log(error);
    //   }}
    // />
  );
}
export default ImageUpload;
