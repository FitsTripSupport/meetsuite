// src/hooks/useMeetSuiteLocations.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!API_BASE_URL) {
            console.error('VITE_BACKEND_URL is not defined');
            setError('Backend URL not configured');
            return;
        }

        const fetchCountries = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${API_BASE_URL}/packages/countries`);
                // assuming backend returns an array of strings
                setCountries(res.data || []);
            } catch (err) {
                console.error('Error fetching countries:', err);
                const msg =
                    err.response?.data?.message ||
                    err.message ||
                    'Error fetching countries';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return { countries, loading, error };
};

export const useAirports = (country) => {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!country) {
            setAirports([]);
            return;
        }
        if (!API_BASE_URL) {
            console.error('VITE_BACKEND_URL is not defined');
            setError('Backend URL not configured');
            return;
        }

        const fetchAirports = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${API_BASE_URL}/packages/airport-codes`, {
                    params: { country },
                });
                // assuming backend returns an array of airport codes (strings)
                setAirports(res.data || []);
            } catch (err) {
                console.error('Error fetching airports:', err);
                const msg =
                    err.response?.data?.message ||
                    err.message ||
                    'Error fetching airports';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchAirports();
    }, [country]);

    return { airports, loading, error };
};

export const usePackagesByAirport = (country, airportCode) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!country || !airportCode) {
            setPackages([]);
            return;
        }
        if (!API_BASE_URL) {
            console.error('VITE_BACKEND_URL is not defined');
            setError('Backend URL not configured');
            return;
        }

        const fetchPackages = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${API_BASE_URL}/packages/search`, {
                    params: { country, airportCode },
                });
                // assuming backend returns an array of PackageResponseDTO
                setPackages(res.data || []);
            } catch (err) {
                console.error('Error fetching packages:', err);
                const msg =
                    err.response?.data?.message ||
                    err.message ||
                    'Error fetching packages';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [country, airportCode]);

    return { packages, loading, error };
};

export const usePackagesByCountry = (country) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!country) {
            setPackages([]);
            return;
        }
        if (!API_BASE_URL) {
            console.error('VITE_BACKEND_URL is not defined');
            setError('Backend URL not configured');
            return;
        }

        const fetchPackages = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(`${API_BASE_URL}/packages/country`, {
                    params: { country },
                });
                // assuming backend returns an array of PackageResponseDTO
                setPackages(res.data || []);
            } catch (err) {
                console.error('Error fetching packages:', err);
                const msg =
                    err.response?.data?.message ||
                    err.message ||
                    'Error fetching packages';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [country]);

    return { packages, loading, error };
};
