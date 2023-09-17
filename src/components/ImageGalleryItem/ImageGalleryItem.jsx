import { Modal } from '../Modal/Modal';
import { useState } from 'react';

import { ImageGaleryItem, ImgGallery } from './ImageGalleryItem.module';

export const ImageGalleryItem = ({
  galleryItem: { webformatURL, largeImageURL, tags },
}) => {
  // state = {
  //   isModalOpen: false,
  // };
  const [isModalOpen, setModalState] = useState();

  const toggleModal = () => {
    setModalState(isModalOpen => !isModalOpen);
  };

  return (
    <>
      <ImageGaleryItem onClick={toggleModal}>
        <ImgGallery src={webformatURL} alt={tags} />
      </ImageGaleryItem>
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tags}
          closeModal={toggleModal}
        />
      )}
    </>
  );
};
