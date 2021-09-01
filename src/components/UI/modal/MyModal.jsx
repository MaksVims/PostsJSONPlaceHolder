import React from 'react';
import cl from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {
  const rootClasses = [cl.modal]
  if (visible) {
    rootClasses.push(cl.visible)
  }

  return (
    <section className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.modal__content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </section>
  );
};

export default MyModal;
