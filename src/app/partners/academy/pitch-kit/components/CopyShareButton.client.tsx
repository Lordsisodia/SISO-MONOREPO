"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyShareButtonProps {
  shareUrl: string;
}

export function CopyShareButton({ shareUrl }: CopyShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button variant="secondary" size="lg" onClick={handleCopy} className="flex items-center justify-center gap-2">
      {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      {copied ? "Link copied" : "Copy share link"}
    </Button>
  );
}

