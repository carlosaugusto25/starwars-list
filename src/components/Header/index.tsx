import starwarsimg from "../../assets/starwars-logo3.png";
import { FaRegRectangleList } from "react-icons/fa6";

interface HeaderProps {
    widthImg?: string;
}
export function Header({ widthImg }: HeaderProps) {
    return (
        <header className="flex flex-col items-center justify-center mt-10">
            <img className={widthImg ? widthImg : "w-1/5 max-[520px]:w-4/5"} src={starwarsimg} alt="Logo do Star Wars" />
            <h1 className="text-3xl font-extrabold -mr-52 max-[520px]:-mr-28 flex flex-row items-center justify-center gap-2" >List <FaRegRectangleList /></h1>
        </header>
    )
}