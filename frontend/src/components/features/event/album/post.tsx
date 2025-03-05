"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Post() {
  const [images, setImages] = useState<File[]>([]);

  console.log(images)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...fileArray]);
    }
  };

  return (
    <form className="grid gap-4">
      <Button className="h-auto w-fit justify-self-end rounded-full px-8 py-2">
        Post
      </Button>
      <ul className="grid grid-cols-3 gap-[2px]">
        <li className="flex items-center justify-center hover:opacity-70">
          <input
            type="file"
            name="images"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <PlusIcon size={24} className="text-primary" />
        </li>
        <li className="hover:opacity-70">
          <button className="relative h-[100px] w-full">
            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-text/50">
              <X size={14} className="text-white" />
            </div>
            <Image
              src="/images/sample_profile.png"
              alt="test"
              width={124}
              height={100}
              className="h-[100px] object-cover"
            />
          </button>
        </li>
      </ul>
    </form>
  );
}
