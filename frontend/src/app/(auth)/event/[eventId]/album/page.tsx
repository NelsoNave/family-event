import { PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const data = false;

  return (
    <section>
      <p>breadcrumb</p>
      {data ? (
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h1 className="text-xl font-bold">
              Share cherished moments with everyone
            </h1>
            <p className="text-sm text-textSub">
              Upload your photos and relive the moments from the event!
            </p>
          </div>
          <div className="flex h-60 items-center justify-center rounded-lg border-2 border-dashed border-textBorderLight bg-background hover:opacity-70">
            <input type="file" name="images" multiple hidden />
            <PlusIcon size={32} className="text-textSub" />
          </div>
        </div>
      ) : (
        <section className="grid gap-8">
          <div className="grid grid-cols-2 gap-[6px] rounded-lg p-2 shadow-[0px_5px_32px_rgba(0,0,0,0.16)]">
            <Link href="/pictures" className="cursor-pointer">
              <Image
                src="/images/sample-thumbnail.png"
                alt="test"
                width={160}
                height={120}
                className="h-32 w-full rounded-lg object-cover"
              />
            </Link>
            <Image
              src="/images/sample-thumbnail.png"
              alt="test"
              width={160}
              height={120}
              className="h-32 w-full rounded-lg object-cover"
            />
            <Image
              src="/images/sample-thumbnail.png"
              alt="test"
              width={160}
              height={120}
              className="h-32 w-full rounded-lg object-cover"
            />
            <div className="flex h-32 w-full cursor-pointer items-center justify-center hover:opacity-70">
              <input
                type="file"
                name="images"
                multiple
                hidden
                // onChange={handleFileChange}
              />
              <PlusIcon size={24} className="text-primary" />
            </div>
          </div>
          <section className="grid gap-4">
            <div className="grid gap-2">
              <h2 className="text-xl font-bold">Faces of the Event</h2>
              <p className="text-sm text-textSub">
                AI creates a personal album for everyone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-[6px]">
              <Link href="/pictures" className="w-full cursor-pointer">
                <Image
                  src="/images/sample-thumbnail.png"
                  alt="test"
                  width={168}
                  height={184}
                  className="h-[184px] w-full rounded-lg object-cover"
                />
              </Link>
              <Link href="/pictures" className="w-full cursor-pointer">
                <Image
                  src="/images/sample-thumbnail.png"
                  alt="test"
                  width={168}
                  height={184}
                  className="h-[184px] w-full rounded-lg object-cover"
                />
              </Link>
            </div>
          </section>
        </section>
      )}
    </section>
  );
}
