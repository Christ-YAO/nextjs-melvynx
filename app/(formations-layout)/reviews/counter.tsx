"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>{count}</Button>;
}
