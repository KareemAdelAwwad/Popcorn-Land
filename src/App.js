import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=5ab0bc30';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spider Man');
    }, []);
    return (
        <div className="app">
            <h1>
                Popcorn Land
            </h1>
            <div className="search">

                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={
                        (e) => {
                            if (e.key === 'Enter') {
                                searchMovies(searchTerm);
                            }
                        }}
                />

                <img
                    src={SearchIcon}
                    alt="search Icon"
                    onClick={() => searchMovies(searchTerm)}

                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                            />
                        ))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}


        </div>
    );
}

export default App;