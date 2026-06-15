import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="lede">This page did not make the migration intact.</p>
      <Link className="button primary" href="/">
        Go home
      </Link>
    </main>
  );
}
