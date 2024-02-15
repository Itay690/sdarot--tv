import { cn } from '../utils';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'flex h-fit w-fit flex-col items-center justify-start rounded-lg border p-4',
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
};
