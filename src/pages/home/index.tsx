import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/apis";
import { PersonProps, StarChipsProps } from "../../utils/types";
import { CardPerson } from "../../components/CardPerson";
import { Nav } from "../../components/Nav";
import { Header } from "../../components/Header";
import { FaRocket, FaUserAstronaut } from "react-icons/fa6";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";

export function Home() {

    const [person, setPerson] = useState<PersonProps[]>([]);
    const [starchips, setStarchips] = useState<StarChipsProps[]>([]);

    const [loadingPerson, setLoadingPerson] = useState(true);
    const [loadingStarChips, setLoadingStarChips] = useState(true);

    const [list, setList] = useState('persons')

    const [pagePerson, setPagePerson] = useState<number>(1)
    const [pageStarChips, setPageStarChips] = useState<number>(1)
    const [totalPagesPerson, setTotalPagesPerson] = useState<number>(0)
    const [totalPagesStarChips, setTotalPagesStarChips] = useState<number>(0)

    useEffect(() => {
        const pagePerson = localStorage.getItem('@pagePerson')
        const pageStarChips = localStorage.getItem('@pageStarChips')
        if (pagePerson === null) {
            localStorage.setItem('@pagePerson', '1')
        }
        if (pageStarChips === null) {
            localStorage.setItem('@pageStarChips', '1')
        }
    }, [])


    const loadPagesPerson = useCallback(() => {
        api.get('/people').then(res => {
            setTotalPagesPerson(Math.ceil(res.data.count / 10))
        }).catch(err => {
            console.log(err);
        }).finally(() => { })
    }, [])

    const loadPagesStarChips = useCallback(() => {
        api.get('/starships').then(res => {
            setTotalPagesStarChips(Math.ceil(res.data.count / 10))
        }).catch(err => {
            console.log(err);
        }).finally(() => { })
    }, [])

    useEffect(() => {
        loadPagesPerson()
        loadPagesStarChips()
    }, [loadPagesPerson, loadPagesStarChips])

    const loadPerson = useCallback((page: string | null) => {
        setLoadingPerson(true)
        api.get(`/people/?page=${page}`).then(res => {
            setPerson(res.data.results)
        }).catch(err => {
            console.log(err);
            alert('Não foi possível carregar listagem de Personagens');
        }).finally(() => setLoadingPerson(false))
    }, [])

    const loadStarChips = useCallback((page: string | null) => {
        setLoadingStarChips(true)
        api.get(`/starships/?page=${page}`).then(res => {
            setStarchips(res.data.results)
        }).catch(err => {
            console.log(err);
            alert('Não foi possível carregar listagem de Naves');
        }).finally(() => setLoadingStarChips(false))
    }, [])

    useEffect(() => {
        const pagePerson = localStorage.getItem('@pagePerson')
        const pageStarChips = localStorage.getItem('@pageStarChips')
        if (list === 'persons') {
            loadPerson(pagePerson)
        } else if (list === 'starchips') {
            loadStarChips(pageStarChips)
        }
    }, [loadPerson, list, loadStarChips])

    const nextPagePerson = useCallback(() => {
        const page = localStorage.getItem('@pagePerson')
        if (Number(page) < totalPagesPerson) {
            localStorage.setItem('@pagePerson', `${Number(page) + 1}`)
            const pageAtt = localStorage.getItem('@pagePerson')
            loadPerson(pageAtt)
        } else {
            return alert('Esta é a última página')
        }
        console.log(localStorage.getItem('@pagePerson'))
    }, [totalPagesPerson, loadPerson])

    const previusPagePerson = useCallback(() => {
        const pagePerson = localStorage.getItem('@pagePerson')
        if (Number(pagePerson) > 1) {
            localStorage.setItem('@pagePerson', String(Number(pagePerson) - 1))
            const pageAtt = localStorage.getItem('@pagePerson')
            loadPerson(pageAtt)
        } else {
            return alert('Esta é a primeira página')
        }
    }, [loadPerson])

    const nextPageStarChips = useCallback(() => {
        const page = localStorage.getItem('@pageStarChips')
        if (Number(page) < totalPagesStarChips) {
            localStorage.setItem('@pageStarChips', `${Number(page) + 1}`)
            const pageAtt = localStorage.getItem('@pageStarChips')
            loadStarChips(pageAtt)
        } else {
            return alert('Esta é a última pagina')
        }
        console.log(localStorage.getItem('@pageStarChips'))
    }, [totalPagesStarChips, loadStarChips])

    const previusPageStarChips = useCallback(() => {
        const pageStarChips = localStorage.getItem('@pageStarChips')
        if (Number(pageStarChips) > 1) {
            localStorage.setItem('@pageStarChips', String(Number(pageStarChips) - 1))
            const pageAtt = localStorage.getItem('@pageStarChips')
            loadStarChips(pageAtt)
        } else {
            return alert('Esta é a primeira página')
        }
    }, [loadStarChips])

    const handleToPagePerson = useCallback(() => {
        if (pagePerson > 0 && pagePerson <= totalPagesPerson) {
            localStorage.setItem('@pagePerson', String(pagePerson))
            const pageAtt = localStorage.getItem('@pagePerson')
            loadPerson(pageAtt)
        } else {
            return alert('Esta é uma página inválida')
        }
        setPagePerson(1)
    }, [loadPerson, totalPagesPerson, pagePerson])

    const handleToPageStarChips = useCallback(() => {
        if (pageStarChips > 0 && pageStarChips <= totalPagesStarChips) {
            localStorage.setItem('@pageStarChips', String(pageStarChips))
            const pageAtt = localStorage.getItem('@pagePerson')
            loadStarChips(pageAtt)
        } else {
            return alert('Esta é uma página inválida')
        }
        setPageStarChips(1)
    }, [loadStarChips, totalPagesStarChips, pageStarChips])

    return (
        <>
            <Nav />
            <Header />
            <div className="flex flex-row items-center justify-center gap-4 mt-6">
                <button onClick={() => setList('persons')} className={list === 'persons' ? "bg-sky-500 font-bold w-40 py-2 rounded-md flex flex-row items-center justify-center gap-2" : "bg-sky-800 font-bold w-40 py-2 rounded-md flex flex-row items-center justify-center gap-2"}>Personagens <FaUserAstronaut /></button>
                <button onClick={() => setList('starchips')} className={list === 'starchips' ? "bg-sky-500 font-bold w-40 py-2 rounded-md flex flex-row items-center justify-center gap-2" : "bg-sky-800 font-bold w-40 py-2 rounded-md flex flex-row items-center justify-center gap-2"}>Naves <FaRocket /></button>
            </div>
            {
                list === 'persons' ?
                    <>
                        {
                            loadingPerson ?
                                <Loading />
                                :
                                <>
                                    <section className="flex flex-col mx-auto items-center justify-center mt-10 max-[520px]:w-3/4 lg:w-3/4 2xl:w-1/2 gap-4 pb-4">
                                        <h2 className="text-4xl max-[520px]:text-2xl font-bold uppercase">Personagens</h2>
                                        {person?.map((item, index) => (
                                            <CardPerson key={index} name={item.name} detailsPerson idPerson={item.url.split('/')[5]} />
                                        ))}

                                    </section>
                                    <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-1/2 mx-auto flex max-[520px]:flex-col flex-row items-center justify-end gap-4 pb-16">
                                        {/* versão responsiva */}
                                        <div className="max-[520px]:flex flex-row gap-4 min-[521px]:hidden">
                                            <button onClick={previusPagePerson} className="cursor-pointer w-32 bg-sky-500 rounded-md p-2">Voltar</button>
                                            <button onClick={nextPagePerson} className="cursor-pointer w-32 bg-sky-500 rounded-md p-2">Avançar</button>
                                        </div>
                                        <div className="max-[520px]:flex min-[521px]:hidden">
                                            <p>Selecione uma página:</p>
                                        </div>
                                        <div className="max-[520px]:flex flex-row gap-4 min-[521px]:hidden">
                                            <input placeholder="1" value={pagePerson} onChange={e => setPagePerson(Number(e.target.value))} type="text" className="w-16 border-none rounded-md p-2 text-slate-950" />
                                            <button onClick={handleToPagePerson} className="cursor-pointer w-16 bg-sky-500 rounded-md p-2">Ir</button>
                                        </div>
                                        <div className="max-[520px]:flex min-[521px]:hidden">
                                            <p className="font-extrabold">Total de páginas: {totalPagesPerson}</p>
                                        </div>
                                        <div className="max-[520px]:flex min-[521px]:hidden">
                                            <p className="font-bold">Pagina atual: {localStorage.getItem('@pagePerson')}</p>
                                        </div>

                                        {/* versão desktop */}
                                        <p className="max-[520px]:hidden font-extrabold">Total de páginas: {totalPagesPerson}</p>
                                        <p className="max-[520px]:hidden font-bold">Pagina atual: {localStorage.getItem('@pagePerson')}</p>
                                        <p className="max-[520px]:hidden">Selecione uma página:</p>
                                        <input placeholder="1" value={pagePerson} onChange={e => setPagePerson(Number(e.target.value))} type="text" className="max-[520px]:hidden w-12 border-none rounded-md p-2 text-slate-950" />
                                        <button onClick={handleToPagePerson} className="max-[520px]:hidden cursor-pointer w-16 bg-sky-500 rounded-md p-2">Ir</button>
                                        <button onClick={previusPagePerson} className="max-[520px]:hidden cursor-pointer w-32 bg-sky-500 rounded-md p-2">Voltar</button>
                                        <button onClick={nextPagePerson} className="max-[520px]:hidden cursor-pointer w-32 bg-sky-500 rounded-md p-2">Avançar</button>
                                    </div>
                                </>
                        }
                    </>
                    :
                    <>
                        {
                            loadingStarChips ?
                                <Loading />
                                :
                                <>
                                    <section className="flex flex-col mx-auto items-center justify-center mt-10 max-[520px]:w-3/4 lg:w-3/4 2xl:w-1/2 gap-4 pb-4">
                                        <h2 className="text-4xl max-[520px]:text-2xl font-bold uppercase">Naves</h2>
                                        {starchips?.map((item, index) => (
                                            <CardPerson key={index} name={item.name} details idStarchips={item.url.split('/')[5]} />
                                        ))}
                                    </section>
                                    <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-1/2 mx-auto flex flex-row max-[520px]:flex-col items-center justify-end gap-4 pb-16">
                                        {/* versão responsiva */}
                                        <div className="max-[520px]:flex flex-row gap-4 min-[521px]:hidden">
                                            <button onClick={previusPageStarChips} className="cursor-pointer w-32 bg-sky-500 rounded-md p-2">Voltar</button>
                                            <button onClick={nextPageStarChips} className="cursor-pointer w-32 bg-sky-500 rounded-md p-2">Avançar</button>
                                        </div>
                                        <div className="max-[520px]:flex min-[521px]:hidden">
                                            <p>Selecione uma página:</p>
                                        </div>
                                        <div className="max-[520px]:flex flex-row gap-4 min-[521px]:hidden">
                                            <input type="text" value={pageStarChips} onChange={e => setPageStarChips(Number(e.target.value))} className="w-16 border-none rounded-md p-2 text-slate-950" />
                                            <button onClick={handleToPageStarChips} className="cursor-pointer w-16 bg-sky-500 rounded-md p-2">Ir</button>
                                        </div>
                                        <div className="max-[520px]:flex min-[521px]:hidden">
                                            <p className="font-extrabold">Total de páginas: {totalPagesStarChips}</p>
                                        </div>
                                        <div className="max-[520px]:flex min-[521px]:hidden">
                                            <p className="font-bold">Pagina atual: {localStorage.getItem('@pageStarChips')}</p>
                                        </div>
                                        {/* versão desktop */}
                                        <p className="max-[520px]:hidden font-extrabold">Total de páginas: {totalPagesStarChips}</p>
                                        <p className="max-[520px]:hidden font-bold">Pagina atual: {localStorage.getItem('@pageStarChips')}</p>
                                        <p className="max-[520px]:hidden">Selecione uma página:</p>
                                        <input type="text" value={pageStarChips} onChange={e => setPageStarChips(Number(e.target.value))} className="max-[520px]:hidden w-12 border-none rounded-md p-2 text-slate-950" />
                                        <button onClick={handleToPageStarChips} className="max-[520px]:hidden cursor-pointer w-16 bg-sky-500 rounded-md p-2">Ir</button>
                                        <button onClick={previusPageStarChips} className="max-[520px]:hidden cursor-pointer w-32 bg-sky-500 rounded-md p-2">Voltar</button>
                                        <button onClick={nextPageStarChips} className="max-[520px]:hidden cursor-pointer w-32 bg-sky-500 rounded-md p-2">Avançar</button>
                                    </div>
                                </>
                        }
                    </>

            }
            <Footer />
        </>
    )
}