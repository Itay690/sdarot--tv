import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';

export const Root: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};
