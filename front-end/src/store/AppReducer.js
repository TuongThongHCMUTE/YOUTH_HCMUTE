const appReducer = (state, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, user: action.payload };
    case "UPDATE_CURRENT_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "ACTIVE_FACULTIES":
      return { ...state, faculties: action.payload };
    case "ACTIVE_CLASSES":
      return { ...state, classes: action.payload };
    case "ACTIVE_YEARS":
      return { ...state, years: action.payload };
    default:
      return state;
  }
};

export default appReducer;
