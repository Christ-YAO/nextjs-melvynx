import { Alert, AlertTitle } from "@/components/ui/alert";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <Alert>
      <AlertTitle>You need to be logged to see this page.</AlertTitle>
    </Alert>
  );
}
