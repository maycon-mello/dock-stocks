import React, {useEffect} from 'react';
import {View, Text } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  stockDetailsOperations,
  stockDetailsSelectors,
} from './stockDetailsSlice';
import styled from 'styled-components/native';
import {Button, Col, Grid, Icon, Row, Spinner} from 'native-base';
import {formatCurrency} from '../../core/format-utils';
import {Colors} from '../../theme/colors';
import {StockChart} from '../../components/StockChart';
import { StockPeers } from '../../components/StockPeers';

const DeatilsBox = styled(View)`
  align-items: center;
`;

const StockSymbol = styled(Text)`
  font-weight: bold;
  font-size: 22px;
`;

const StockTitle = styled(Text)`
  font-weight: normal;
  font-size: 20px;
`;

const StockPrice = styled(Text)`
  font-size: 16px;
`;

const StockChange = styled(Text)`
  color: ${(props) => (props.change > 0 ? 'green' : 'red')};
  padding-left: 8px;
`;

export function StockDetailsScreen({navigation, route}) {
  const symbol = route.params.symbol;
  const dispatch = useDispatch();
  const isLoading = useSelector(stockDetailsSelectors.getLoading);
  const isFavorite = useSelector(stockDetailsSelectors.getFavorite);
  const stockData = useSelector(stockDetailsSelectors.getData);
  const isChartLoading = useSelector(stockDetailsSelectors.getChartLoading);
  const chartData = useSelector(stockDetailsSelectors.getChartData);
  const peers = useSelector(stockDetailsSelectors.getPeers);
  const handleFavorite = () => dispatch(stockDetailsOperations.setFavorite());

  useEffect(() => {
    dispatch(stockDetailsOperations.load(symbol));
  }, [symbol]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}>
        <Spinner color="black" />
      </View>
    );
  }
  
  if (stockData === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}>
        <Text>Stock not found</Text>
      </View>
    )
  }

  return (
    <View>
      <Button
        style={{
          backgroundColor: isFavorite ? Colors.yellow : '#ccc',
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
        }}
        onPress={handleFavorite}>
        <Icon name="ios-star" />
      </Button>
      <Grid>
        <Row style={{marginTop: 22}}>
          <Col style={{alignItems: 'center'}}>
            <StockSymbol>{stockData.symbol}</StockSymbol>
          </Col>
        </Row>
        <Row style={{marginTop: 8}}>
          <Col style={{alignItems: 'center'}}>
            <StockTitle>{stockData.companyName}</StockTitle>
          </Col>
        </Row>
        <Row style={{marginTop: 8}}>
          <Col
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <StockPrice>{formatCurrency(stockData.close)}</StockPrice>
            <StockChange change={stockData.change}>
              {(stockData.changePercent * 100).toFixed(2)}% (
              {formatCurrency(stockData.change)})
            </StockChange>
          </Col>
        </Row>
        <Row>
          <Col style={{marginTop: 22}}>
            {isChartLoading && chartData && chartData.length ? (
              <Spinner color="black" />
            ) : (
              <StockChart data={chartData} />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Text style={{ paddingLeft: 18, fontWeight: 'bold' }}>Peers</Text>
            <StockPeers items={peers} />
          </Col>
        </Row>
      </Grid>
    </View>
  );
}
