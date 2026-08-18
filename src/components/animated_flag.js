"use client";

const flagColumnCount = 12;

export default function AnimatedFlag({ children, className = "", label }) {
  return (
    <span
      aria-label={`${label} flag`}
      className={`mini-flag ${className}`.trim()}
      role="img"
    >
      {Array.from({ length: flagColumnCount }).map((_, index) => (
        <span
          aria-hidden="true"
          className="mini-flag-column"
          key={index}
          style={{
            "--column-index": index,
            "--column-count": flagColumnCount,
            "--column-offset": index
          }}
        >
          <svg
            aria-hidden="true"
            className="mini-flag-art"
            preserveAspectRatio="none"
            viewBox="0 0 120 80"
          >
            {children}
          </svg>
        </span>
      ))}
    </span>
  );
}
