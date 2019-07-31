import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';

export default function Modal({ title, children, onClose, modalRoot }) {
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

  return createPortal(container, modalRoot);
}

Modal.defaultProps = {
  modalRoot: window.document.body
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
