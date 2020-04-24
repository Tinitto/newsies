import { createSlice } from "@reduxjs/toolkit";
import { CommonFunction, NewsPost } from "../../../types/common";

export const NewsByCategorySlice = createSlice({
  name: "news-by-category",
  initialState: {
    list: [],
    page: 1,
    limit: 8, // the current page shows upto 8 posts per section
    total: 0,
    category: undefined,
    categoryId: undefined,
  },
  reducers: {
    resetList: (state) => {
      // @ts-ignore
      state.list = [];
    },
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
      state.total = Math.max(action.payload, 0);
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const {
  resetList,
  updateList,
  setLimit,
  setPage,
  setTotal,
  setCategory,
  setCategoryId,
} = NewsByCategorySlice.actions;

// Write a thunk to fetch the category asynchronously
export const fetchCategory = () => async (
  dispatch: CommonFunction,
  getState: CommonFunction,
  apiBaseUrl: string
) => {
  const { category = {}, categoryId } = getState().newsByCategory;

  if (categoryId && categoryId !== category.id) {
    const response = await fetch(`${apiBaseUrl}/categories/${categoryId}`);
    const newCategory = await response.json();
    // reset data
    await dispatch(resetList());
    await dispatch(setPage(1));
    await dispatch(setTotal(0));
    return dispatch(setCategory(newCategory));
  }

  return Promise.resolve();
};

export const fetchLatestNewsByCategory = () => async (
  dispatch: CommonFunction,
  getState: CommonFunction,
  apiBaseUrl: string
) => {
  const { limit, page, list, categoryId } = getState().newsByCategory;
  const offset = (page - 1) * limit;
  // list has few stories, fetch more
  if (list.slice(offset, offset + limit).length < limit) {
    const response = await fetch(
      `${apiBaseUrl}/news-posts?$limit=${limit}&$page=${page}&category_id=${categoryId}`
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
  return dispatch(fetchLatestNewsByCategory());
};

// Add selectors
export const selectPaginatedLatestNews = (state: any) => {
  const { limit, page, list } = state.newsByCategory;
  const offset = (page - 1) * limit;
  return list.slice(offset, offset + limit);
};

export const selectCurrentTotal = (state: any) => state.newsByCategory.total;

export const selectLatestNews = (state: any) => state.newsByCategory.list;

export const selectCurrentPage = (state: any) => state.newsByCategory.page;

export const selectCurrentLimit = (state: any) => state.newsByCategory.limit;

export const selectCurrentCategory = (state: any) =>
  state.newsByCategory.category;

export const selectCurrentCategoryId = (state: any) =>
  state.newsByCategory.categoryId;

export default NewsByCategorySlice.reducer;
