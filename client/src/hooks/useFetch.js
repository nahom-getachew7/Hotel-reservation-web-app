import { useEffect, useState } from "react";
import axios from "axios";


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(6);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
                setCurrentPage(1)
                setPostPerPage(5)
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async() => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, currentPage, postPerPage, error, setCurrentPage, reFetch };
};

export default useFetch;