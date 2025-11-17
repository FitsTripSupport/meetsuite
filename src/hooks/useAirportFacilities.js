import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function useAirportFacilities(code, enabled = true) {
    const [airport, setAirport] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!code || !enabled) return;

        let cancelled = false;

        async function fetchAirport() {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(`${API_BASE_URL}/airports/${code}`);
                if (!cancelled) {
                    setAirport(res.data);
                    setFacilities(res.data?.facilities || []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                    setAirport(null);
                    setFacilities([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchAirport();

        return () => {
            cancelled = true;
        };
    }, [code, enabled]);

    return { airport, facilities, loading, error };
}
