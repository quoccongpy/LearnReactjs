import { useEffect, useState } from "react";
import sizeService from "../services/sizeService";

export default function useSize() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState([]);

  const fetchSize = async () => {
    try {
      setLoading(true);
      const res = await sizeService.getAll();
      setSize(res.data);
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
    fetchSize,
    createSize,
    updateSize,
    deleteSize,
  };
}
