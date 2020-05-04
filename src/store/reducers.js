

const initialState = {
    productsAvailable: [],
    prodCategory: [],
    showLogin: false,
    userLoggedIn: false,
    user: null,
    showProductModal: false,
    showSideBar: false,
    showProductDetails: false,
    history: false
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
                user: { ...action.user }
            }
        case "loggedOut":
            return {
                ...state,
                userLoggedIn: false,
                user: null
            }

        case "toggleProdModal":
            return {
                ...state,
                showProductModal: !state.showProductModal
            }
        case "toggleSideBar":
            return {
                ...state,
                showSideBar: !state.showSideBar
            }
        case "showProductDetailsModal":
            return {
                ...state,
                showProductDetails: true
            }
        case "hideProductDetailsModal":
            return {
                ...state,
                showProductDetails: false
            }
        case "showingHistory":
            return {
                ...state,
                history: true
            }
        case "hidingHistory":
            return {
                ...state,
                history: false
            }
        default:
            return state
    }

}

export default reducer;