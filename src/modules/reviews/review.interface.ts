import { Types } from "mongoose";

export interface IReview {
  userId: Types.ObjectId; 
  productId: Types.ObjectId; 
  rating: number; 
  comment: string;
  createdAt: Date; 
  updatedAt: Date; 
}