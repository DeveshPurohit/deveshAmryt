"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const path = usePathname();

  return (
    <>
      {path === "/" ? (
        <header className="flex items-center justify-between space-x-6 py-2 px-3 bg-slate-600 text-white">
        <div className="flex space-x-5">
          <div className="hover:bg-slate-700 py-2 px-3 cursor-pointer rounded-full">
            Sign up
          </div>
          <Link
            href={"/dashboard"}
            className="hover:bg-slate-700 py-2 px-3 cursor-pointer rounded-full"
          >
            Login
          </Link>
        </div>
        <Link
          href={"/"}
          className="hover:bg-slate-700 py-2 px-3 cursor-pointer rounded-full"
        >
          Logout
        </Link>
      </header>
      ) : (
        <header className="flex items-center justify-between space-x-6 py-2 px-3 bg-slate-600 text-white">
          <Link
            href={"/dashboard"}
            className={`hover:bg-slate-700 py-2 px-3 cursor-pointer rounded-full ${path === '/dashboard' && 'text-orange-400'}`}
          >
            Dashboard
          </Link>
          <div className="flex space-x-3">

          <Link
            href={"/profile"}
            className={`hover:bg-slate-700 py-2 px-3 cursor-pointer rounded-full ${path === '/profile' && 'text-orange-400'}`}
          >
            Create Profile
          </Link>
          <Link
          href={"/"}
          className="hover:bg-slate-700 py-2 px-3 cursor-pointer rounded-full"
        >
          Logout
        </Link>
          </div>
        </header>
        
      )}
    </>
  );
};
