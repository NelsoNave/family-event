"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import "react-medium-image-zoom/dist/styles.css";

const Zoom = dynamic(() => import("react-medium-image-zoom"), { ssr: false });

type FacePictureCardProps = {
  picture: string;
};

export default function FacePictureCard({ picture }: FacePictureCardProps) {
  return (
    <Zoom zoomMargin={0}>
      <div className="relative h-[184px] w-full">
        <Image
          src={picture}
          alt={picture}
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </Zoom>
  );
}
