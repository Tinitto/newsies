import {Layout, useTheme} from '@ui-kitten/components';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// commponent
export const SinglePostCardFooter = ({
  primaryButtonText,
  secondaryButtonText,
  onPressPrimaryButton,
  onPressSecondaryButton,
  ...rest
}: {
  primaryButtonText: string;
  secondaryButtonText: string;
  onPressPrimaryButton: (args?: any) => any;
  onPressSecondaryButton: (args?: any) => any;
  [key: string]: any;
}) => {
  const theme = useTheme();
  return (
    <Layout {...rest}>
      <Text style={styles.footerTitle}>More from...</Text>
      <TouchableOpacity onPress={onPressPrimaryButton}>
        <Text
          // @ts-ignore
          style={{...styles.footerText, color: theme['color-primary-default']}}>
          {primaryButtonText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSecondaryButton}>
        <Text
          // @ts-ignore
          style={{...styles.footerText, color: theme['color-primary-default']}}>
          {secondaryButtonText}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

// styles
const styles = StyleSheet.create({
  footerTitle: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 5,
  },
  footerText: {
    paddingTop: 2,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
