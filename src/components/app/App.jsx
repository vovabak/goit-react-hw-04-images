import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from '../../api';
import { Searchbar } from '../searchbar';
import { ImageGallery } from '../imageGallery';
import { Button } from '../button';
import { Loader } from '../loader';
import { Modal } from '../modal';
import { Container } from './App.styled';



export class App extends Component {

  state = {
    gallery: [],    
    querry: '',
    page: 1,    
    status: 'idle',
    error: null,
    showModal: false,
    showLoadMore: false,
  }
 

  async componentDidUpdate(_, prevState) {

    const { querry, gallery, page, modalImage } = this.state
    const {querry: prevQuerry, gallery: prevGallery, page: prevPage,} = prevState
      
    if (modalImage) return
    
    if (prevQuerry !== querry) {
      this.setState({ gallery, page: 1 });
    }

    if (prevGallery === gallery && prevPage !== page) {      

      this.setState({ status: 'pending', })

      try {
        const response = await getImages(querry, page)       

        if (response.data.totalHits === 0) {
          throw new Error("Something went wrong, please try again later")          
        }

        if (response.data.totalHits < response.config.params.per_page) {
          
          this.setState({ showLoadMore: false, status: 'resolved', });
        }

        if (gallery.length > 0 && page > response.data.totalHits / response.config.params.per_page) {
          
          this.setState({ showLoadMore: false, status: 'resolved', });
          toast("It seems You've just reached the end of the list");
        }
        
        this.setState({ gallery: [...prevGallery, ...response.data.hits], status: 'resolved', });

      } catch (error) {
        toast.error(error.message);
        this.setState({ status: 'rejected', error: error.message });
      }
    }
  }

  handleSubmit = (querry) => {
    this.setState({
      querry,      
      page: 0,
      gallery: [],
      showLoadMore: true,
    })
  }

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1, 
      }
    })
  }

  toggleModal = (id) => {
    
    this.setState({      
      showModal: id? this.state.gallery.filter(galleryItem => galleryItem.id === id) : false,
    }) 
  }

  render() {

    const { querry, gallery, status, showLoadMore, showModal } = this.state;
       
    return (
      <Container>
        <Searchbar
          onSubmit={this.handleSubmit}
          querry={querry}
        />
        {status !== 'rejected' &&
          <ImageGallery
            gallery={gallery}
            toggleModal={this.toggleModal}>
            <Loader status={status} />
          </ImageGallery>
        }
        {status === 'resolved' && showLoadMore &&
          <Button            
            onLoadMore={this.handleLoadMore} />}        
        {showModal &&
          <Modal
            image={showModal}       
            toggleModal={this.toggleModal} />}
        <ToastContainer
          limit={3}
        />
      </Container>
    )
  }
}