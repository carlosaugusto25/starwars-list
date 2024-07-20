import { useNavigate } from "react-router-dom";

interface CardPersonProps {
    name: string;
    details?: boolean;
    idStarchips?: string;
}
export function CardPerson({ name, details, idStarchips }: CardPersonProps) {
    const navigate = useNavigate()
    return (
        <div className="w-full flex flex-row items-center justify-between bg-indigo-50/10 rounded-md p-6">
            <div>
                <p className="text-xl">Nome:</p>
                <p className="font-bold text-5xl">{name}</p>
            </div>
            {
                details && <button onClick={()=>navigate(`/starchips/${idStarchips}`)} className="w-22 bg-sky-500 rounded-md p-2 ">Ver Detalhes</button>
            }
            
        </div>
    )
}