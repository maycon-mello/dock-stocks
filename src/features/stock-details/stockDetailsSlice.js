import {createSlice} from '@reduxjs/toolkit';
import iex from '../../core/iex';
import {
  favoritesActions,
  favoritesSelectors,
} from '../favorites/favoritesSlice';

const initialState = {
  data: {},
  chartData: [],
  peers: [],
  loading: false,
  chartLoading: false,
};

const stockDetails = createSlice({
  name: 'stockDetails',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setFavorite(state, action) {
      state.favorite = action.payload;
    },
    setChartLoading(state, action) {
      state.chartLoading = action.payload;
    },
    setChartData(state, action) {
      state.chartData = action.payload;
    },
    setPeers(state, action) {
      state.peers = action.payload;
    },
  },
});

export const stockDetailsActions = stockDetails.actions;

const getRoot = (state) => state.stockDetails;

export const stockDetailsSelectors = {
  getLoading: (state) => getRoot(state).loading,
  getData: (state) => getRoot(state).data,
  getFavorite: (state) => getRoot(state).favorite,
  getChartLoading: (state) => getRoot(state).chartLoading,
  getChartData: (state) => getRoot(state).chartData,
  getPeers: (state) => getRoot(state).peers,
};

export const stockDetailsOperations = {
  loadPeers: (symbol) => async (dispatch, getState) => {
    let peers = await iex.symbol(symbol).peers();

    // TODO: handle errors properly
    if (!Array.isArray(peers)) {
      peers = [];
    }

    dispatch(stockDetailsActions.setPeers(peers));
  },
  loadChart: (symbol) => async (dispatch, getState) => {
    let chartData = await iex
      .symbol(symbol)
      .chart('1m', {chartCloseOnly: true});

    // TODO: handle errors properly
    if (!Array.isArray(chartData)) {
      chartData = [];
    }

    dispatch(stockDetailsActions.setChartData(chartData));
    dispatch(stockDetailsActions.setChartLoading(false));
  },
  loadDetails: (symbol) => async (dispatch, getState) => {
    const quote = await iex.symbol(symbol).quote();

    if (quote instanceof Error) {
      dispatch(stockDetailsActions.setData(null));
      dispatch(stockDetailsActions.setLoading(false));
      return;
    }
    
    dispatch(stockDetailsActions.setData(quote));

    const state = getState();
    const isFavorite = favoritesSelectors
      .getItems(state)
      .find((item) => item.symbol === symbol);

    dispatch(stockDetailsActions.setFavorite(isFavorite));
    dispatch(stockDetailsActions.setLoading(false));
  },
  load: (symbol) => async (dispatch) => {
    dispatch(stockDetailsActions.setChartLoading(true));
    dispatch(stockDetailsActions.setLoading(true));

    await dispatch(stockDetailsOperations.loadDetails(symbol));
    await dispatch(stockDetailsOperations.loadChart(symbol));
    await dispatch(stockDetailsOperations.loadPeers(symbol));
  },
  setFavorite: () => (dispatch, getState) => {
    const state = getState();
    const isFavorite = stockDetailsSelectors.getFavorite(state);
    const details = stockDetailsSelectors.getData(state);

    dispatch(stockDetailsActions.setFavorite(!isFavorite));

    if (isFavorite) {
      dispatch(favoritesActions.removeItem(details.symbol));
    } else {
      dispatch(favoritesActions.addItem(details));
    }
  },
};

export const stockDetailsReducer = stockDetails.reducer;
