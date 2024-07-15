import { resolve } from "path";
import React, { useEffect, useState } from "react";
import { isReturnStatement } from "typescript";

interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

// ###Analysing Promises 

function Loader() {
	// fetch("http://www.omdbapi.com/?apikey=9030182c&s=space&y=2001")
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		//   console.log(data);
	// 	})
	// 	.catch((error) => console.error("Error:", error));


	// let getAllMedia = () => {
	// 	fetch("http://www.omdbapi.com/?apikey=9030182c&s=space&y=2001")
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			// console.log("data.Search");
	// 			// console.log(data.Search);
	// 		});
	// };

	console.log("Before Promise");
	const delayedPromise = (ms: number) =>
		new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log("Before Resolve statement")
				resolve("resolve after the delay");
				console.log("Resolved after the delay")
			}, ms);
		});

	async function readAllData() {
		try {
			let fetchTestResponse = await fetch(
				"http://www.omdbapi.com/?apikey=9030182c&s=space&y=2001"
			);
			if (!fetchTestResponse.ok) {
				throw new Error("HTTP error! status: ${response.satus}");
			}
			let allMoviesinJSON = await fetchTestResponse.json();
			await delayedPromise(3000);
			if (allMoviesinJSON.Response == "False") {
				throw new Error(allMoviesinJSON.Error || "Unknown error occurred");
			}
			return allMoviesinJSON;
		} catch (error) {
			console.log("Error fetching data:", error);
			throw error;
		}
	}

	// fetch all data Implementation 1
	// getAllMedia();
	// fetch all data Implementation 2
	// let dataToBeWritten = readAllData();


	const [moviesJSON, setMovies] = useState<Movie[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const getMovies = async () => {
		try {
			const data = await readAllData();
			setMovies(data.Search);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	// console.log(moviesJSON);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{moviesJSON && <div>
				<p>I am a search result</p>
				{moviesJSON.map((movie) => (
					<div
						key={movie.imdbID}
						style={{
							margin: "10px",
							border: "1px solid #ccc",
							padding: "10px",
							width: "200px",
						}}
					>
						<h3>{movie.Title}</h3>
						<p>{movie.Year}</p>
						<p> {movie.Poster} </p>
					</div>
				))}
			</div>}
			{error && <div><p> There was an Error:</p>  </div>}
			{/* {loading && <p>This is Loading...</p>} */}


			{loading && <div className="spinning-loader"></div>}

		</div>
	);
}
export default Loader;
