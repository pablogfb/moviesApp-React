import { useEffect, useState } from "react"
import { Movie } from "../../core/models/movie.model"

import * as UseCases from '../../core/use-cases/index'
import { movieDbFetcher } from "../../config/adapters/movieDB.adater";

let popularPage = 1;

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nowPlaying, setNowPlaying]= useState<Movie[]>([]);
    const [popular, setPopular]= useState<Movie[]>([]);
    const [topRated, setTopRated]= useState<Movie[]>([]);
    const [upcoming, setUpcoming]= useState<Movie[]>([]);

    useEffect(() => {
        initLoad();
    }, [])

    const initLoad = async () => {
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDbFetcher)
        const popularPromise = UseCases.moviesPopularUseCase(movieDbFetcher)
        const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDbFetcher)
        const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDbFetcher)
        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise]);

        setNowPlaying(nowPlayingMovies);
        setUpcoming(upcomingMovies);
        setTopRated(topRatedMovies);
        setPopular(popularMovies);

        setIsLoading(false);
    }

    return {
        isLoading, 
        nowPlaying, 
        topRated, 
        popular, 
        upcoming,
    
    
        popularNextPage: async () => {
            popularPage++;
            const newMovies = await UseCases.moviesPopularUseCase( movieDbFetcher, {page: popularPage} );
            setPopular( prev => [...prev, ...newMovies])
        }
    
    }
}