import React from 'react';
import {NewsPost} from '../../../types/common';
import {StyleSheet} from 'react-native';
import {Card, Text} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SinglePostCardHeader} from './SinglePostCardHeader';
import {SinglePostCardFooter} from './SinglePostCardFooter';
import {useLinkTo} from 'hooks/useLinkTo';
import {limitTextTo} from 'utils/text_utils';

// the component
export const SinglePost = ({
  newsPost,
  navigateToCategoryScreen,
  navigateToSourceScreen,
  handleLinkError,
  passageCharacterLimit = 150,
  titleCharacterLimit = 65,
}: {
  newsPost: NewsPost;
  navigateToCategoryScreen: (categoryId: string) => any;
  navigateToSourceScreen: (sourceId: string) => any;
  handleLinkError: (message: string) => any;
  passageCharacterLimit?: number;
  titleCharacterLimit?: number;
}) => {
  const linkToPost = useLinkTo(newsPost.url, handleLinkError);
  return (
    <Card
      header={() => (
        <SinglePostCardHeader
          imageUrl={newsPost.url_to_image}
          onPress={linkToPost}
        />
      )}>
      <TouchableOpacity style={styles.titleWrapper} onPress={linkToPost}>
        <Text style={styles.title}>
          {limitTextTo(newsPost.title, titleCharacterLimit)}
        </Text>
      </TouchableOpacity>
      <Text style={styles.author}>{limitTextTo(newsPost.author, 30)}</Text>
      <Text style={styles.date}>
        {newsPost.published_at}
        {/* {moment(newsPost.published_at).format('MMMM D, YYYY')} */}
      </Text>
      <Text style={styles.paragraph}>
        {limitTextTo(newsPost.description, passageCharacterLimit)}
      </Text>
      <Text style={[styles.paragraph, styles.footerTitle]}>More from...</Text>
      <SinglePostCardFooter
        style={[styles.paragraph, styles.detailsBar]}
        primaryButtonText={`Source: ${newsPost.source.name}`}
        secondaryButtonText={`Category: ${newsPost.category.name}`}
        onPressPrimaryButton={() => navigateToSourceScreen(newsPost.source.id)}
        onPressSecondaryButton={() =>
          navigateToCategoryScreen(newsPost.category.id)
        }
      />
    </Card>
  );
};

// styles
const styles = StyleSheet.create({
  detailsBar: {
    flex: 1,
    marginHorizontal: -15,
  },
  titleWrapper: {
    marginHorizontal: -15,
  },
  title: {
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
    opacity: 0.4,
    fontWeight: 'bold',
    marginHorizontal: -15,
  },
  date: {
    fontSize: 10,
    opacity: 0.4,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: -15,
  },
  paragraph: {
    fontSize: 12,
    opacity: 0.5,
    marginHorizontal: -15,
  },
  footerTitle: {
    marginTop: 15,
    marginBottom: 5,
  },
});
