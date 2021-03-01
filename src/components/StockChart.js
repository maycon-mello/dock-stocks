import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View} from 'react-native';

export function StockChart(props) {

  return (
    <View>
      <LineChart
        data={{
          datasets: [
            {
              data: props.data
                .map((data) => parseFloat(data.close))
                .filter((value) => !isNaN(value)),
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.98} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#333`,
          labelColor: (opacity = 1) => `#333`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: '#333',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 3,
        }}
      />
    </View>
  );
}
