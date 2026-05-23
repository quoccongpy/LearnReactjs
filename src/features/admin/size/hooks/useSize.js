import { useEffect, useState } from "react";
import sizeService from "../services/sizeService";

export default function useSize() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState([]);
  const [error, setError] = useState(null);

  const fetchSize = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await sizeService.getAll();
      setSize(res.data);
    } catch (err) {
      setError(err);
      setSize([]);
    } finally {
      setLoading(false);
    }
  };
  const createSize = async (data) => {
    return await sizeService.create(data);
  };
  const updateSize = async (id, data) => {
    return await sizeService.update(id, data);
  };
  const deleteSize = async (id) => {
    return await sizeService.delete(id);
  };

  useEffect(() => {
    fetchSize();
  }, []);
  return {
    size,
    loading,
    error,
    fetchSize,
    createSize,
    updateSize,
    deleteSize,
  };
}
