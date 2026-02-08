import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useMassage = () => {
    const [loadingMassage, setLoadingMassage] = useState(false)
    const [massagesData, setMassagesData] = useState([])
    const loadData = async () => {
        setLoadingMassage(true);
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/massages`);
        setMassagesData(res.data);
        console.log(res.data);
        setLoadingMassage(false);
    }
    useEffect(() => {
        loadData()
    }, [])
    return { loadingMassage, massagesData, loadData }
};

export default useMassage;