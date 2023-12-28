import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { useGetSdarotQuery } from '../store/services/sdarot.api';

export const Root: React.FC = () => {
  const { data: sdarot } = useGetSdarotQuery();

  return (
    <div className="h-full w-full">
      <Navbar />
      <div>
        {sdarot?.map((sidra) => (
          <div key={sidra.name}>{`${sidra.name} ${sidra.seasons}`}</div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
