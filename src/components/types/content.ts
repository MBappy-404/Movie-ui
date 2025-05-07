import { Genre, Platform } from "@/types"

export interface IContent {
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
    spoilerWarning: string
    synopsis: string
    ContentLinks: IContentLinks | any
    isAvailable: boolean | string
    platform: Platform
    genre: Genre
    createdAt: string
    updatedAt: string
  }
  
  export interface IContentLinks {
    id: string
    contentId: string
    contentLink: string
    createdAt: string
    updatedAt: string
  }