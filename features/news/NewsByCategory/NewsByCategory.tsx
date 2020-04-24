import React from 'react';
import {
  selectLatestNews,
  selectCurrentPage,
  fetchCategory,
  fetchLatestNewsByCategory,
  selectCurrentCategory,
  setCategoryId,
  changePage,
} from './news-by-category-slice';
import {NewsList} from '../../../components/common/NewsList';

export const NewsByCategory = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {categoryId} = route.params;

  return (
    <NewsList
      navigation={navigation}
      params={{
        id: categoryId,
        setEntityId: setCategoryId,
        currentEntitySelector: selectCurrentCategory,
        fetchEntity: fetchCategory,
        newsSelector: selectLatestNews,
        currentPageSelector: selectCurrentPage,
        defaultHeader: 'News by Category',
        fetchNewsList: fetchLatestNewsByCategory,
        changePage,
      }}
    />
  );
};
