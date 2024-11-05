import { Iplan_estudio } from "../Models/Iplan_estudio";


interface Props {
    open: boolean;
    onClose: () => void;
    editState: Iplan_estudio | null; // Asignatura a editar (si aplica)
    planDeEstudios: Iplan_estudio[] | null; // Asignatura a editar (si aplica)
}
export const PlanDeEstudioClonarForm: React.FC<Props> = ({ open, onClose, editState, planDeEstudios }) => {
    console.log(open);
    console.log(onClose);
    console.log(editState);
    console.log(planDeEstudios);


    return (
        <div>PlanDeEstudioClonarForm</div>
    )
}
