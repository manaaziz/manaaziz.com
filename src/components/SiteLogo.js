"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteLogo() {
  const [isSpinning, setIsSpinning] = useState(false);

  function spinLogo() {
    setIsSpinning(false);
    requestAnimationFrame(() => setIsSpinning(true));
  }

  return (
    <div className="brand" aria-label="Mana Azizsoltani">
      <button
        aria-label="Spin the Dr. Mana poker chip logo"
        className={`brand-chip${isSpinning ? " is-spinning" : ""}`}
        onAnimationEnd={() => setIsSpinning(false)}
        onClick={spinLogo}
        type="button"
      >
        <span className="brand-chip-inner">
          <span className="brand-chip-face brand-chip-front" aria-hidden="true">
            <span className="brand-chip-avatar">
              <img alt="" src="/assets/images/bitmoji_head_logo.png" />
            </span>
          </span>
          <span className="brand-chip-face brand-chip-back" aria-hidden="true">
            <span>Dr.</span>
            <strong>Mana</strong>
          </span>
        </span>
      </button>
      <Link className="brand-name" href="/" aria-label="Mana Azizsoltani home">
        Mana Azizsoltani
      </Link>
    </div>
  );
}
