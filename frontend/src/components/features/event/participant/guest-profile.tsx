import Image from "next/image";

type GuestProfileProps = {
  name: string;
  profileImageUrl: string;
  size?: number;
  fontSize?: string;
  fontWeight?: string;
};

export default function GuestProfile({
  name,
  profileImageUrl,
  size = 16,
  fontSize = "text-base",
  fontWeight = "font-semibold",
}: GuestProfileProps) {
  return (
    <li className="grid h-auto w-16 justify-items-center gap-2">
      <Image
        src={profileImageUrl || "/images/profile_default.png"}
        width={64}
        height={64}
        alt={name}
        className={`h-${size} w-${size} rounded-full object-cover`}
      />
      <p
        className={`line-clamp-2 w-full break-words text-center ${fontWeight} ${fontSize}`}
      >
        {name}
      </p>
    </li>
  );
}
