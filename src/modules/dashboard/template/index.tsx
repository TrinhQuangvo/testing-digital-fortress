"use client"
import { useDarkMode } from '@/hooks/use-darkmode'
import { useFetch } from '@/hooks/use-fetch-data'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Search from '../search'

const TABLE_HEAD = ['id', 'Project Name', 'Project Domain', 'Last Accessed', 'license Use']

const DashboardTemplate = () => {
  const { data, isLoading } = useFetch("https://frontend-exam.digitalfortress.dev/projects")
  const { isDarkMode } = useDarkMode()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push('/auth')
      alert("You haven't login yet!")
    }
  }, [])

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen w-full bg-gray-50 dark:bg-gray-700`}>
      <div className="lg:w-[90%] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className='py-4 text-2xl dark:text-white font-semibold'>Dashboard</h1>
          <Search />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {TABLE_HEAD.map((item, key) => (
                  <th key={key} scope="col" className="px-6 py-3">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Loading...
                  </td>
                </tr>
              )} 
              {data?.results.length > 0 ? data?.results.map(item => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.project_name ? item.project_name : "No Data"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.project_domain ? item.project_domain : "No Data"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.last_accessed ? item.last_accessed : "No Data"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.license_use.length > 0 &&
                      item.license_use.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                          <span>Type: {item.license_type}</span>
                          {item.libraries.length > 0 &&
                            item.libraries.map(lib => (
                              <span className="mr-2" key={lib}>
                                {lib}
                              </span>
                            ))}
                        </div>
                      ))}
                  </td>
                </tr>
              )) :
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Not Found!
                  </td>
                </tr>
              }

            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}

export default DashboardTemplate