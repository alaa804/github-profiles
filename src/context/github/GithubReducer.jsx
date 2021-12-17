const githubReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SEARCH_USERS":
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case "GET_REPOS":
      return {
        ...state,
        repos: payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };

    default:
      return state;
  }
};

export default githubReducer;
