"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { useState } from "react";

type GuestNecessitiesListItemProps = {
  id: string;
  item: string;
  isAdded: boolean;
}

export default function GuestNecessitiesListItem({id, item, isAdded}: GuestNecessitiesListItemProps) {
  // const [isBringingItem, setIsBringingItem] = useState<boolean>(false)

  return (
    <li>
      {item}
      {isAdded ? (
        <Button>
          <Image
            src="/images/checked.svg"
            width={16}
            height={16}
            alt="icon for item checked"
          />
        </Button>
      ) : (
        <Button>
          <Image
          src="/images/unchecked.svg"
          width={16}
          height={16}
          alt="icon for item unchecked"
        />
        </Button>
      )}
      </li>
  )
}
