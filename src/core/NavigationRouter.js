import React from 'react';
import {Button, View, Text, TouchableWithoutFeedback} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {TrendingStocksScreen} from '../features/trending-stocks/TrendingStocksScreen';
import {FavoritesScreen} from '../features/favorites/FavoritesScreen';
import {SearchStockScreen} from '../features/search-stock/SearchStockScreen';
import {StockDetailsScreen} from '../features/stock-details/StockDetailsScreen';

import {navigationRef, navigate} from './navigation';
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
    // headerRight: () => (
    //   <React.Fragment>
    //     <View style={{flexDirection: 'row', paddingRight: 10}}>
    //       <TouchableWithoutFeedback onPress={() => navigate('modal/account')}>
    //         <Icon size={30} name="account" color="#333" />
    //       </TouchableWithoutFeedback>
    //     </View>
    //   </React.Fragment>
    // ),
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
          // headerLeft: () => (
          //   <View style={{paddingLeft: 10}}>
          //     <Text style={{fontWeight: 'bold', fontSize: 20}}>Rurável</Text>
          //   </View>
          // ),
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
      {/* 
      <AppStack.Screen
        name="app/news"
        component={NewsScreen}
        options={getMainOptions({title: 'Notícias'})}
      />
      <AppStack.Screen
        name="app/stocks"
        component={StocksScreen}
        options={getMainOptions({title: 'Cotações'})}
      />
      <AppStack.Screen
        name={Routes.APP_AREAS}
        component={AreasScreen}
        options={getMainOptions({title: 'Terras'})}
      />
      <AppStack.Screen
        name={Routes.APP_AREAS_ADD}
        component={AreasAddScreen}
        options={getMainOptions({title: 'Adicionar terra'})}
      />
      <AppStack.Screen
        name={Routes.APP_AREAS_EDIT}
        component={AreasEditScreen}
        options={getMainOptions({title: 'Editar terra'})}
      />
      <AppStack.Screen
        name="app/wallet"
        component={WalletScreen}
        options={getMainOptions({title: 'Carteira'})}
      />
      <AppStack.Screen
        name="app/disease-detector"
        component={DeseaseDetectorScreen}
        options={getMainOptions({title: 'Detector de Pragas'})}
      /> */}
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
