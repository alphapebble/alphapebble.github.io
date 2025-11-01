"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function CommandPaletteTrigger() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.userAgent.includes("Mac"));
  }, []);

  const openPalette = () => {
    const e = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: isMac,
      ctrlKey: !isMac,
    });
    document.dispatchEvent(e);
  };

  return (
    <Button
      variant="ghost"
      className="text-muted h-9 px-3"
      onClick={openPalette}
    >
      Search...
      <span className="kbd-shortcut ml-3">{isMac ? "⌘" : "Ctrl"}K</span>
    </Button>
  );
}
