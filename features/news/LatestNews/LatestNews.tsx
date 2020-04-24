import React from 'react';
import {
  selectLatestNews,
  selectCurrentPage,
  fetchLatestNews,
  changePage,
} from './latest-news-slice';
import {NewsList} from '../../../components/common/NewsList';

export const LatestNews = ({navigation}: {navigation: any}) => {
  return (
    <NewsList
      navigation={navigation}
      params={{
        newsSelector: selectLatestNews,
        currentPageSelector: selectCurrentPage,
        defaultHeader: 'Latest News',
        fetchNewsList: fetchLatestNews,
        changePage,
      }}
    />
  );
};
