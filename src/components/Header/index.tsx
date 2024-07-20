import starwarsimg from "../../assets/starwars-logo3.png";
export function Header() {
    return(
        <header className="flex flex-col items-center justify-center mt-10">
                <img className="w-1/5" src={starwarsimg} alt="Logo do Star Wars" />
                <h1 className="text-3xl font-extrabold -mr-52">List</h1>
            </header>
    )
}