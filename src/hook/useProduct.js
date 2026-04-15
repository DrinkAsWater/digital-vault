import { useState, useEffect } from "react";
import {
  getProducts,
  getCategories,
  getProductById,
} from "../utils/ApiFunction";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories([{ id: null, name: "全部" }, ...data]))
      .catch((err) => setError(err.message));
  }, []);

  return { categories, error };
};

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProducts(params)
      .then((data) => {
        if (!cancelled) {
          setProducts(data.data);
          setTotal(data.total);
          setTotalPages(data.totalPages);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [
    params.categoryId,
    params.keyword,
    params.minPrice,
    params.maxPrice,
    params.sortBy,
    params.sortOrder,
    params.page,
  ]);

  return { products, total, totalPages, loading, error };
};

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getProductById(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
};
