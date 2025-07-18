import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <>
        {children}
    </>
  );
}
