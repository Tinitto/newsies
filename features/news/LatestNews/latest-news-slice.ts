import { createSlice } from "@reduxjs/toolkit";
import { CommonFunction, NewsPost } from "../../../types/common";

export const LatestNewsSlice = createSlice({
  name: "latest-news",
  initialState: {
    list: [],
    page: 1,
    limit: 8, // the current page shows upto 8 posts per section
    total: 0,
  },
  reducers: {
    updateList: (state, action) => {
      // @ts-ignore
      state.list = state.list.concat(action.payload);
    },
    setPage: (state, action) => {
      state.page = Math.max(action.payload, 1);
    },
    setLimit: (state, action) => {
      state.limit = Math.max(action.payload, 1);
    },
    setTotal: (state, action) => {
      state.total = Math.max(action.payload, 1);
    },
  },
});

export const {
  updateList,
  setLimit,
  setPage,
  setTotal,
} = LatestNewsSlice.actions;

// Write a thunk to fetch data asynchronously
export const fetchLatestNews = () => async (
  dispatch: CommonFunction,
  getState: CommonFunction,
  apiBaseUrl: string
) => {
  const { limit, page, list } = getState().latestNews;
  const offset = (page - 1) * limit;
  // list has few stories, fetch more
  if (list.slice(offset, offset + limit).length < limit) {
    const response = await fetch(
      `${apiBaseUrl}/news-posts?$limit=${limit}&$page=${page}`,
      {}
    );
    const {
      total,
      data,
    }: { total: number; data: NewsPost[] } = await response.json();

    dispatch(setTotal(total));
    return dispatch(updateList(data));
  }
  return Promise.resolve();
};

export const changePage = (newPage: number) => async (
  dispatch: CommonFunction
) => {
  await dispatch(setPage(newPage));
  return dispatch(fetchLatestNews());
};

// Add selectors
export const selectPaginatedLatestNews = (state: any) => {
  const { limit, page, list } = state.latestNews;
  const offset = (page - 1) * limit;
  return list.slice(offset, offset + limit);
};

export const selectCurrentTotal = (state: any) => state.latestNews.total;

export const selectLatestNews = (state: any) => state.latestNews.list;

export const selectCurrentPage = (state: any) => state.latestNews.page;

export const selectCurrentLimit = (state: any) => state.latestNews.limit;

export default LatestNewsSlice.reducer;
