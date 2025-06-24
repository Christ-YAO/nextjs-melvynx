import { PageLayout } from "@/layout";
import Link from "next/link";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div>
      <PageLayout>
        <header className="border-b -mx-4 px-4 pb-2">
          <Link href={"/formations"} className="font-bold">
            /formations
          </Link>
        </header>
        {children}
      </PageLayout>
    </div>
  );
}
