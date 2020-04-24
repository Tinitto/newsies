import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LatestNews} from '../../features/news/LatestNews/LatestNews';
import {NewsByCategory} from '../../features/news/NewsByCategory/NewsByCategory';
import {NewsBySource} from '../../features/news/NewsBySource/NewsBySource';
import {Topbar} from './Topbar';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={{
      header: ({navigation, scene, previous}) => (
        <Topbar
          title={scene.descriptor.options.title}
          shouldRenderBackAction={previous}
          navigation={navigation}
        />
      ),
    }}>
    <Screen name="Home" component={LatestNews} />
    <Screen name="Categories" component={NewsByCategory} />
    <Screen name="Sources" component={NewsBySource} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
