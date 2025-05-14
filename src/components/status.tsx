import { useStatus } from "../redux/hooks/status";

export function Status() {
    const { state: status } = useStatus();

    return (
        <h3>Estatus: {status ? 'En Línea' : 'Fuera de Línea'} </h3>
    );
}