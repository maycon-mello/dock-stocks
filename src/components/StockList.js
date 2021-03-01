import React from 'react';
import {View, Text} from 'react-native';
import {List, ListItem} from 'native-base';
import styled from 'styled-components/native';
import {navigate} from '../core/navigation';
import {Routes} from '../core/routes';
import {formatCurrency} from '../core/format-utils';

const StockPrice = styled(Text)`
  font-size: 16px;
`;

const StockChange = styled(Text)`
  color: ${(props) => (props.change > 0 ? 'green' : 'red')};
  padding-left: 8px;
`;

export function StockList({ items = [] }) {
  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.symbol}
          onPress={() =>
            navigate(Routes.APP_STOCK_DETAILS, {symbol: item.symbol})
          }>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>{item.symbol}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StockPrice>{formatCurrency(item.close || item.iexClose)}</StockPrice>
              <StockChange change={item.change}>
                {(item.changePercent * 100).toFixed(2)}% (
                {formatCurrency(item.change)})
              </StockChange>
            </View>
          </View>
        </ListItem>
      ))}
    </List>
  );
}
