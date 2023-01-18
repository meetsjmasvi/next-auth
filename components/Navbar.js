import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">NextAuth</a>
      </h1>
      <ul className={`main-nav`}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {session && (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/blogsecure">Blog Secure</Link>
        </li>
        <li>
          <Link href="/checksecureapi">Secure API</Link>
        </li>
        {!session && (
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signIn("github");
              }}
            >
              Sign In
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
