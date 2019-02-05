import {PRODUCT_LOADED} from "../constans";

const productReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_LOADED: {

            return {
                ...state,
                categories: action.payload.data
            };
        }

        default:
            return state
    }
};

export default productReducer;