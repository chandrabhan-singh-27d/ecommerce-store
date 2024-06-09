import React from 'react'

const Button = ({ type, children }) => {
    return (
        <button type={type || 'button'} className="text-white bg-gradient-to-r from-[#ed0b51] to-[#840260] hover:bg-gradient-to-l focus:ring-1 focus:outline-none focus:ring-[#840260] font-medium rounded-lg text-sm px-5 py-2.5 text-center">{children}</button>
    )
}

export default Button