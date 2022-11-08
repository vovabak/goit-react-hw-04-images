import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ toggleModal, image, alt }) => {
    
    return (
        <Item>
            <Image onClick={toggleModal} src={image} alt={alt} />
        </Item>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
}