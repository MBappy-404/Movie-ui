export interface Genre {
  id: string;
  genreName: string;
  createdAt: string;
  updatedAt: string;
}

export  interface Platform {
  id: string;
  platformName: string;
  platformLogo: string;
  createdAt: string;
  updatedAt: string;
}



export interface GenreFilter {
  name: string;
  active: boolean;
}

export interface Movie {
  id: string;
  title: string;
  releaseYear: string;
  duration: string;
  thumbnail: string;
  price: number;
  director: string;
  averageRating?: number;
  producer: string;
  actor: string;
  actress: string;
  spoilerWarning: string;
  synopsis: string;
  isAvailable: boolean;
  platformId: string;
  genreId: string;
  createdAt: string;
  updatedAt: string;
  genre: Genre;
  platform: Platform;
}