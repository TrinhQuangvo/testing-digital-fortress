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
    results: IResult[] | []
}

export const useFetch = (url: string) => {
    const [data, setData] = useState<IData>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const PAGE_SIZE = 3
    const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchQuery(value)
    }

    const totalPages = useMemo(() => {
        if (!data || !data.results) return 0;
        return Math.ceil(data.results.length / PAGE_SIZE);
    }, [data, PAGE_SIZE]);

    const onPageChange = (page: number) => {
        setPageNumber(page)
    }

    const filteredData = useMemo(() => {
        if (!data || !data.results) return [];

        let filteredResults = data.results.filter((item) =>
            item.project_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const startIndex = (pageNumber - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        filteredResults = filteredResults.slice(startIndex, endIndex);

        return filteredResults;
    }, [data, searchQuery, pageNumber, PAGE_SIZE]);


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
        handleChangeQuery,
        filteredData,
        PAGE_SIZE,
        onPageChange, pageNumber, totalPages
    }
}