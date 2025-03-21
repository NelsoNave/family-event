"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 max-w-md bg-white px-4 py-3 md:mx-auto">
      <div className="flex items-start justify-between gap-2.5">
        <Link href={isSignedIn ? "/my-page" : "/"} className="hover:opacity-70">
          <h1 className="text-xl font-bold text-text">Oiwai</h1>
        </Link>
        {pathname === "/" ? (
          <div className="flex gap-3">
            <SignedOut>
              <SignInButton>
                <Button className="h-auto rounded-full border border-primary bg-white px-4 py-1.5 text-xs font-bold text-primary hover:bg-white">
                  LOG IN
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedOut>
              <SignUpButton forceRedirectUrl="/event/create">
                <Button className="h-auto rounded-full px-4 py-1.5 text-xs font-bold">
                  SIGN UP
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        ) : (
          <>
            <SignedOut>
              <SignInButton>
                <Button className="h-auto rounded-full px-4 py-1.5 text-xs font-bold">
                  LOG IN
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonPopoverActionButton__manageAccount: "hidden",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Page"
                    labelIcon={<UserRoundIcon size={16} />}
                    href="/my-page"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </>
        )}
      </div>
    </header>
  );
}
