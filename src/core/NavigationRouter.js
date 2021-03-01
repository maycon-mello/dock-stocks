import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TrendingStocksScreen} from '../features/trending-stocks/TrendingStocksScreen';
import {FavoritesScreen} from '../features/favorites/FavoritesScreen';
import {StockDetailsScreen} from '../features/stock-details/StockDetailsScreen';

import {navigationRef} from './navigation';
import {Routes} from './routes';
import {withAppLayout} from '../components/AppLayout';

const getMainOptions = (opts) => {
  return {
    headerStyle: {
      backgroundColor: '#ebcc34',
    },
    headerTintColor: '#333',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: 'Back',
    ...opts,
  };
};

const AppStack = createStackNavigator();
const RootStack = createStackNavigator();

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={Routes.APP_TRENDING_STOCKS}
        component={withAppLayout(TrendingStocksScreen)}
        options={{
          ...getMainOptions({title: 'Dock Stocks'}),
        }}
      />
      <AppStack.Screen
        name={Routes.APP_FAVORITES}
        component={withAppLayout(FavoritesScreen)}
        options={getMainOptions({title: 'Favorites'})}
      />
      <AppStack.Screen
        name={Routes.APP_SEARCH_STOCK}
        component={withAppLayout(FavoritesScreen)}
        options={getMainOptions({title: 'Search Stock'})}
      />
      <AppStack.Screen
        name={Routes.APP_STOCK_DETAILS}
        component={withAppLayout(StockDetailsScreen)}
        options={getMainOptions({title: 'Stock Details'})}
      />
    </AppStack.Navigator>
  );
}

export function NavigationRouter() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="app"
          component={AppStackScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
