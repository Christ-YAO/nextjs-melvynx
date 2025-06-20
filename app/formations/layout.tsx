import { PageLayout } from "@/layout";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageLayout>
        <header className="border-b -mx-4 px-4 pb-2">
          <Link href={'/formations'} className="font-bold">/formations</Link>
        </header>
        {children}
      </PageLayout>
    </div>
  );
}
