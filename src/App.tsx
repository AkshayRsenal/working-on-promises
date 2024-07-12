import React from "react";
import logo from "./logo.svg";

import Loader from "./components/Loader";
import Movies from "./components/Movie";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<p>TEMPLATES HEADER</p>
			</header>
			<div>
				<div><Loader /></div>
				<main>
					<Movies />
				</main>
			</div>
		</div>
	);
}

export default App;
