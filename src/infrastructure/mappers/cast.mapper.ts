import { CastMDb } from "../interfaces/movie-db-responses";

export class CastMapper {
    static fromMovieDbCastToModel(cast: CastMDb) {
        return {
            id: cast.id,
            name: cast.name,
            character: cast.character ?? 'No racracter',
            avatar: cast.profile_path 
            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
            : `https://i.stack.imgur.com/l60Hf.png`
        }
    }
}