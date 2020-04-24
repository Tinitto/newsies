import React, {useCallback} from 'react';
import {Linking} from 'react-native';
import {Button} from '@ui-kitten/components';

type UrlLinkArgs = {
  url: string;
  children: any;
  handleError: (message: string) => any;
  [key: string]: any;
};

export const UrlLink = ({url, children, handleError, ...rest}: UrlLinkArgs) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      handleError(`Don't know how to open this URL: ${url}`);
    }
  }, [url, handleError]);

  return (
    <Button {...rest} onPress={handlePress}>
      {children}
    </Button>
  );
};
