import { useEffect, useState } from "react";
import crustService from "../services/crustService";

export default function useCrust() {
  const [loading, setLoading] = useState(false);
  const [crust, setCrust] = useState([]);

  const fetchCrust = async () => {
    try {
      setLoading(true);
      const res = await crustService.getAll();
      setCrust(res.data);
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
    fetchCrust,
    createCrust,
    updateCrust,
    deleteCrust,
  };
}
