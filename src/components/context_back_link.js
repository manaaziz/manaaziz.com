"use client";

import { useRouter } from "next/navigation";

export default function ContextBackLink({ fallbackHref }) {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button className="back-link" onClick={goBack} type="button">
      ← Back
    </button>
  );
}
