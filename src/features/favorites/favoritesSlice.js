import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  items: [],
};

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.listLoading = action.payload;
    },
    setItems(state, action) {
      state.list = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      const symbol = action.payload;
      state.items = state.items.filter(item => item.symbol !== symbol);
    },
    
  }
});

export const favoritesActions = favorites.actions;

const getRoot = state => state.favorites;

export const favoritesSelectors = {
  getLoading: state => getRoot(state).loading,
  getItems: state => getRoot(state).items,
};


export const favoritesOperations = {
  fetchFavoritesData: () => async (dispatch, getState) => {
    const state = getState();
    const items = favoritesSelectors.getItems(state);
    console.log('fetch data for favorites: ', items);
  },
}

export const favoritesReducer = favorites.reducer;
