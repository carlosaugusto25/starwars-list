import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../services/apis"
import { FilmProps, PersonProps, StarChipsProps } from "../../utils/types"
import axios from "axios"
import { Nav } from "../../components/Nav"
import { Header } from "../../components/Header"

export function StarchipsDetails() {
    const { id } = useParams()

    const [starChipsDetails, setStarchipsDetails] = useState<StarChipsProps>({} as StarChipsProps)

    const [pilots, setPilots] = useState<PersonProps[]>([]);

    const [films, setFilms] = useState<FilmProps[]>([]);

    const detailsStarchips = useCallback(() => {
        api.get(`/starships/${id}`).then(res => {
            setStarchipsDetails(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => { })
    }, [id])

    useEffect(() => {
        detailsStarchips()
    }, [detailsStarchips])

    useEffect(() => {
        const fetchPilots = async () => {
            if (starChipsDetails?.pilots) {
                const promises = starChipsDetails?.pilots?.map(async (pilot) => {
                    const response = await axios.get<PersonProps>(pilot)
                    return response.data
                })

                const results = await Promise.all(promises)
                setPilots(results)
            }
        }

        fetchPilots()

        const fetchFilms = async () => {
            if (starChipsDetails?.films) {
                const promises = starChipsDetails.films.map(async (film) => {
                    const response = await axios.get<FilmProps>(film)
                    return response.data
                })
                const results = await Promise.all(promises)
                setFilms(results)
            }
        }

        fetchFilms()

    }, [starChipsDetails])


    return (
        <>
            <Nav />
            <Header />
            <section className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold uppercase my-8">DETALHES DA NAVE</h2>
                <div className="w-3/5 mx-auto flex flex-row items-center justify-between bg-indigo-50/10 rounded-md p-6">
                    <div>
                        <p className="text-xl font-bold">Nome:</p>
                        <p className="font-bold text-5xl">{starChipsDetails?.name}</p>
                    </div>
                </div>
                <div className="w-3/5 mx-auto columns-2 bg-indigo-50/10 rounded-md p-6 my-6">

                    <div>
                        <div>
                            <p>Modelo:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.model}</p>
                        </div>
                        <div className="my-4">
                            <p>Fabricante:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.manufacturer}</p>
                        </div>
                        <div className="my-4">
                            <p>Custo em créditos:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.cost_in_credits}</p>
                        </div>
                        <div className="my-4">
                            <p>Comprimento:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.length}</p>
                        </div>
                        <div className="my-4">
                            <p>Equipe:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.crew}</p>
                        </div>
                        <div className="mt-2">
                            <p>Velocidade máxima de atmosfera:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.max_atmosphering_speed}</p>
                        </div>
                    </div>

                    <div>
                        <div className="my-4">
                            <p>Cpacidade de passageiros:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.passengers}</p>
                        </div>
                        <div className="my-4">
                            <p>Capacidade de carga:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.cargo_capacity}</p>
                        </div>
                        <div className="my-4">
                            <p>Duração de consumíveis:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.consumables}</p>
                        </div>
                        <div className="my-4">
                            <p>Classificação de hiperdrive:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.hyperdrive_rating}</p>
                        </div>
                        <div className="my-4">
                            <p>MGLT:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.MGLT}</p>
                        </div>
                        <div className="mt-2">
                            <p>Classe de nave estelar:</p>
                            <p className="font-bold text-2xl">{starChipsDetails?.starship_class}</p>
                        </div>

                    </div>
                </div>

                <div className="w-3/5 mx-auto  bg-indigo-50/10 rounded-md p-6 my-6">
                    <div className="mt-2">
                        <p>Piloto(s):</p>
                        {
                            pilots.length !== 0 ?
                                <>
                                    {
                                        pilots?.map((pilot, index) => (
                                            <p key={index} className="font-bold text-2xl">{pilot.name}</p>
                                        ))
                                    }
                                </>
                                :
                                <p className="font-bold text-2xl">Nenhum</p>
                        }
                    </div>
                </div>

                <div className="w-3/5 mx-auto  bg-indigo-50/10 rounded-md p-6 my-6">
                    <div className="mt-2">
                        <p>Filmes em que participou:</p>
                        {
                            films.length !== 0 ?
                                <>
                                    {
                                        films?.map((film, index) => (
                                            <p key={index} className="font-bold text-2xl">{film.title}</p>
                                        ))
                                    }
                                </>
                                :
                                <p className="font-bold text-2xl">Nenhum</p>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}