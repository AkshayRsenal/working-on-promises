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

	async function readAllData() {
		try {
			let fetchTestResponse = await fetch(
				"http://www.omdbapi.com/?apikey=9030182c&s=space&y=2001"
			);

			if (!fetchTestResponse.ok) {
				throw new Error("HTTP error! status: ${response.satus}");
			}

			
			let tester = await fetchTestResponse.json();

			console.log("Before Promise");
			const promise1 = (ms: number) =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						console.log("Before Resolve statement")
						resolve("foo");
						console.log("Resolved Foo")
					}, ms);
				});

			await promise1(6000);

			if (tester.Response == "False") {
				throw new Error(tester.Error || "Unknown error occurred");
			}

			// console.log("tester.Search");
			// console.log(tester.Search[0]);

			return tester;
		} catch (error) {
			console.log("Error fetching data:", error);
			throw error;
		}
	}

	// fetch all data Implementation 1
	getAllMedia();
	// fetch all data Implementation 2
	// let dataToBeWritten = readAllData();

	
	// async function tester() {
	// 	let dataToWrite = await readAllData();
	// 	console.log("dataToWrite Promise");
	// 	console.log(dataToWrite);
	// }
	// tester();



	// readAllData().then(() => {
	//     console.log()
	// })

	const [movies, setMovies] = useState<Movie[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getMovies = async () => {
			try {
				const data = await readAllData();
				setMovies(data.Search);
			} catch (error: any) {
				setError(error.message);
			}
		};

		getMovies();
	}, []);

	// console.log(movies);

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<p>I am a search result</p>

			<div>
				{movies.map((movie) => (
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
			</div>

			<button>Skip to other(s)</button>
		</div>
	);
}
export default Loader;
