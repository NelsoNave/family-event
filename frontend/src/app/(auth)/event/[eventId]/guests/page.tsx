import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return (
    <section className="grid gap-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <h1 className="text-xl font-bold">
        Guest list <span className="text-base">(7)</span>
      </h1>
      <ul className="grid gap-4">
        <li className="flex">
          <Button variant="ghost" className="flex gap-4 items-center h-auto w-full justify-start py-1 px-0">
            <Image
              src="/images/unchecked.svg"
              width={16}
              height={16}
              alt="icon for add unchecked"
            />
            <div className="flex gap-2 items-center">
              <Image
                src="/images/sample_profile.png"
                width={40}
                height={40}
                alt="name"
              />
              <p className="text-base font-medium">Emi</p>
            </div>
          </Button>
          <Button variant="ghost" className="p-4 h-auto">
            <X size={16} />
          </Button>
        </li>
      </ul>
    </section>
  );
}
