import React, { useEffect, useState } from 'react';
import './Entertainment.css'
import {useNavigate, Link} from 'react-router-dom';
import navImage from '../images/image 20.png'

const api_key = '9f8aae453d22e05839e627fa2df8c2eb';

const genreIds = [
    { id: 'Action', genreId: 28 },
    { id: 'Drama', genreId: 18 },
    { id: 'Romance', genreId: 10749 },
    { id: 'Thriller', genreId: 53 },
    { id: 'Western', genreId: 37 },
    { id: 'Horror', genreId: 27 },
    { id: 'Fantasy', genreId: 14 },
    { id: 'Music', genreId: 10402 },
    { id: 'Fiction', genreId: 878 },
];

function Entertainment() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    const getImageUrl = (posterPath) => {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
    };

    const getGenreId = (category) => {
        const genre = genreIds.find((genre) => genre.id === category);
        return genre ? genre.genreId : null;
    };

    const fetchData = async (categories) => {
        try {
            const fetchedMovies = await Promise.all(categories.map(async (category) => {
                const genreId = getGenreId(category.title);
                if (genreId) {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&with_genres=${genreId}`);
                    const data = await response.json();
                    console.log(data);
                    return {
                        category: category.title,
                        movies: data.results.slice(0, 4).map((movie, index) => ({
                            id: index + 1,
                            moviePoster: getImageUrl(movie.poster_path),
                        })),
                    };
                } else {
                    return null;
                }
            }));
            setMovies(fetchedMovies.filter((movie) => movie !== null));
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        let fetchedUserCategories = JSON.parse(localStorage.getItem("ChoosedCategories"))

       if (!fetchedUserCategories) {
            navigate('/categories')
        }
        
        fetchData(fetchedUserCategories);
    }, [navigate]);

    return (
        <div className="mainContainer">
            <h1>Super App</h1>
            <div className="movieContainer">
                <h2>Entertainment according to you choice</h2>
                <div className='movieBox'>
                    {movies.length > 0 ? (
                        movies.map((categoryMovies) => (
                            <div key={categoryMovies.category}>
                                <h1>{categoryMovies.category}</h1>
                                <div className="cateData">
                                {categoryMovies.movies.map((movie) => (
                                    <div className='movieCard' key={movie.id}>
                                        <img src={movie.moviePoster} alt={`Movie Poster ${movie.id}`} />
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <Link to={'/'}>
            <img className='navIcon' src={navImage} alt="" />
            </Link>
        </div>
    );
}

export default Entertainment;