"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="label border border-smoke/40 px-3 py-1.5 text-smoke transition-colors duration-200 hover:border-bone hover:text-bone"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
