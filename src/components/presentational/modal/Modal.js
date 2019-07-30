import React from 'react';
import ReactDOM from 'react-dom';

import Icon from '../icon/Icon';

export default function Modal({ title, children, onClose }) {
  const container = <div className="modal">
    <div className="modal__content">
      <div className="modal__content__title">
        <h1>{title}</h1>
        <button type="button" className="btn btn--small btn--primary--outline btn--iconed" onClick={onClose}>
          <Icon id="clear" className="btn__icon" />
        </button>
      </div>
      <div className="modal__content__body">
        {children}
      </div>
    </div>
  </div>;

  return ReactDOM.createPortal(container, window.document.body);
}