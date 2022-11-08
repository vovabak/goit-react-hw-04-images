import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from '../../api';
import { Searchbar } from '../searchbar';
import { ImageGallery } from '../imageGallery';
import { Button } from '../button';
import { Loader } from '../loader';
import { Modal } from '../modal';
import { Container } from './App.styled';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [querry, setQuerry] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle'); 
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  
  
  useEffect(() => {    

    if (!querry) return
      
    setStatus('pending')    
    
    getImages(querry, page)
      .then(response => {
        if (response.data.totalHits === 0) {
          throw new Error("Something went wrong, please try again later")          
        }

        if (response.data.totalHits < response.config.params.per_page) {          
          setShowLoadMore(false);
          setStatus('resolved');
        }

        if (page !== 1 && page > response.data.totalHits / response.config.params.per_page) {          
          setShowLoadMore(false);
          setStatus('resolved');
          toast("It seems You've just reached the end of the list");
        }
        
        setGallery(state => [...state, ...response.data.hits]);
        setStatus('resolved');
        
      }).catch (error => {
        toast.error(error.message);
        setStatus('rejected');       
      })
  }, [querry, page])

  const handleSubmit = (querry) => {
    setQuerry(querry);
    setPage(1)
    setGallery([]);
    setShowLoadMore(true);
  }

  const handleLoadMore = () => {
    setPage(state => state + 1);
  }

  const toggleModal = (id) => {
    setShowModal(id? gallery.filter(galleryItem => galleryItem.id === id) : false)
  }  
       
  return (
    <Container>
      <Searchbar
        onSubmit={handleSubmit}
        querry={querry}
      />
      <ImageGallery
        gallery={gallery}
        toggleModal={toggleModal}>
        <Loader status={status} />
      </ImageGallery>
      {status === 'resolved' && showLoadMore &&
        <Button            
          onLoadMore={handleLoadMore} />}        
      {showModal &&
        <Modal
          image={showModal}       
          toggleModal={toggleModal} />}
      <ToastContainer
        limit={3}
      />
    </Container>
  )
}

