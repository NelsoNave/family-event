import Image from "next/image";
import EditDeleteButtons from "../edit-delete/edit-delete-buttons";

type ProfileCardProps = {
  name: string;
  email: string;
  profileImageUrl: string;
};

export default function ProfileCard({
  name,
  email,
  profileImageUrl,
}: ProfileCardProps) {
  return (
    <div className="grid justify-items-center gap-2">
      <Image
        src={profileImageUrl}
        alt={name}
        width={64}
        height={64}
        className="rounded-full object-cover"
      />
      <div className="grid gap-1 text-center">
        <h1 className="text-base font-bold text-text">{name}</h1>
        <p className="text-xs text-textSub">{email}</p>
      </div>
      <EditDeleteButtons
        title="Edit account"
        errorTitle="Delete account"
        errorDescription="Are you sure you want to delete the account? This action cannot be undone."
        button="Delete"
        defaultName={name}
        defaultImage={profileImageUrl}
        type="user"
      />
    </div>
  );
}
