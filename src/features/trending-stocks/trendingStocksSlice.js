import {createSlice} from '@reduxjs/toolkit';
import iex from '../../core/iex';

const initialState = {
  items: [],
  loading: false,
};

const trendingStocks = createSlice({
  name: 'mostActiveStocks',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const trendingStocksActions = trendingStocks.actions;

const getRoot = (state) => state.trendingStocks;

export const trendingStocksSelectors = {
  getLoading: (state) => getRoot(state).loading,
  getItems: (state) => getRoot(state).items,
};

export const trendingStocksOperations = {
  fetchItems: () => async (dispatch) => {
    const data = await iex.market().collection({
      param: 'list',
      collectionName: 'mostactive',
    });
    
    dispatch(trendingStocksActions.setItems(data));
  },
};

export const trendingStocksReducer = trendingStocks.reducer;
