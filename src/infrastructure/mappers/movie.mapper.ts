import { FullMovie, Movie } from "../../core/models/movie.model";
import type { MovieResult, Result } from "../interfaces/movie-db-responses";


export class MovieMapper {
    static fromMovieDbResultToModel( result: Result): Movie {
        return {
            id: result.id,
            title: result.title,
            description: result.overview,
            releaseDate: new Date( result.release_date),
            rating: result.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
        }
    }

    static fromMovieDbtoFullMovie(movieResult:MovieResult): FullMovie {
        return {
            id: movieResult.id,
            title: movieResult.title,
            description: movieResult.overview,
            releaseDate: new Date( movieResult.release_date),
            rating: movieResult.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${movieResult.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${movieResult.backdrop_path}`,
            genres: movieResult.genres.map((genre) => genre.name),
            productionCompanies: movieResult.production_companies.map((company) => company.name),
            duration: movieResult.runtime,
            budget: movieResult.budget,
            originalTitle: movieResult.original_title
        }
    }
}