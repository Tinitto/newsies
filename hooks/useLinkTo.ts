import {useCallback} from 'react';
import {Linking} from 'react-native';

/**
 * Generates a callback for opening an external url link
 * @param url - the url to link to
 * @param handleError - an error handler that deals with failed opening of a link
 */
export const useLinkTo = (url: string, handleError: (error: string) => any) =>
  useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      handleError(`Don't know how to open this URL: ${url}`);
    }
  }, [url, handleError]);
