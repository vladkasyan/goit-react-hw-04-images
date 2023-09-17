import { useEffect } from 'react';

import { Overlay, Modals } from './Modal.module';

export const Modal = ({ largeImageURL, alt, closeModal }) => {
  useEffect(() => {
    const pressKey = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', pressKey);

    return () => {
      window.removeEventListener('keydown', pressKey);
    };
  }, [closeModal]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <Modals>
        <img src={largeImageURL} alt={alt} />
      </Modals>
    </Overlay>
  );
};
