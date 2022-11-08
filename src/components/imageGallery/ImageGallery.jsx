import PropTypes from "prop-types";
import { ImageGalleryItem } from '../imageGalleryItem';
import { GalleryList } from './ImageGallery.styled';


export const ImageGallery = ({ toggleModal, gallery, children }) => {

  return (
    <>
      <GalleryList>        
          {
            gallery.map(image => <ImageGalleryItem
              key={image.id}
              image={image.webformatURL}              
              alt={image.tags}
              toggleModal={() => toggleModal(image.id)}
            />)
        }      
      </GalleryList>
      {children}
    </>      
  )
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    })).isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}