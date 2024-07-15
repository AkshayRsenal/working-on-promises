import { useEffect, useState } from "react";

interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

interface ApiResponse {
	Search: Movie[];
	totalResults: string;
	Response: string;
	Error?: string;
}

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "9030182c";

async function fetchMovies(
	searchTerm: string,
	year: string
): Promise<ApiResponse> {
	const defaulturl = `http://www.omdbapi.com/?apikey=9030182c&s=space&y=2001`;
	const url = `${API_URL}?apikey=${API_KEY}&s=${searchTerm}&y=${year}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: ApiResponse = await response.json();

		if (data.Response === "False") {
			throw new Error(data.Error || "Unknown error occurred");
		}

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

async function read(): Promise<void> {
	try {
		const movies = await fetchMovies("space", "2001");
		console.log("movies:");
		console.log(movies);
	} catch (error) {
		console.error("Failed to fetch movies:", error);
	}
}

read()
	.then(() => {
		console.log("Read function completed successfully");
	})
	.catch((error) => {
		console.error("Error in read function:", error);
	});

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const getMovies = async () => {
		try {
			const data = await fetchMovies("space", "2001");
			setMovies(data.Search);
		} catch (error:any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

    useEffect(() => { getMovies();}, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Movies</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {movies.map(movie => (
                    <div key={movie.imdbID} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year}</p>
                        <img src={movie.Poster} alt={movie.Title} style={{ width: '100%' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
