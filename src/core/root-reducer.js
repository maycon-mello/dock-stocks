import { combineReducers } from '@reduxjs/toolkit'
import { searchStockReducer } from '../features/search-stock/searchStockSlice';
import { stockDetailsReducer } from '../features/stock-details/stockDetailsSlice';
import { trendingStocksReducer } from '../features/trending-stocks/trendingStocksSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';

export const rootReducer = combineReducers({
  searchStock: searchStockReducer,
  stockDetails: stockDetailsReducer,
  trendingStocks: trendingStocksReducer,
  favorites: favoritesReducer,
});