import { Types } from "mongoose";
import { TShop, TUser } from "../users/users.interface";

export type Product = {
  name: string;
  shopId?: Types.ObjectId | TShop;
  userId?: Types.ObjectId | TUser;
  description: string;
  previousPrice: number;
  currentPrice: number;
  brand: string;
  deliveryCharge: number;
  productCode: string;
  designer: string;
  bagType: string;
  variantID: [Types.ObjectId];
  totalQuantity?: number;
  sellsQuantity: number;
  totalSalesAmount?: number;
  images?: string;
};
