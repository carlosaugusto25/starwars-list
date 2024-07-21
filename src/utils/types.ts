export interface PersonProps {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[],
    created: string;
    edited: string;
    url: string;
}

export interface PeopleProps {
    count: number;
    next: string;
    previous: string;
    results: PersonProps[]
}

export interface StarChipsProps {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[];
    films: string[],
    created: string;
    edited: string;
    url: string;
}
export interface StarChipsRequestProps {
    count: number;
    next: string;
    previous: string;
    results: StarChipsProps[];
}

export interface FilmProps {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export interface FilmRequestProps {
    count: number;
    next: string;
    previous: string;
    results: FilmProps[];
}

export interface SpeciesProps {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string;
    language: string;
    people: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface SpeciesResquestProps {
    count: number;
    next: string;
    previous: string;
    results: SpeciesProps[];
}

export interface PlanetsProps {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface PlanetsRequestProps {
    count: number;
    next: string;
    previous: string;
    results: PlanetsProps[];
}

export interface VehiclesProps {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export interface VehiclesRequestProps {
    count: string;
    next: string;
    previous: string;
    results: VehiclesProps[];
}