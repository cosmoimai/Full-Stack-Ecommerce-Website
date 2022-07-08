import {ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../constants/cartConstants"

export const cartReducer = (
    state = {cartItems: [],shippngInfo: {}}, action
    ) => {
    switch(action.type)
    {
        case ADD_TO_CART:
            console.log("currently")
            console.log(state.cartItems)
            const item = action.payload;
            // console.log(state.cartItems)
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            console.log("isItemExist-> ",isItemExist, " item -> ", item)

            if(isItemExist)
            {
                console.log("exist and adding")
                console.log(state.cartItems)
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => 
                        i.product === isItemExist.product ? item: i
                    )
                }
            }
            else
            {
                console.log("not exist and adding")

                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((i)=> i.product !== action.payload),
            } 
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippngInfo: action.payload,
            }
        default:
            return state;
    }
}