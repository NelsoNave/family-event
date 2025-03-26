import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-text bg-textBorderLight max-w-md mx-auto">
      <div className="grid gap-4 px-4 py-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-bold">Oiwai</h1>
          <div className="text-textSub grid gap-2 text-xs">
            <Link href="/" className="font-semibold hover:opacity-70">
              Privacy policy
            </Link>
            <Link href="/" className="font-semibold hover:opacity-70">
              Terms and Conditions
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-text text-xs">Created by</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/risa-yamamoto-profile/"
              className="flex items-center gap-1 hover:opacity-70"
              target="_blank"
            >
              <Image src="/images/linkedin_logo.png" alt="LinkedIn" width={20} height={20} />
              <p className="text-text text-sm">Risa</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/ben-ono-profile/"
              className="flex items-center gap-1 hover:opacity-70"
              target="_blank"
            >
              <Image src="/images/linkedin_logo.png" alt="LinkedIn" width={20} height={20} />
              <p className="text-text text-sm">Ben</p>
            </Link>
            <Link
              href="http://linkedin.com/in/nao-g-55822a2bb"
              className="flex items-center gap-1 hover:opacity-70"
              target="_blank"
            >
              <Image src="/images/linkedin_logo.png" alt="LinkedIn" width={20} height={20} />
              <p className="text-text text-sm">Nao</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/haruka-kakiuchi-profile/"
              className="flex items-center gap-1 hover:opacity-70"
              target="_blank"
            >
              <Image src="/images/linkedin_logo.png" alt="LinkedIn" width={20} height={20} />
              <p className="text-text text-sm">Haruka</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
