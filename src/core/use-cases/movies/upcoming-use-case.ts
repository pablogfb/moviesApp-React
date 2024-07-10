import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { upcomingResponse } from "../../../infrastructure/interfaces/movie-db-responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../models/movie.model";

export const moviesUpcomingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {
        const upcoming = await fetcher.get<upcomingResponse>('/upcoming');

        return upcoming.results.map(result => MovieMapper.fromMovieDbResultToModel(result))

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies')
    }

}