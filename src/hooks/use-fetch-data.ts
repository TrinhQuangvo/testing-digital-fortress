import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"

type ILicenseUse = {
    license_type: string
    libraries: string[]
}

interface IResult {
    id: number,
    project_name: string,
    project_domain: string,
    last_accessed?: string,
    license_use: ILicenseUse[]
}

interface IData {
    count: number,
    results: IResult[]
}

export const useFetch = (url: string) => {
    const [data, setData] = useState<IData>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredData = useMemo(() => {
        if (!data || !data.results) return null;

        return data.results.filter(item =>
            item.project_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    const getData = useCallback(async () => {
        setIsLoading(true);
        try {
            const authToken = localStorage.getItem('accessToken');
            if (!authToken) {
                throw new Error('No authToken found');
            }
            const headers = { Authorization: `Bearer ${authToken}` }
            const response = await axios.get(url, { headers });
            setData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getData()
    }, [getData])

    return {
        data: filteredData,
        isLoading,
        setSearchQuery
    }
}