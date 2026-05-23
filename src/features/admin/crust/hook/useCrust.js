import { useEffect, useState } from "react";
import crustService from "../services/crustService";

export default function useCrust() {
  const [loading, setLoading] = useState(false);
  const [crust, setCrust] = useState([]);
  const [error, setError] = useState(null);

  const fetchCrust = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await crustService.getAll();
      setCrust(res.data);
    } catch (err) {
      setError(err);
      setCrust([]);
    } finally {
      setLoading(false);
    }
  };
  const createCrust = async (data) => {
    return await crustService.create(data);
  };
  const updateCrust = async (id, data) => {
    return await crustService.update(id, data);
  };
  const deleteCrust = async (id) => {
    return await crustService.delete(id);
  };

  useEffect(() => {
    fetchCrust();
  }, []);
  return {
    crust,
    loading,
    error,
    fetchCrust,
    createCrust,
    updateCrust,
    deleteCrust,
  };
}
