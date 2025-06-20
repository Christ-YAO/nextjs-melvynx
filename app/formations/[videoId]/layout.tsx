import Link from "next/link";
import React, { PropsWithChildren } from "react";

export default async function Layout(
  props: PropsWithChildren<{ params: Promise<{ videoId: string }> }>
) {
  const params = await props.params;

  return (
    <div>
      <header className="border-b -mx-4 px-4 pb-2 mb-4">
        <Link href={`/formations/${params.videoId}`} className="font-bold">
          /formations/{params.videoId}
        </Link>
      </header>
      {props.children}
    </div>
  );
}
