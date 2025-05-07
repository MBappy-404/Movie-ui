import { IContent } from "./content"

export interface IDiscount {
    id: string
    contentId: string
    percentage: number
    startDate: string
    endDate: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    content: IContent
  }