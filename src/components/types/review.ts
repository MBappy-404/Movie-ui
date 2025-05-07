export interface Review {
  id: string;
  userId: string;
  contentId: string;
  reviewText: string;
  rating: number;
  spoiler: boolean;
  status: ReviewStatus;
  tags: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  content: {
    title: string;
  };
}


export type ReviewStatus = 'PUBLISHED' | 'PENDING';
