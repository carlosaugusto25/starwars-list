import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

interface CardPersonProps {
    name: string;
    details?: boolean;
    idStarchips?: string;
    detailsPerson?: boolean;
    idPerson?: string;
}
export function CardPerson({ name, details, idStarchips, detailsPerson, idPerson }: CardPersonProps) {
    const navigate = useNavigate()
    const { user } = useAuth()
    return (
        <div className="w-full flex flex-row items-center justify-between bg-indigo-50/35 rounded-md p-6 max-[520px]:p-4">
            <div>
                <p className="text-xl max-[520px]:text-sm">Nome:</p>
                <p className="font-bold text-5xl max-[520px]:text-base">{name}</p>
            </div>
            {
                details && <button onClick={()=>navigate(`/starchips/${idStarchips}`)} className="w-22 bg-sky-500 rounded-md p-2 max-[520px]:text-xs">Detalhes</button>
            }
            {
                (detailsPerson && user) && <button onClick={()=>navigate(`/person/${idPerson}`)} className="w-22 bg-sky-500 rounded-md py-2 px-4 max-[520px]:text-xs">Detalhes</button>
            }
            
        </div>
    )
}