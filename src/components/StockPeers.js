import React from 'react';
import {View, Text} from 'react-native';
import {List, ListItem} from 'native-base';
import styled from 'styled-components/native';
import {navigate} from '../core/navigation';
import {Routes} from '../core/routes';

export function StockPeers({items = []}) {
  return (
    <List>
      {items.map((symbol) => (
        <ListItem
          key={symbol}
          onPress={() => navigate(Routes.APP_STOCK_DETAILS, {symbol: symbol})}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>{symbol}</Text>
            </View>
          </View>
        </ListItem>
      ))}
    </List>
  );
}
