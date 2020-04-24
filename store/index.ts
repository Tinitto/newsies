import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import latestNewsReducer from "../features/news/LatestNews/latest-news-slice";
import newsByCategoryReducer from "../features/news/NewsByCategory/news-by-category-slice";
import newsBySourceReducer from "../features/news/NewsBySource/news-by-source-slice";

const apiBaseUrl = "https://sop-news-rest-api.herokuapp.com/api";

const store = configureStore({
  reducer: {
    latestNews: latestNewsReducer,
    newsByCategory: newsByCategoryReducer,
    newsBySource: newsBySourceReducer,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: { extraArgument: apiBaseUrl } }),
  ],
});

export default store;
