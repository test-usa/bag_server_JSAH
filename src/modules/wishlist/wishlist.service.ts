import { WishListModel } from "../users/users.model"; // Correct import path for your model
import { ProductModel } from "../products/product.model"; // Correct import path for your model
import { Types } from "mongoose";

// Fetch wishlist by userID and populate the products
const getWishlist = async (userID: Types.ObjectId) => {
  const wishlist = await WishListModel.findOne({ userId: userID })
    .populate('wishList');

  if (!wishlist || wishlist.wishList.length < 1) {
    throw new Error("Wishlist not found or is empty");
  }

  return wishlist;
};

// Add product to the wishlist
const addProductToWishlist = async (userID: Types.ObjectId, productID: Types.ObjectId) => {
  // Check if the product exists
  const product = await ProductModel.findById(productID);
  if (!product) {
    throw new Error("Product not found");
  }

  let wishlist = await WishListModel.findOne({ userId: userID });

  if (!wishlist) {
    // If no wishlist exists, create a new one
    wishlist = new WishListModel({ userId: userID, wishList: [] });
  }

  // Check if the product is already in the wishlist
  const productExists = wishlist.wishList.some(
    (item: Types.ObjectId) => item.toString() === productID.toString()
  );

  if (productExists) {
    throw new Error("Product already in wishlist");
  }

  // Add the product ID to the wishlist
  wishlist.wishList.push(productID);
  await wishlist.save();

  return wishlist;
};

export const WishlistService = {
  addProductToWishlist,
  getWishlist,
};
