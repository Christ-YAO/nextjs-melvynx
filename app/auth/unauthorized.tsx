import { Alert, AlertTitle } from "@/components/ui/alert";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <Alert  className="w-fit mx-auto sm:min-w-lg">
      <AlertTitle>You need to be logged to see this page.</AlertTitle>
    </Alert>
  );
}
