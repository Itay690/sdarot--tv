import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { useGetSdarotQuery } from '../store/services/sdarot.api';

export const Root: React.FC = () => {
  const { data: sdarot } = useGetSdarotQuery();
  console.log(sdarot);
  return (
    <div className="h-full w-full">
      <Navbar />
      <div>
        {sdarot?.map((sidra) => <div>{`${sidra.name} ${sidra.seasons}`}</div>)}
      </div>
      <Outlet />
    </div>
  );
};
