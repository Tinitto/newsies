import React from 'react';
import {
  TopNavigationAction,
  TopNavigation,
  Toggle,
} from '@ui-kitten/components';
import {ThemeContext} from '../../state/theme.context';
import {BackIcon} from '../icons/BackIcon';
import {StyleSheet, Text} from 'react-native';

type TopbarArgs = {
  navigation: any;
  shouldRenderBackAction?: any;
  title?: string;
};

export const Topbar = ({
  navigation,
  shouldRenderBackAction = false,
  title = '',
}: TopbarArgs) => {
  const themeContext = React.useContext(ThemeContext);
  const _renderBackAction = () => (
    <>
      {shouldRenderBackAction ? (
        <TopNavigationAction
          icon={BackIcon}
          onPress={() => navigation.goBack()}
        />
      ) : null}
    </>
  );

  const _renderThemeToggler = () => (
    <Toggle
      style={styles.toggle}
      status="primary"
      checked={themeContext.theme === 'dark'}
      onChange={themeContext.toggleTheme}
    />
  );

  return (
    <TopNavigation
      title={(evaProps: any) => (
        <Text {...evaProps} style={{...evaProps.style, ...styles.title}}>
          {title}
        </Text>
      )}
      alignment="center"
      accessoryLeft={_renderBackAction}
      accessoryRight={_renderThemeToggler}
    />
  );
};

const styles = StyleSheet.create({
  toggle: {
    height: 10,
  },
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 20,
  },
  toggleIcon: {},
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
