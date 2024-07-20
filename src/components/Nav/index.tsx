interface NavProps{
    viewButtonLogin?: boolean
}
export function Nav({ viewButtonLogin }: NavProps) {
    
    return(
        <nav className="w-full bg-sky-700 h-20 flex justify-between items-center px-10">
            <p className="text-3xl font-bold">HUBBI</p>
            {
                viewButtonLogin ?
                <></>
                :
                <button className="w-32 bg-blue-950 font-bold text-xl rounded-md p-2">Login</button>
            }
        </nav>
    )
}