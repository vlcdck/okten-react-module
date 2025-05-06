export interface IUser {
    id: number;
    include_adult: boolean;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    username: string;
    avatar: IAvatar;
}

interface IAvatar {
    gravatar: {
        hash: string;
    }
    tmdb: {
        avatar_path: string;
    }
}