
type Props = {}

const Search = (props: Props) => {

    return (
        <div className='flex gap-2'>
            <input type="text" className='rounded-lg w-full border outline-none px-4 py-2' />
            <button className='border px-6 py-2 rounded-lg bg-green-300 text-white font-medium'>Search</button>
        </div>
    )
}

export default Search