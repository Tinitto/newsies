import React from 'react';
import {
  selectLatestNews,
  selectCurrentPage,
  fetchSource,
  fetchLatestNewsBySource,
  selectCurrentSource,
  setSourceId,
  changePage,
} from './news-by-source-slice';
import {NewsList} from '../../../components/common/NewsList';

export const NewsBySource = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {sourceId} = route.params;

  return (
    <NewsList
      navigation={navigation}
      params={{
        id: sourceId,
        setEntityId: setSourceId,
        currentEntitySelector: selectCurrentSource,
        fetchEntity: fetchSource,
        newsSelector: selectLatestNews,
        currentPageSelector: selectCurrentPage,
        defaultHeader: 'News by Source',
        fetchNewsList: fetchLatestNewsBySource,
        changePage,
      }}
    />
  );
};
