import { useStatus } from "../redux/hooks/status";

export function Status() {
    const { state: status } = useStatus();

    return (
        <h4>Estatus: {status ? <span className="text-success">En Línea</span> : <span className="text-secondary">Fuera de Línea</span>} </h4>
    );
}