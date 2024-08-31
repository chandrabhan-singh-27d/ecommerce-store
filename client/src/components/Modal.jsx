import { createPortal } from 'react-dom'

const Modal = ({ children }) => {
    return createPortal(
        <>
            <div className='fixed bg-black opacity-80 z-[1000] top-0 left-0 right-0 bottom-0'></div>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]'>
                {children}
            </div>
        </>,
        document.getElementById('modal-port')
    )
}

export default Modal