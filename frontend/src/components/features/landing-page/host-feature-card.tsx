import { Lato } from "next/font/google";
import Image from "next/image";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

type HostFeatureCardProps = {
  imageSrc: string;
  title: string;
  description: string;
};

export default function HostFeatureCard({
  imageSrc,
  title,
  description,
}: HostFeatureCardProps) {
  return (
    <div className="grid min-w-[280px] w-full justify-items-center gap-6">
      <Image
        src={imageSrc}
        alt={title}
        width={280}
        height={180}
        sizes="100vw"
        className="h-[180px] w-[280px]"
      />
      <div className="grid gap-2">
        <h3 className={`text-lg font-bold ${lato.className}`}>{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
