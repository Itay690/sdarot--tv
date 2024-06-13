import { useNavigate } from 'react-router-dom';
import { Card } from '../components/card';
import { useGetSdarotQuery } from '../store/services/sdarot.api';

export const Index: React.FC = () => {
  const navigate = useNavigate();
  const { data: sdarot } = useGetSdarotQuery();

  return (
    <div className="flex h-full w-full gap-4 p-4">
      {sdarot?.map((sidra) => (
        <Card
          key={sidra.name}
          className="cursor-pointer hover:bg-slate-100"
          onClick={() => {
            navigate(`watch/${sidra.id}`);
          }}
        >
          {sidra.name}
        </Card>
      ))}
    </div>
  );
};
