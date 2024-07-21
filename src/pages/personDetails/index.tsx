import { useParams } from "react-router-dom"
import { Nav } from "../../components/Nav"
import { Header } from "../../components/Header"
import { useCallback, useEffect, useState } from "react"
import { FilmProps, PersonProps, PlanetsProps, SpeciesProps, StarChipsProps, VehiclesProps } from "../../utils/types"
import { api } from "../../services/apis"
import axios from "axios"

export function PersonDetails() {
    const { id } = useParams()

    const [personDetails, setPersonDetails] = useState<PersonProps>({} as PersonProps)

    const [species, setSpecies] = useState<SpeciesProps[]>([])

    const [planet, setPlanet] = useState<PlanetsProps>({} as PlanetsProps)

    const [vehicles, setVehicles] = useState<VehiclesProps[]>([])

    const [films, setFilms] = useState<FilmProps[]>([]);

    const [starChips, setStarChips] = useState<StarChipsProps[]>([]);

    const detailsPerson = useCallback(() => {
        api.get(`/people/${id}`).then(res => {
            setPersonDetails(res.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => { })
    }, [id])

    useEffect(() => {
        detailsPerson()
    }, [detailsPerson])

    useEffect(() => {
        const fetchPlanet = async () => {
            if (personDetails?.homeworld) {
                const response = await axios.get<PlanetsProps>(personDetails.homeworld)
                setPlanet(response.data)
                return response.data
            }
        }
        fetchPlanet()
    }, [personDetails])

    useEffect(() => {
        const fetchFilms = async () => {
            if (personDetails?.films) {
                const promises = personDetails?.films?.map(async (film) => {
                    const response = await axios.get<FilmProps>(film)
                    return response.data
                })

                const results = await Promise.all(promises)
                setFilms(results)
            }
        }
        fetchFilms()

        const fetchSpecies = async () => {
            if (personDetails?.species) {
                const promises = personDetails?.species?.map(async (specie) => {
                    const response = await axios.get<SpeciesProps>(specie)
                    return response.data
                })

                const results = await Promise.all(promises)
                setSpecies(results)
            }
        }
        fetchSpecies()

        const fetchVehicles = async () => {
            if (personDetails?.vehicles) {
                const promises = personDetails?.vehicles?.map(async (vehicle) => {
                    const response = await axios.get<VehiclesProps>(vehicle)
                    return response.data
                })

                const results = await Promise.all(promises)
                setVehicles(results)
            }
        }
        fetchVehicles()

        const fetchStarships = async () => {
            if (personDetails?.starships) {
                const promises = personDetails?.starships?.map(async (starchip) => {
                    const response = await axios.get<StarChipsProps>(starchip)
                    return response.data
                })

                const results = await Promise.all(promises)
                setStarChips(results)
            }
        }
        fetchStarships()
    },[personDetails])

    return (
        <>
            <Nav />
            <Header />
            <section className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold uppercase my-8">DETALHES DO PERSONAGEM</h2>
                <div className="w-3/5 mx-auto flex flex-row items-center justify-between bg-indigo-50/10 rounded-md p-6">
                    <div>
                        <p className="text-xl font-bold">Nome:</p>
                        <p className="font-bold text-5xl">{personDetails?.name}</p>
                    </div>
                </div>
                <div className="w-3/5 mx-auto columns-2 bg-indigo-50/10 rounded-md p-6 my-6">

                    <div>
                        <div>
                            <p>Altura:</p>
                            <p className="font-bold text-2xl">{personDetails.height}</p>
                        </div>
                        <div className="my-4">
                            <p>Massa:</p>
                            <p className="font-bold text-2xl">{personDetails.mass}</p>
                        </div>
                        <div className="my-4">
                            <p>Cor da pele:</p>
                            <p className="font-bold text-2xl">{personDetails.skin_color}</p>
                        </div>
                        <div className="mt-2">
                            <p>Cor do cabelo:</p>
                            <p className="font-bold text-2xl">{personDetails.hair_color}</p>
                        </div>
                    </div>

                    <div>
                        <div className="my-4">
                            <p>Cor dos olhos:</p>
                            <p className="font-bold text-2xl">{personDetails.eye_color}</p>
                        </div>
                        <div className="my-4">
                            <p>Gênero:</p>
                            <p className="font-bold text-2xl">{personDetails.gender}</p>
                        </div>
                        <div className="my-4">
                            <p>Ano de nascimento:</p>
                            <p className="font-bold text-2xl">{personDetails.birth_year}</p>
                        </div>
                        <div className="mt-2">
                            <p>Planeta natal:</p>
                            <p className="font-bold text-2xl">{planet.name}</p>
                        </div>

                    </div>
                </div>

                <div className="w-3/5 mx-auto columns-2 bg-indigo-50/10 rounded-md p-6 my-3">
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
                    <div className="mt-2">
                        <p>Espécies:</p>
                        {
                            species.length !== 0 ?
                                <>
                                    {
                                        species?.map((specie, index) => (
                                            <p key={index} className="font-bold text-2xl">{specie.name}</p>
                                        ))
                                    }
                                </>
                                :
                                <p className="font-bold text-2xl">Nenhum</p>
                        }
                    </div>
                </div>

                <div className="w-3/5 mx-auto columns-2 bg-indigo-50/10 rounded-md p-6 my-3">
                    <div className="mt-2">
                        <p>Veículos:</p>
                        {
                            vehicles.length !== 0 ?
                                <>
                                    {
                                        vehicles?.map((vehicle, index) => (
                                            <p key={index} className="font-bold text-2xl">{vehicle.name}</p>
                                        ))
                                    }
                                </>
                                :
                                <p className="font-bold text-2xl">Nenhum</p>
                        }
                    </div>
                    <div className="mt-2">
                        <p>Naves:</p>
                        {
                            starChips.length !== 0 ?
                                <>
                                    {
                                        starChips?.map((starChip, index) => (
                                            <p key={index} className="font-bold text-2xl">{starChip.name}</p>
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