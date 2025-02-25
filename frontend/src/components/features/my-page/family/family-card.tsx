import Image from "next/image";
import EditDeleteButtons from "../edit-delete/edit-delete-buttons";

type FamilyCardProps = {
  name: string;
  profileImageUrl: string;
  familyId: string;
};

export default function FamilyCard({
  name,
  profileImageUrl,
  familyId,
}: FamilyCardProps) {
  return (
    <li key={familyId} className="flex justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={profileImageUrl}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <p className="text-sm font-semibold">{name}</p>
      </div>
      <EditDeleteButtons
        title="Edit family member"
        deleteTitle="Remove family member"
        deleteDescription="Are you sure you want to remove this member? This action cannot be undone."
        button="Remove"
        defaultName={name}
        defaultImage={profileImageUrl}
        familyId={familyId}
        type="family"
        errorMessage="Failed to update family information. Please try again."
      />
    </li>
  );
}
