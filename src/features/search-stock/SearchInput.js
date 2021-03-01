import React, {useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Input, InputGroup, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import throttle from 'lodash.throttle';
import {
  searchStockActions,
  searchStockOperations,
  searchStockSelectors,
} from './searchStockSlice';

import Autocomplete from 'react-native-autocomplete-input';
import {navigate} from '../../core/navigation';
import {Routes} from '../../core/routes';

export function SearchInput() {
  const dispatch = useDispatch();
  const serachTerm = useSelector(searchStockSelectors.getSearchTerm);
  const searchResults = useSelector(searchStockSelectors.getItems);
  const handleSarch = () => {
    dispatch(searchStockActions.clear());
    navigate(Routes.APP_STOCK_DETAILS, {symbol: serachTerm.toLowerCase()});
  };
  const doFetchSuggestions = useMemo(
    () =>
      throttle(() => {
        dispatch(searchStockOperations.fetchSuggestions());
      }, 500),
    [searchStockOperations.fetchSuggestions],
  );

  const handleChange = (text) => {
    dispatch(searchStockActions.setSearchTerm(text));
    doFetchSuggestions();
  };

  return (
    <View>
      <Autocomplete
        data={searchResults}
        renderItem={({item, i}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(searchStockActions.clear());
              navigate(Routes.APP_STOCK_DETAILS, {symbol: item.symbol});
            }}>
            <View style={{padding: 10}}>
              <Text>{item.symbol}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderTextInput={() => (
          <InputGroup>
            <Icon name="search" color="#333" />
            <Input
              placeholder="Search stock"
              onChangeText={handleChange}
              value={serachTerm}
              onSubmitEditing={handleSarch}
            />
          </InputGroup>
        )}
      />
    </View>
  );
}
