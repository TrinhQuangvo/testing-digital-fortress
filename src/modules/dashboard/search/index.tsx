"use client"

type SearchProps = {
    handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ handleChangeQuery }: SearchProps) => {
    return (
        <div className='flex gap-2'>
            <input placeholder="search" onChange={handleChangeQuery} type="text" className='rounded-lg w-full border outline-none px-4 py-2' />
        </div>
    )
}

export default Search