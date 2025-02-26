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
    <Link href={path}>
      <p className="text-sm font-medium">
        <span className="mr-2">&lt;</span> {previousPageName}
      </p>
    </Link>
  );
}
