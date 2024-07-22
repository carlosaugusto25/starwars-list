import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../services/apis"
import { FilmProps, PersonProps, StarChipsProps } from "../../utils/types"
import axios from "axios"
import { Nav } from "../../components/Nav"
import { Header } from "../../components/Header"
import { Loading } from "../../components/Loading"
import { Footer } from "../../components/Footer"

export function StarchipsDetails() {
    const { id } = useParams()

    const [starChipsDetails, setStarchipsDetails] = useState<StarChipsProps>({} as StarChipsProps)

    const [pilots, setPilots] = useState<PersonProps[]>([]);

    const [films, setFilms] = useState<FilmProps[]>([]);

    const [loading, setLoading] = useState(true)
    const [loadingPilots, setLoadingPilots] = useState(true)
    const [loadingFilms, setLoadingFilms] = useState(true)

    const detailsStarchips = useCallback(() => {
        setLoading(true)
        api.get(`/starships/${id}`).then(res => {
            setStarchipsDetails(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        detailsStarchips()
    }, [detailsStarchips])

    useEffect(() => {
        const fetchPilots = async () => {
            if (starChipsDetails?.pilots) {
                setLoadingPilots(true)
                const promises = starChipsDetails?.pilots?.map(async (pilot) => {
                    const response = await axios.get<PersonProps>(pilot)
                    return response.data
                })

                const results = await Promise.all(promises)
                setPilots(results)
                setLoadingPilots(false)
            }
        }

        fetchPilots()

        const fetchFilms = async () => {
            if (starChipsDetails?.films) {
                setLoadingFilms(true)
                const promises = starChipsDetails.films.map(async (film) => {
                    const response = await axios.get<FilmProps>(film)
                    return response.data
                })
                const results = await Promise.all(promises)
                setFilms(results)
                setLoadingFilms(false)
            }
        }

        fetchFilms()

    }, [starChipsDetails])


    return (
        <>
            <Nav />
            <Header />
            <>
                {
                    (loading && loadingFilms && loadingPilots) ?
                        <Loading /> :
                        <section className="flex flex-col items-center justify-center">
                            <h2 className="text-4xl font-bold uppercase my-8 max-[520px]:text-2xl max-[520px]:text-center">DETALHES DA NAVE</h2>
                            <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto flex flex-row items-center justify-between bg-indigo-50/10 rounded-md p-6">
                                <div>
                                    <p className="text-xl font-bold">Nome:</p>
                                    <p className="font-bold text-5xl max-[520px]:text-4xl">{starChipsDetails?.name}</p>
                                </div>
                            </div>
                            <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto columns-2 bg-indigo-50/10 rounded-md p-6 my-6">

                                <div>
                                    <div>
                                        <p className="max-[520px]:text-sm">Modelo:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.model}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Fabricante:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.manufacturer}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Custo em créditos:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.cost_in_credits}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Comprimento:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.length}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Equipe:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.crew}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="max-[520px]:text-sm">Velocidade máxima de atmosfera:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.max_atmosphering_speed}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Cpacidade de passageiros:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.passengers}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Capacidade de carga:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.cargo_capacity}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Duração de consumíveis:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.consumables}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">Classificação de hiperdrive:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.hyperdrive_rating}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="max-[520px]:text-sm">MGLT:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.MGLT}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="max-[520px]:text-sm">Classe de nave estelar:</p>
                                        <p className="font-bold text-2xl max-[520px]:text-xl">{starChipsDetails?.starship_class}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto  bg-indigo-50/10 rounded-md p-6 mb-3">
                                <div className="mt-2 max-[520px]:mb-2">
                                    <p className="max-[520px]:text-sm max-[520px]:mb-4">Piloto(s):</p>
                                    {
                                        pilots.length !== 0 ?
                                            <>
                                                {
                                                    pilots?.map((pilot, index) => (
                                                        <p key={index} className="font-bold text-2xl max-[520px]:text-xl">{pilot.name}</p>
                                                    ))
                                                }
                                            </>
                                            :
                                            <p className="font-bold text-2xl max-[520px]:text-xl">Nenhum</p>
                                    }
                                </div>
                            </div>

                            <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto  bg-indigo-50/10 rounded-md p-6 mt-3 mb-6">
                                <div className="mt-2 max-[520px]:mb-2">
                                    <p className="max-[520px]:text-sm max-[520px]:mb-4">Filmes em que participou:</p>
                                    {
                                        films.length !== 0 ?
                                            <>
                                                {
                                                    films?.map((film, index) => (
                                                        <p key={index} className="font-bold text-2xl max-[520px]:text-xl">{film.title}</p>
                                                    ))
                                                }
                                            </>
                                            :
                                            <p className="font-bold text-2xl max-[520px]:text-xl">Nenhum</p>
                                    }
                                </div>
                            </div>
                        </section>
                }
            </>
            <Footer />
        </>
    )
}