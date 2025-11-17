import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function useAirportTabs() {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchAirports() {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(`${API_BASE_URL}/airports/distinct-airports`);
                if (!cancelled) {
                    setAirports(res.data || []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchAirports();

        return () => {
            cancelled = true;
        };
    }, []);

    return { airports, loading, error };
}
