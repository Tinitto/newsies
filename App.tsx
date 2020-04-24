import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import store from './store';
import {Provider as StoreProvider} from 'react-redux';
import {AppNavigator} from './components/common/Navigation';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
// @ts-ignore
import {default as appTheme} from './theme.json';
import {ThemeContext} from './state/theme.context';
import {SafeAreaView, StyleSheet} from 'react-native';

export default () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <StoreProvider store={store}>
          <ApplicationProvider
            {...eva}
            // @ts-ignore
            theme={{...eva[theme], ...appTheme}}>
            <SafeAreaView style={styles.safeArea}>
              <AppNavigator />
            </SafeAreaView>
          </ApplicationProvider>
        </StoreProvider>
      </ThemeContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
