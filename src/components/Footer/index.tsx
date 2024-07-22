import { FaWhatsapp, FaRegEnvelope, FaLinkedin, FaGithub  } from "react-icons/fa6";

export function Footer(){
    return(
        <footer className="w-full bg-sky-700 h-16 max-[520px]:h-auto max-[520px]:py-5 flex max-[520px]:flex-col max-[520px]:gap-2 justify-between items-center px-10 max-[520px]:px-5">
            <p className="font-bold max-[520px]:text-sm">© 2024 - Developed by Carlos Augusto for Hubbi</p>
            <div className="flex items-center  gap-4">
                <div className="flex flex-row items-center gap-2">
                    <FaWhatsapp size={26} />
                    <p className="max-[520px]:text-xs">(84) 99965-7255</p>
                </div>
                <div className="flex flex-row items-center gap-2 max-[520px]:hidden">
                    <FaRegEnvelope size={26} />
                    <p className="max-[520px]:text-xs">carlosmedeiros.dev@gmail.com</p>
                </div>
                <div className="flex flex-row gap-2">
                    <a href="https://www.linkedin.com/in/carlos-augusto-dev/" target="_blank" rel="noopener noreferrer" ><FaLinkedin size={26} /></a>
                </div>
                <div className="flex flex-row gap-2">
                    <a href="https://github.com/carlosaugusto25" target="_blank" rel="noopener noreferrer" ><FaGithub size={26} /></a>
                </div>
            </div>
        </footer>
    )
}