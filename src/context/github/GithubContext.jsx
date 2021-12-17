import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //   GET initial users (for testing)
  //   const fetchUsers = async () => {
  //     setLoading();
  //     const config = {
  //       headers: {
  //         Authorization: `token ${GITHUB_TOKEN}`,
  //       },
  //     };
  //     const { data } = await axios.get(`${GITHUB_URL}/users`, config);

  //     dispatch({
  //       type: "GET_USERS",
  //       payload: data,
  //     });
  //   };

  // search users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const config = {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    };
    const response = await axios.get(
      `${GITHUB_URL}/search/users?${params}`,
      config
    );

    dispatch({
      type: "SEARCH_USERS",
      payload: response.data.items,
    });
  };

  // get single user
  const getUser = async (login) => {
    setLoading();

    const config = {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    };

    const { data } = await axios.get(`${GITHUB_URL}/users/${login}`, config);

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  // get user Repos
  const getRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const config = {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    };

    const { data } = await axios.get(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      config
    );

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //   Clear users from state
  const clearUsers = () =>
    dispatch({
      type: "CLEAR_USERS",
    });

  // set loading
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
