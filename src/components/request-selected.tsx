import { IRequest } from '@/interfaces/request';
import { useRequests } from '@/redux/hooks/requests';

export default function () {
  const { state: requests } = useRequests();

  const current: IRequest | null =
    requests.find((request) => request.current) ?? null;

  return current !== null ? (
    <h4>
      Atendiendo la petición de:{' '}
      <span className="text-secondary">{current.user_nickname}</span>
    </h4>
  ) : null;
}
