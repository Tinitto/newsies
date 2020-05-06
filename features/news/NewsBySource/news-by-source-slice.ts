import {createSlice} from '@reduxjs/toolkit';
import {CommonFunction, NewsPost} from '../../../types/common';

export const NewsBySourceSlice = createSlice({
  name: 'news-by-source',
  initialState: {
    list: [],
    page: 1,
    limit: 8, // the current page shows upto 8 posts per section
    total: 0,
    source: undefined,
    sourceId: undefined,
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
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setSourceId: (state, action) => {
      state.sourceId = action.payload;
    },
  },
});

export const {
  resetList,
  updateList,
  setLimit,
  setPage,
  setTotal,
  setSource,
  setSourceId,
} = NewsBySourceSlice.actions;

// Write a thunk to fetch the source asynchronously
export const fetchSource = () => async (
  dispatch: CommonFunction,
  getState: CommonFunction,
  apiBaseUrl: string,
) => {
  const {source = {}, sourceId} = getState().newsBySource;
  if (sourceId && sourceId !== source.id) {
    const response = await fetch(`${apiBaseUrl}/sources/${sourceId}`);
    const newSource = await response.json();
    // reset data
    await dispatch(resetList());
    await dispatch(setPage(1));
    await dispatch(setTotal(0));
    return dispatch(setSource(newSource));
  }

  return Promise.resolve();
};

export const fetchLatestNewsBySource = () => async (
  dispatch: CommonFunction,
  getState: CommonFunction,
  apiBaseUrl: string,
) => {
  const {limit, page, list, sourceId} = getState().newsBySource;
  const offset = (page - 1) * limit;
  // list has few stories, fetch more
  if (list.slice(offset, offset + limit).length < limit) {
    const response = await fetch(
      `${apiBaseUrl}/news-posts?$limit=${limit}&$page=${page}&source_id=${sourceId}`,
    );
    const {
      total,
      data,
    }: {total: number; data: NewsPost[]} = await response.json();

    dispatch(setTotal(total));
    return dispatch(updateList(data));
  }
  return Promise.resolve();
};

export const changePage = (newPage: number) => async (
  dispatch: CommonFunction,
) => {
  await dispatch(setPage(newPage));
  return dispatch(fetchLatestNewsBySource());
};

// Add selectors
export const selectPaginatedLatestNews = (state: any) => {
  const {limit, page, list} = state.newsBySource;
  const offset = (page - 1) * limit;
  return list.slice(offset, offset + limit);
};

export const selectCurrentTotal = (state: any) => state.newsBySource.total;

export const selectLatestNews = (state: any) => state.newsBySource.list;

export const selectCurrentPage = (state: any) => state.newsBySource.page;

export const selectCurrentLimit = (state: any) => state.newsBySource.limit;

export const selectCurrentSource = (state: any) => state.newsBySource.source;

export const selectCurrentSOurceId = (state: any) =>
  state.newsBySource.sourceId;

export default NewsBySourceSlice.reducer;
