import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/apis";
import { PersonProps, StarChipsProps } from "../../utils/types";
import { CardPerson } from "../../components/CardPerson";

export function Home() {

    const [person, setPerson] = useState<PersonProps[]>([]);
    const [starchips, setStarchips] = useState<StarChipsProps[]>([]);

    const [list, setList] = useState('persons')

    const loadPerson = useCallback(() => {
        api.get('/people').then(res => {
            setPerson(res.data.results)
        }).catch(err => {
            console.log(err);
            alert('Não foi possível carregar listagem de Personagens');
        }).finally(() => { })
    }, [])

    const loadStarChips = useCallback(() => {
        api.get('/starships').then(res => {
            setStarchips(res.data.results)
        }).catch(err => {
            console.log(err);
            alert('Não foi possível carregar listagem de Naves');
        }).finally(() => { })
    }, [])

    useEffect(() => {
        if(list === 'persons') {
            loadPerson()
        } else if(list === 'starchips') {
            loadStarChips()
        }
    }, [loadPerson, list, loadStarChips])

    return (
        <>
            
            <div className="flex flex-row items-center justify-center gap-4 mt-6">
                <button onClick={() => setList('persons')} className={list === 'persons' ? "bg-sky-500 font-bold w-32 py-2 rounded-md" : "bg-sky-800 font-bold w-32 py-2 rounded-md"}>Personagens</button>
                <button onClick={() => setList('starchips')} className={list === 'starchips' ? "bg-sky-500 font-bold w-32 py-2 rounded-md" : "bg-sky-800 font-bold w-32 py-2 rounded-md"}>Naves</button>
            </div>
            {
                list === 'persons' ?
                    <section className="flex flex-col mx-auto items-center justify-center mt-10 w-1/2 gap-4 pb-16">
                        <h2 className="text-4xl font-bold uppercase">Personagens</h2>
                        {person?.map((item, index) => (
                            <CardPerson key={index} name={item.name} />
                        ))}
                    </section>
                    :
                    <section className="flex flex-col mx-auto items-center justify-center mt-10 w-1/2 gap-4 pb-16">
                        <h2 className="text-4xl font-bold uppercase">Naves</h2>
                        {starchips?.map((item, index) => (
                            <CardPerson key={index} name={item.name} details idStarchips={item.url.split('/')[5]} />
                        ))}
                    </section>
            }

        </>
    )
}