import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResult } from "../../../infrastructure/interfaces/movie-db-responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../models/movie.model";

export const getMovieByIdUseCase = async (
    fetcher: HttpAdapter,
    movieId: number
): Promise<FullMovie> => {

    try {
        
        const movie = await fetcher.get<MovieResult>(`/${movieId}`);

        return  MovieMapper.fromMovieDbtoFullMovie(movie)


    } catch (error) {
        throw new Error('Can not get movie by id');
    }


};