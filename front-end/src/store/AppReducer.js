const appReducer = (state, action) => {
    switch(action.type) {
        case "CURRENT_USER":
            return { ...state, user: action.payload }
        case "UPDATE_CURRENT_USER":
            return {
                ...state,
                user: {...state.user, ...action.payload}
            };
        default:
            return state;
    }
}

export default appReducer;