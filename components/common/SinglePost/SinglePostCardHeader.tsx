import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageBackground, Text, StyleSheet} from 'react-native';
import {Spinner} from '@ui-kitten/components';

// component
export const SinglePostCardHeader = ({
  imageUrl,
  ...rest
}: {
  imageUrl: string;
  [key: string]: any;
}) => {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  const _handleLoading = () => setLoading(false);
  const _handleError = () => {
    setLoading(false);
    setErrored(true);
  };
  return (
    <>
      {imageUrl && (
        <TouchableOpacity style={styles.cardHeader} {...rest}>
          <ImageBackground
            source={{uri: imageUrl}}
            style={styles.cardImage}
            onLoad={_handleLoading}
            onError={_handleError}>
            {errored && <Text>Error Loading Image</Text>}
            {loading && <Spinner size="large" />}
          </ImageBackground>
        </TouchableOpacity>
      )}
    </>
  );
};

// styles
const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    height: 300,
  },
});
