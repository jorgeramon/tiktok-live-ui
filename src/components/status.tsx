import { useStatus } from '@/redux/hooks/status';

export default function () {
  const { state: status } = useStatus();

  return (
    <h4>
      Estatus:{' '}
      {status ? (
        <span className="text-success">En Línea</span>
      ) : (
        <span className="text-secondary">Fuera de Línea</span>
      )}{' '}
    </h4>
  );
}
