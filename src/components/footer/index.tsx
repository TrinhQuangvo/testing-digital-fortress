import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  const getCurrentYear = () => {
    const year = new Date().getFullYear()
    return year
  }
  return (
    <div className='w-full bg-green-500 py-2 text-white text-center text-sm font-semibold'>Trinh Quang &copy;{getCurrentYear()}</div>
  )
}

export default Footer