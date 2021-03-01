import React from 'react';
import {Provider} from 'react-redux';
import {StyleProvider} from 'native-base';
import store from './core/redux-store';
import {NavigationRouter} from './core/NavigationRouter';
import getTheme from 'native-base/src/theme/components';
import material from './theme/variables/material';

const App = () => {
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(material)}>
        <NavigationRouter />
      </StyleProvider>
    </Provider>
  );
};

export default App;
