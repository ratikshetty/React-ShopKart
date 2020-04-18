

const initialState = {
    productsAvailable: [],
    prodCategory: []
};

function reducer(state = initialState, action) {

    switch(action.type){
        case "fetchProducts":
            return{
                ...state,
                productsAvailable: [...action.data]
            }
        case "fetchCategory":
            return{
                ...state,
                prodCategory: [...action.data]
            }
        default:
            return state
    }

}

export default reducer;