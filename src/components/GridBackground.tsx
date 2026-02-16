'use client';

export default function GridBackground() {
  return (
    <div
      className="fixed inset-0 grid-bg opacity-30 pointer-events-none z-0 bg-grid-pattern"
      aria-hidden="true"
    />
  );
}
