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
    isAvailable: boolean
    platform: Platform
    genre: Genre
    createdAt: string
    updatedAt: string
  }
  