import { useEffect } from 'react';
import PropTypes from "prop-types";
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ image, toggleModal }) => {
    
    useEffect((onClose = (e) => {
        
            if (e.key !== 'Escape') return

            toggleModal()
        }) => {
        document.addEventListener('keydown', onClose)
        return () => document.removeEventListener('keydown', onClose)        
    }, [toggleModal])   

    const onClick = (e) => {

        if(e.target !== e.currentTarget) return
       
        toggleModal()
    }

    return (
        <Overlay onClick={onClick}>
            <ModalWindow>
                <img src={image[0].largeImageURL} alt={image[0].tags} />
            </ModalWindow>
        </Overlay>
    )
}

Modal.propTypes = {
    image: PropTypes.arrayOf(PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })).isRequired,
    toggleModal: PropTypes.func.isRequired,
}