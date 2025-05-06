export interface TMovie {
    id: string
    title: string
    releaseYear: string
    duration: string
    thumbnail: string
    price: number
    rentprice: number
    director: string
    contentBanner: string
    producer: string
    actor: string
    actress: string
    spoilerWarning: any
    synopsis: string
    isAvailable: boolean
    platformId: string
    genreId: string
    createdAt: string
    updatedAt: string
    genre: Genre
    platform: Platform
    ContentLinks: ContentLinks
    reviews: Review[]
    averageRating: number
    totalReviews: number
  }
  
  export interface Genre {
    id: string
    genreName: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Platform {
    id: string
    platformName: string
    platformLogo: string
    createdAt: string
    updatedAt: string
  }
  
  export interface ContentLinks {
    id: string
    contentId: string
    contentLink: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Review {
    rating: number
  }
  