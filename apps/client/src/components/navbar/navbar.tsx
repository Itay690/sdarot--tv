import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-start gap-4 border-b p-4">
      <Link to="/" className="h-fit w-fit text-2xl">
        SdarotTV
      </Link>
      <Link to="/upload" className="rounded-lg px-4 py-2 hover:bg-slate-100">
        Upload
      </Link>
    </nav>
  );
};
