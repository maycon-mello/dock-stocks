import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  trendingStocksOperations,
  trendingStocksSelectors,
} from './trendingStocksSlice';
import {StockList} from '../../components/StockList';

export function TrendingStocksScreen({navigation}) {
  const dispatch = useDispatch();
  const items = useSelector(trendingStocksSelectors.getItems);
  const isLoading = useSelector(trendingStocksSelectors.getLoading);

  useEffect(() => {
    dispatch(trendingStocksOperations.fetchItems());
  }, []);

  return (
    <View>
      {isLoading ? <Spinner color="black" /> : null}
      {items ? <StockList items={items} /> : null}
    </View>
  );
}
