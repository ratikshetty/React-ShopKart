

const initialState = {
    productsAvailable: [],
    prodCategory: [],
    showLogin: false,
    userLoggedIn: false,
    user: null
};

function reducer(state = initialState, action) {

    switch (action.type) {
        case "fetchProducts":
            return {
                ...state,
                productsAvailable: [...action.data]
            }
        case "fetchCategory":
            return {
                ...state,
                prodCategory: [...action.data]
            }

        case "toggleLogin":
            return {
                ...state,
                showLogin: !state.showLogin
            }

        case "loggedIn":
            return {
                ...state,
                userLoggedIn: true,
                user: {...action.user}
            }
        case "loggedOut":
            return {
                ...state,
                userLoggedIn: false,
                user: null
            }
        default:
            return state
    }

}

export default reducer;