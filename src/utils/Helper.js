import { categories } from '../data';

export const getCartName = id =>
  (categories.find(c => c.CategoryId === id) || {}).Name || "";