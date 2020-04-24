import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Popover, Layout, Spinner} from '@ui-kitten/components';
import {SinglePost} from './SinglePost';
import {StyleSheet, FlatList, Text} from 'react-native';
import {NewsPost, CommonFunction} from '../../types/common';
import store from '../../store';

const useThunkDispatch = () => useDispatch<typeof store.dispatch>();

export const NewsList = ({
  navigation,
  params,
}: {
  navigation: any;
  params: {
    id?: string;
    newsSelector: CommonFunction;
    currentPageSelector: CommonFunction;
    currentEntitySelector?: CommonFunction;
    defaultHeader: string;
    setEntityId?: (id: string) => any;
    fetchEntity?: () => any;
    fetchNewsList: () => any;
    changePage: (newPage: number) => any;
  };
}) => {
  const newsList: NewsPost[] = useSelector(params.newsSelector);
  const dispatch = useThunkDispatch();
  const currentPage = useSelector(params.currentPageSelector);

  const currentEntity =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    params.currentEntitySelector && useSelector(params.currentEntitySelector);

  // navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentEntity?.name || params.defaultHeader,
    });
  }, [navigation, currentEntity, params.defaultHeader]);

  // state
  const [errorString, setErrorString] = useState('');
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // utility
  const dispatchWithErrorHandling = useCallback(
    async (action: any) => {
      setIsLoading(true);
      try {
        await dispatch(action);
      } catch (error) {
        setErrorString(error.message);
        setSnackbarVisibility(true);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  // effects
  useEffect(() => {
    async function initialize() {
      if (params.id && params.fetchEntity && params.setEntityId) {
        await dispatchWithErrorHandling(params.setEntityId(params.id));
        await dispatchWithErrorHandling(params.fetchEntity());
      }

      await dispatchWithErrorHandling(params.fetchNewsList());
    }

    initialize();
  }, [dispatchWithErrorHandling, params]);

  // handlers
  const handleLoadMore = () =>
    dispatchWithErrorHandling(params.changePage(currentPage + 1));

  const handleError = (message: string) => {
    setErrorString(message);
    setSnackbarVisibility(true);
  };

  const handleSnackbarDismiss = () => {
    setErrorString('');
    setSnackbarVisibility(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigation.push('Categories', {categoryId});
  };

  const handleSourceClick = (sourceId: string) => {
    navigation.push('Sources', {sourceId});
  };

  // Internal element
  const renderLoader = () => (
    <>
      {isLoading && (
        <Layout level="1" style={styles.loading}>
          <Spinner size="large" status="primary" />
        </Layout>
      )}
    </>
  );

  const renderList = () => (
    <Layout level="1" style={styles.container}>
      <FlatList
        style={styles.list}
        data={newsList}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={8}
        renderItem={({item: newsPost}: any) => (
          <Layout level="3" style={styles.singlePost}>
            {newsPost && (
              <SinglePost
                newsPost={newsPost}
                handleLinkError={handleError}
                navigateToCategoryScreen={handleCategoryClick}
                navigateToSourceScreen={handleSourceClick}
              />
            )}
          </Layout>
        )}
        ListFooterComponent={renderLoader}
      />
    </Layout>
  );

  return (
    <Popover
      // @ts-ignore
      visible={snackbarVisibility}
      anchor={renderList}
      placement="top"
      onBackdropPress={() => handleSnackbarDismiss()}
      onDismiss={handleSnackbarDismiss}>
      <Text>{errorString}</Text>
    </Popover>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingHorizontal: '5%',
  },
  singlePost: {
    marginTop: 25,
    width: '100%',
  },
  loading: {
    marginVertical: '20%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
