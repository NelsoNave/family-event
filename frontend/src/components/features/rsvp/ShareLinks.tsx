"use client";

import { useToast } from "@/hooks/use-toast";
import { showErrorToast } from "@/lib/toast/toast-utils";
import Image from "next/image";
import { useState } from "react";

type ShareLinksProps = {
  eventUrl: string;
};

const IconLink = ({
  href,
  src,
  alt,
}: {
  href: string;
  src: string;
  alt: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="icon for sharing event"
    className="flex h-auto flex-col items-center justify-center gap-1"
  >
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className="h-12 w-12 transform rounded-full object-cover duration-300 hover:scale-110"
      priority
    />
    <p className="text-xs font-semibold">{alt}</p>
  </a>
);

export const ShareLinks = ({ eventUrl }: ShareLinksProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to copy the event link. Please try again.",
      );
    }
  };

  return (
    <div className="flex justify-center gap-4">
      <IconLink
        href={`https://www.facebook.com/share.php?u=${eventUrl}`}
        src="/images/facebook.svg"
        alt="Facebook"
      />
      <IconLink
        href="https://www.instagram.com/direct/new/"
        src="/images/instagram.svg"
        alt="Instagram"
      />
      <IconLink
        href={`https://wa.me/?text=${encodeURIComponent(
          `Check out this event! : ${eventUrl}`,
        )}`}
        src="/images/whatsApp.svg"
        alt="WhatsApp"
      />
      <button onClick={handleCopyLink} className="flex flex-col items-center gap-1">
        <Image
          src="/images/link-share.svg"
          alt="Copy Link"
          width={100}
          height={100}
          className="h-12 w-12 transform rounded-full object-cover duration-300 hover:scale-110"
          priority
        />
        <p className="text-xs font-semibold">
          {isCopied ? "Copied!" : "Copy Link"}
        </p>
      </button>
    </div>
  );
};
