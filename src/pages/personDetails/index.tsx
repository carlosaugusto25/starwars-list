import { useParams } from "react-router-dom"
import { Nav } from "../../components/Nav"
import { Header } from "../../components/Header"
import { useCallback, useEffect, useState } from "react"
import { FilmProps, PersonProps, PlanetsProps, SpeciesProps, StarChipsProps, VehiclesProps } from "../../utils/types"
import { api } from "../../services/apis"
import axios from "axios"
import { Loading } from "../../components/Loading"
import { Footer } from "../../components/Footer"

export function PersonDetails() {
    const { id } = useParams()

    const [personDetails, setPersonDetails] = useState<PersonProps>({} as PersonProps)

    const [species, setSpecies] = useState<SpeciesProps[]>([])

    const [planet, setPlanet] = useState<PlanetsProps>({} as PlanetsProps)

    const [vehicles, setVehicles] = useState<VehiclesProps[]>([])

    const [films, setFilms] = useState<FilmProps[]>([]);

    const [starChips, setStarChips] = useState<StarChipsProps[]>([]);

    const [loading, setLoading] = useState(true)
    const [loadingFilms, setLoadingFilms] = useState(true)
    const [loadingSpecies, setLoadingSpecies] = useState(true)
    const [loadingVehicles, setLoadingVehicles] = useState(true)
    const [loadingStarChips, setLoadingStarChips] = useState(true)
    const [loadingPlanet, setLoadingPlanet] = useState(true)

    const detailsPerson = useCallback(() => {
        setLoading(true)
        api.get(`/people/${id}`).then(res => {
            setPersonDetails(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        detailsPerson()
    }, [detailsPerson])

    useEffect(() => {
        const fetchPlanet = async () => {
            if (personDetails?.homeworld) {
                setLoadingPlanet(true)
                const response = await axios.get<PlanetsProps>(personDetails.homeworld)
                setPlanet(response.data)
                setLoadingPlanet(false)
                return response.data
            }
        }
        fetchPlanet()
    }, [personDetails])

    useEffect(() => {
        const fetchFilms = async () => {
            if (personDetails?.films) {
                setLoadingFilms(true)
                const promises = personDetails?.films?.map(async (film) => {
                    const response = await axios.get<FilmProps>(film)
                    return response.data
                })

                const results = await Promise.all(promises)
                setFilms(results)
                setLoadingFilms(false)
            }
        }
        fetchFilms()

        const fetchSpecies = async () => {
            if (personDetails?.species) {
                setLoadingSpecies(true)
                const promises = personDetails?.species?.map(async (specie) => {
                    const response = await axios.get<SpeciesProps>(specie)
                    return response.data
                })

                const results = await Promise.all(promises)
                setSpecies(results)
                setLoadingSpecies(false)
            }
        }
        fetchSpecies()

        const fetchVehicles = async () => {
            if (personDetails?.vehicles) {
                setLoadingVehicles(true)
                const promises = personDetails?.vehicles?.map(async (vehicle) => {
                    const response = await axios.get<VehiclesProps>(vehicle)
                    return response.data
                })

                const results = await Promise.all(promises)
                setVehicles(results)
                setLoadingVehicles(false)
            }
        }
        fetchVehicles()

        const fetchStarships = async () => {
            setLoadingStarChips(true)
            if (personDetails?.starships) {
                const promises = personDetails?.starships?.map(async (starchip) => {
                    const response = await axios.get<StarChipsProps>(starchip)
                    return response.data
                })

                const results = await Promise.all(promises)
                setStarChips(results)
                setLoadingStarChips(false)
            }
        }
        fetchStarships()
    }, [personDetails])

    return (
        <>
            <Nav />
            <Header />
            <>
                {(loading && loadingFilms && loadingSpecies && loadingVehicles && loadingStarChips && loadingPlanet) ?
                    <Loading />
                    :
                    <section className="flex  flex-col items-center justify-center mb-8">
                        <h2 className="text-4xl max-[520px]:text-2xl max-[520px]:text-center font-bold uppercase my-8">DETALHES DO PERSONAGEM</h2>
                        <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto flex flex-row items-center justify-between bg-indigo-50/10 rounded-md p-6">
                            <div>
                                <p className="text-xl font-bold">Nome:</p>
                                <p className="font-bold text-5xl max-[520px]:text-4xl">{personDetails?.name}</p>
                            </div>
                        </div>
                        <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto columns-2 bg-indigo-50/10 rounded-md p-6 my-6">

                            <div>
                                <div>
                                    <p className="max-[520px]:text-sm">Altura:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.height}</p>
                                </div>
                                <div className="my-4">
                                    <p className="max-[520px]:text-sm">Massa:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.mass}</p>
                                </div>
                                <div className="my-4">
                                    <p className="max-[520px]:text-sm">Cor da pele:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.skin_color}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="max-[520px]:text-sm">Cor do cabelo:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.hair_color}</p>
                                </div>
                            </div>

                            <div>
                                <div className="my-4">
                                    <p className="max-[520px]:text-sm">Cor dos olhos:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.eye_color}</p>
                                </div>
                                <div className="my-4">
                                    <p className="max-[520px]:text-sm">Gênero:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.gender}</p>
                                </div>
                                <div className="my-4">
                                    <p className="max-[520px]:text-sm">Ano de nascimento:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{personDetails.birth_year}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="max-[520px]:text-sm">Planeta natal:</p>
                                    <p className="font-bold text-2xl max-[520px]:text-xl">{planet.name}</p>
                                </div>

                            </div>
                        </div>

                        <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto columns-2 max-[520px]:flex max-[520px]:flex-col bg-indigo-50/10 rounded-md p-6 mb-3">
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
                            <div className="mt-2">
                                <p className="max-[520px]:text-sm max-[520px]:mb-4">Espécies:</p>
                                {
                                    species.length !== 0 ?
                                        <>
                                            {
                                                species?.map((specie, index) => (
                                                    <p key={index} className="font-bold text-2xl max-[520px]:text-xl">{specie.name}</p>
                                                ))
                                            }
                                        </>
                                        :
                                        <p className="font-bold text-2xl max-[520px]:text-xl">Nenhum</p>
                                }
                            </div>
                        </div>

                        <div className="max-[520px]:w-3/4 lg:w-3/4 2xl:w-3/5 mx-auto columns-2 max-[520px]:flex max-[520px]:flex-col bg-indigo-50/10 rounded-md p-6 mt-3">
                            <div className="mt-2 max-[520px]:mb-2">
                                <p className="max-[520px]:text-sm max-[520px]:mb-4">Veículos:</p>
                                {
                                    vehicles.length !== 0 ?
                                        <>
                                            {
                                                vehicles?.map((vehicle, index) => (
                                                    <p key={index} className="font-bold text-2xl max-[520px]:text-xl">{vehicle.name}</p>
                                                ))
                                            }
                                        </>
                                        :
                                        <p className="font-bold text-2xl">Nenhum</p>
                                }
                            </div>
                            <div className="mt-2">
                                <p className="max-[520px]:text-sm max-[520px]:mb-4">Naves:</p>
                                {
                                    starChips.length !== 0 ?
                                        <>
                                            {
                                                starChips?.map((starChip, index) => (
                                                    <p key={index} className="font-bold text-2xl max-[520px]:text-xl">{starChip.name}</p>
                                                ))
                                            }
                                        </>
                                        :
                                        <p className="font-bold text-2xl">Nenhum</p>
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