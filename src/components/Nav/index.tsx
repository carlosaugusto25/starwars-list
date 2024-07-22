import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"
import { FaCircleUser, FaArrowRightFromBracket, FaDoorOpen } from "react-icons/fa6";


export function Nav() {

    const navigation = useNavigate()

    const { user, signOut } = useAuth()

    function handleLogout(){
        signOut()
        navigation('/')
    }

    return (
        <nav className="w-full bg-sky-700 h-20 flex justify-between items-center px-10 max-[520px]:px-5">
            <a href="/">
                <p className="text-3xl font-bold">HUBBI</p>
            </a>
            {
                !user ?
                <button onClick={() => navigation('/login')} className="w-32 bg-blue-950 font-bold text-xl rounded-md p-2 flex flex-row items-center justify-center gap-2">Entrar <FaDoorOpen /></button>
                :
                <div className="flex flex-row gap-4 items-center">
                    <FaCircleUser size={36} />
                    <p className="text-xl max-[520px]:hidden">Olá, <strong>{user.name}</strong></p>
                    <button className="w-32 bg-blue-950 font-bold text-xl rounded-md p-2 flex flex-row items-center justify-center gap-2" onClick={handleLogout}>Sair <FaArrowRightFromBracket /></button>
                </div>
            }
        </nav>
    )
}