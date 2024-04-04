"use client"
import { useDarkMode } from '@/hooks/use-darkmode'
import { Switch } from '@headlessui/react'
import { Fragment } from 'react'

function SwitchButton() { 
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    return (
        <Switch checked={isDarkMode} onChange={toggleDarkMode} as={Fragment}>
            {({ checked }) => (
                <button
                    className={`${checked ? 'bg-green-400' : 'bg-gray-400'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span className="sr-only">Dark Mode</span>
                    <span
                        className={`${checked ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </button>
            )}
        </Switch>
    )
}

export default SwitchButton