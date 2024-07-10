import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { popularResponse } from "../../../infrastructure/interfaces/movie-db-responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../models/movie.model";

interface Options {
    page?: number;
    limit?: number;

}

export const moviesPopularUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {

    try {
        const popular = await fetcher.get<popularResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        });

        return popular.results.map(result => MovieMapper.fromMovieDbResultToModel(result))

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies')
    }

}