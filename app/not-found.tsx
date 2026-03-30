'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="max-w-md mx-auto text-center p-8">
        <h1 className="font-headline text-6xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Page Not Found</h2>
        <p className="text-on-surface-variant mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-dim transition-colors"
        >
          <span className="material-symbols-outlined">home</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
