import React from 'react';
import {
  TopNavigationAction,
  TopNavigation,
  Divider,
  Icon,
} from '@ui-kitten/components';
import {ThemeContext} from '../../state/theme.context';
import {StyleSheet, Text} from 'react-native';

// types
type TopbarArgs = {
  navigation: any;
  shouldRenderBackAction?: any;
  title?: string;
};

// icons
const LightIcon = (props: any) => <Icon {...props} name="sun" />;
const DarkIcon = (props: any) => <Icon {...props} name="moon" />;
const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

// component
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
    <>
      {themeContext.theme === 'dark' ? (
        <TopNavigationAction
          icon={LightIcon}
          onPress={themeContext.toggleTheme}
        />
      ) : (
        <TopNavigationAction
          icon={DarkIcon}
          onPress={themeContext.toggleTheme}
        />
      )}
    </>
  );

  return (
    <>
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
      <Divider />
    </>
  );
};

// styles
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
