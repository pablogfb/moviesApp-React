import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { topRatedResponse } from "../../../infrastructure/interfaces/movie-db-responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../models/movie.model";

export const moviesTopRatedUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {
        const topRated = await fetcher.get<topRatedResponse>('/top_rated');

        return topRated.results.map(result => MovieMapper.fromMovieDbResultToModel(result))

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies')
    }

}