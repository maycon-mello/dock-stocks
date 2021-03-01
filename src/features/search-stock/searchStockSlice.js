import { createSlice } from '@reduxjs/toolkit'
import { navigate } from '../../core/navigation';
import { Routes } from '../../core/routes';
import iex from '../../core/iex';
import debounce from 'lodash.debounce';

const initialState = {
  items: [],
  loading: false,
  searchTerm: null,
};

const searchStock = createSlice({
  name: 'searchStock',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    clear(state, action) {
      state.items = [];
      state.searchTerm = '';
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  }
});

export const searchStockActions = searchStock.actions;

const getRoot = state => state.searchStock;

export const searchStockSelectors = {
  getLoading: state => getRoot(state).loading,
  getItems: state => getRoot(state).items,
  getSearchTerm: state => getRoot(state).searchTerm,
};

export const searchStockOperations = {
  fetchSuggestions: () => async (dispatch, getState) => {
    const state = getState();
    const searchTerm = searchStockSelectors.getSearchTerm(state);
    const result = await iex.search(searchTerm);
    
    dispatch(searchStockActions.setItems(result));
  },
}

export const searchStockReducer = searchStock.reducer;
