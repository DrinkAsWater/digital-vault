import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "https://localhost:7124/api";

// 取得所有分類列表
export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/category`);
  return res.data;
};

// 取得所有商品，可傳入 categoryId 篩選分類（Guid 或 "all"）
export const getProducts = async (categoryId = "all") => {
  // 如果 categoryId 是 "all"，就不加 query 參數
  const url =
    categoryId && categoryId !== "all"
      ? `${BASE_URL}/product?categoryId=${categoryId}`
      : `${BASE_URL}/product`;

  const res = await axios.get(url);

  return res.data.map((p, index) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image:
     p.thumbnailUrl || `https://picsum.photos/300/300?random=${p.id || index}`,
  }));
};

// 取得單一商品詳情，傳入商品 Guid
export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/product/${id}`);
  return res.data;
};
