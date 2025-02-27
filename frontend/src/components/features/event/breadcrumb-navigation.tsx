import Link from "next/link";

type BreadcrumbNavigationProps = {
  path: string;
  previousPageName: string;
};
export default function BreadcrumbNavigation({
  path,
  previousPageName,
}: BreadcrumbNavigationProps) {
  return (
    <div className="sticky top-10 z-10 p-4">
      <Link href={path}>
        <p className="text-sm font-medium">
          <span className="mr-2">&lt;</span> {previousPageName}
        </p>
      </Link>
    </div>
  );
}
