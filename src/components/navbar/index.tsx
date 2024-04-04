"use client"
import { useDarkMode } from '@/hooks/use-darkmode'
import SwitchButton from '../switch-darkmode'

const Navbar = () => {
    const {isDarkMode} = useDarkMode()
    return (
        <nav className='w-full bg-green-500 p-4'>
            <div className="w-full lg:w-[90%] mx-auto text-white text-2xl font-medium flex justify-between items-center">
                <span>Digital Fortress</span>
                <div className='flex gap-2 items-center justify-center'>
                    <div className='flex gap-2 items-center justify-center'>
                        <span className='text-sm'>{isDarkMode ? "Dark" : "Light"}</span>
                        <SwitchButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar