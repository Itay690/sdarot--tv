import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b">
      <Link to="/" className="text-2xl text-blue-200">
        SdarotTV
      </Link>
      <button className="rounded-md border bg-slate-300 p-2 hover:bg-slate-500">
        Sign In
      </button>
      <button className="rounded-md border bg-slate-300 p-2 hover:bg-slate-500">
        Sign Up
      </button>
    </nav>
  );
};
