import type { ReactElement } from "react";

type IconProps = { name: string; className?: string };

const paths: Record<string, ReactElement> = {
  message: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h8m-8 4h5m7-12H6a2 2 0 00-2 2v12l4-4h12a2 2 0 002-2V4a2 2 0 00-2-2z"
    />
  ),
  eye: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0c-.9 2.6-4.2 5-7.5 5S8.4 14.6 7.5 12C8.4 9.4 11.7 7 15 7s6.6 2.4 7.5 5z"
    />
  ),
  wave: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 10v4m4-7v10m4-12v14m4-11v8m4-5v2"
    />
  ),
  image: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16l4-5 4 4 3-3 5 5M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm13 3h.01"
    />
  ),
  vector: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v18m-6-6l6 6 6-6M5 8l7-5 7 5"
    />
  ),
  mic: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3zm7-3a7 7 0 01-14 0M12 19v3"
    />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  ),
  copy: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 8h11v11H8zM5 16V5h11"
    />
  ),
  zap: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6l8-3z"
    />
  ),
  terminal: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 17l6-5-6-5m8 10h8"
    />
  ),
  x: <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />,
  menu: (
    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
  ),
  arrowRight: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-6-6l6 6-6 6"
    />
  ),
  sparkle: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z"
    />
  ),
  key: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 9a4 4 0 10-3.4 3.9L20 21m-2-2l-2-2m2 2l-1-1m1 1l2 2"
    />
  ),
  trash: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m3 0l-1 13a1 1 0 01-1 1H8a1 1 0 01-1-1L6 7"
    />
  ),
  play: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 5v14l11-7-11-7z"
    />
  ),
  clock: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 7v5l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  globe: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5 0 4-4 4-9s-1.5-9-4-9-4 4-4 9 1.5 9 4 9zM3 9h18M3 15h18"
    />
  ),
  doc: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 3h7l5 5v13H7V3zm7 0v5h5M10 13h6m-6 4h6"
    />
  ),
};

export function Icon({ name, className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}
