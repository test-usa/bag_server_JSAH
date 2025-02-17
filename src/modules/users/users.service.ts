import mongoose from "mongoose";
import { TUser } from "./users.interface";
import UserModel, { CartModel, OrderListModel, ShopModel, WishListModel } from "./users.model";
import idConverter from "../../util/idConvirter";
import { paymentMathod } from "../../constent";
import { generateOrderObjects } from "../../util/orderObjConstructer";
import {paymentService} from "../../services/PaymentServices";



const createUser = async (userData: TUser) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start transaction

    try {
        // Step 1: Create the new user inside the transaction
        const newUser = new UserModel(userData);
        const savedUser = await newUser.save({ session });

        // Step 2: Create related collections
        const newCart = new CartModel({ userId: savedUser._id });
        const savedCart = await newCart.save({ session });

        const newWishList = new WishListModel({ userId: savedUser._id, wishList: [] });
        const savedWishList = await newWishList.save({ session });

        const newOrderList = new OrderListModel({ userId: savedUser._id, orderList: [] });
        const savedOrderList = await newOrderList.save({ session });

        // Step 3: Update user with the newly created collection IDs
        const updatedUser = await UserModel.findByIdAndUpdate(
            savedUser._id,
            {
                cartId: savedCart._id,
                wishListId: savedWishList._id,
                orderListId: savedOrderList._id
            },
            { new: true, session }
        );

        // Step 4: Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return { user: updatedUser, cart: savedCart, wishList: savedWishList, orderList: savedOrderList };
    } catch (error: any) {
        // Rollback on error
        await session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed: ${error.message}`);
    }
};

const createAshop = async (userId: any, payload: any) => {

    const shopPayload = { ...payload, userId: userId };
    const result = await ShopModel.create(shopPayload);

    return result;
};

const makeAnorder = async (userId: string, orderListId: string, cartId: string, payload: any) => {

    const fullName = payload.fisrtName+" "+payload.lastName ;

    const cvonvertedUserId = idConverter(userId)
    const cart = await CartModel.findOne({ userId: cvonvertedUserId })
    if (!cart) {
        throw Error("cart not founbd")
    }
    const cartData = cart.cart
    console.log(cvonvertedUserId)
    console.log(cartData)
    if (!cartData) {
        throw Error("no item in the cart")
    }

    //  console.log("caretData =====",cartData)


    const { paymentMethod } = payload;

    const orderArray = generateOrderObjects(cartData, payload)
    console.log("order array", orderArray)

    if (paymentMethod === paymentMathod.On_Arivel) {

    }
    else if (paymentMethod === paymentMathod.SSL) {

        const paymentIntent = await paymentService.pay(cart.subTotal, payload.paymentMethodId,fullName,payload.email,payload.phone,payload.address)

        return paymentIntent 
    
    } else {
        throw Error("no such payment mathod avail Able")
    }


}



const userServices = {
    createUser, createAshop, makeAnorder
}

export default userServices