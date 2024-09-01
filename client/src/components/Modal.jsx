import { useEffect } from 'react';
import { createPortal } from 'react-dom'

const Modal = ({ onCloseModal, children }) => {

    useEffect(() => {
        const handleModalClose = (e) => {
            if (e.key === 'Escape') {
                onCloseModal();
            }
        }
        document.addEventListener('keydown', handleModalClose);
        return () => {
            document.removeEventListener('keydown', handleModalClose);
        };
    }, [onCloseModal]);

    return createPortal(
        <>
            <div onKeyUp={(e) => handleModalClose(e)} onClick={onCloseModal} className='fixed bg-black opacity-80 z-[1000] top-0 left-0 right-0 bottom-0'></div>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]'>
                {children}
            </div>
        </>,
        document.getElementById('modal-port')
    )
}

export default Modal