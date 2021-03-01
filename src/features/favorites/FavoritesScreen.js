import React from 'react';
import {View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { StockList } from '../../components/StockList';
import { favoritesSelectors } from './favoritesSlice';

export function FavoritesScreen({navigation}) {
  const items = useSelector(favoritesSelectors.getItems);

  return (
    <View>
      <StockList items={items} />
    </View>
  );
}
