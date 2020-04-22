

const initialState = {
    productsAvailable: [],
    prodCategory: [],
    showLogin: false,
    userLoggedIn: false,
    userName: null
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
                userName: action.userName
            }
        case "loggedOut":
            return {
                ...state,
                userLoggedIn: false,
                userName: null
            }
        default:
            return state
    }

}

export default reducer;