import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getMovieByIdUseCase, getMovieCastUseCase } from "../../core/use-cases";
import { movieDbFetcher } from "../../config/adapters/movieDB.adater";
import { FullMovie } from "../../core/models/movie.model";
import { Cast } from "../../core/models/cast.model";

export const useMovie = (movieId: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<FullMovie>();
    const [cast, setCast] = useState<Cast[]>();


    useEffect(() => {
        const loadMovie = async () => {
            setIsLoading(true);
            const fullMoviePromise = getMovieByIdUseCase(movieDbFetcher, movieId);
            const CastPromise = getMovieCastUseCase(movieDbFetcher, movieId);

            const [fullMovie, cast] = await Promise.all([fullMoviePromise, CastPromise])

            setMovie(fullMovie);
            setCast(cast);
            setIsLoading(false);
        }

        loadMovie();
    }, [movieId])


    return {
        isLoading,
        movie,
        cast
    }
}
