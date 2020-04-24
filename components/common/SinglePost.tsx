import React from 'react';
import {NewsPost} from '../../types/common';
import moment from 'moment';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {Card, Text, Layout} from '@ui-kitten/components';
import {UrlLink} from './UrlLink';
import {Chip} from './Chip';

const CardFooter = ({
  handleLinkError,
  url,
}: {
  handleLinkError: (message: string) => any;
  url: string;
}) => (
  <UrlLink handleError={handleLinkError} url={url} appearance="outline">
    Read More
  </UrlLink>
);

const CardHeader = ({imageUrl}: {imageUrl: string}) => (
  <View style={styles.cardHeader}>
    <ImageBackground
      source={{uri: imageUrl}}
      // height={150}
      style={styles.cardImage}
    />
  </View>
);

export const SinglePost = ({
  newsPost,
  navigateToCategoryScreen,
  navigateToSourceScreen,
  handleLinkError,
}: {
  newsPost: NewsPost;
  navigateToCategoryScreen: (categoryId: string) => any;
  navigateToSourceScreen: (sourceId: string) => any;
  handleLinkError: (message: string) => any;
}) => (
  <Card
    header={() => <CardHeader imageUrl={newsPost.url_to_image} />}
    footer={() => (
      <CardFooter handleLinkError={handleLinkError} url={newsPost.url} />
    )}>
    <Layout style={styles.detailsBar}>
      <Chip
        appearance="filled"
        icon="bookmark-outline"
        onPress={() => navigateToCategoryScreen(newsPost.category.id)}>
        {newsPost.category.name}
      </Chip>
      <Chip
        appearance="outline"
        onPress={() => navigateToSourceScreen(newsPost.source.id)}>
        {newsPost.source.name}
      </Chip>
      <Chip icon="calendar-outline" disabled={true} appearance="outline">
        {moment(newsPost.published_at).format('MMMM D, YYYY')}
      </Chip>
    </Layout>
    <Text style={styles.title}>{newsPost.title}</Text>
    <Text style={styles.paragraph}>{newsPost.description}</Text>
  </Card>
);

const styles = StyleSheet.create({
  detailsBar: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardHeader: {
    width: '100%',
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  paragraph: {
    fontSize: 12,
    opacity: 0.5,
  },
});
