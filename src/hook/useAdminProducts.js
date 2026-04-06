import { useCallback, useEffect, useState } from "react"
import { adminCreateProduct, adminGetAllProducts, adminUnpublishProduct, adminUpdateProduct } from "../utils/ApiFuction"
import { useUI } from "../context/UIContext"


export const useAdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useUI()

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminGetAllProducts()
      setProducts(data)
    } catch (err) {
      setError(err.response?.data?.message || '取得商品失敗')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const createProduct = async (data, onSuccess) => {
    try {
      await adminCreateProduct(data)
      showToast('✅', '商品已新增')
      fetchProducts()
      onSuccess?.()
    } catch (err) {
      showToast('❌', err.response?.data?.message || '新增失敗')
    }
  }

  const updateProduct = async (id, data, onSuccess) => {
    try {
      await adminUpdateProduct(id, data)
      showToast('✅', '商品已更新')
      fetchProducts()
      onSuccess?.()
    } catch (err) {
      showToast('❌', err.response?.data?.message || '更新失敗')
    }
  }

  const unpublishProduct = async (id) => {
    try {
      await adminUnpublishProduct(id)
      showToast('✅', '商品已下架')
      fetchProducts()
    } catch (err) {
      showToast('❌', err.response?.data?.message || '下架失敗')
    }
  }

  return { products, loading, error, createProduct, updateProduct, unpublishProduct, refetch: fetchProducts }
}