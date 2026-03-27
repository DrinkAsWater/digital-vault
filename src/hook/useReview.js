// hook/useReview.js
import { useState, useEffect, useCallback } from "react";
import {
    getReviewsByProduct,
    getMyReviews,
    createReview,
    updateReview,
    deleteReview,
} from "../utils/ApiFuction";
import { clearAuth, getUser } from "../utils/tokenHelper";

const currentUser = getUser();


export const useProductReviews = (productId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getReviewsByProduct(productId);
            setReviews(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, loading, error, refetch: fetchReviews };
};

export const useMyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyReviews = async () => {
            try {
                setLoading(true);
                const data = await getMyReviews();
                setReviews(data);
            } catch {
                setError("載入失敗");
            } finally {
                setLoading(false);
            }
        };
        fetchMyReviews();
    }, []);

    return { reviews, loading, error };
};

export const useReviewActions = (refetch) => {
    const [submitting, setSubmitting] = useState(false);
    const [actionError, setActionError] = useState(null);

    const handleCreate = async (productId, orderId, rating, comment) => {
        setSubmitting(true);
        setActionError(null);
        try {
            await createReview(productId, orderId, rating, comment);
            await refetch();
            return true; // 修正：成功時補上 return true
        } catch (err) {
            setActionError(err.response?.data?.message ?? "新增評論失敗");
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (id, rating, comment) => {
        setSubmitting(true);
        setActionError(null);
        try {
            await updateReview(id, rating, comment);
            await refetch();
            return true; // 修正：成功時補上 return true
        } catch (err) {
            setActionError(err.response?.data?.message ?? "修改評論失敗");
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        setSubmitting(true);
        setActionError(null);
        try {
            await deleteReview(id);
            await refetch();
            return true; // 修正：成功時補上 return true
        } catch (err) {
            setActionError(err.response?.data?.message ?? "刪除評論失敗");
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return { submitting, actionError, handleCreate, handleUpdate, handleDelete };
};