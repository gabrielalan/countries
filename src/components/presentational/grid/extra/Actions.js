import React, { useState } from 'react';

import Icon from '../../icon/Icon';
import Modal from '../../modal/Modal';

export default function Actions({ hiddenColumns, showColumn }) {
  const [modalIsOpen, setModalVisibility] = useState(false);

  const showColumnModalAction = name => {
    showColumn(name);
    
    if (hiddenColumns.length <= 1) {
      setModalVisibility(false);
    }
  };

  return <>
    <button type="button"
      className="btn btn--squared btn--block btn--warning btn--iconed s-ml--2"
      onClick={() => setModalVisibility(true)}>
      <Icon id="more" className="btn__icon" />
    </button>

    {modalIsOpen ? <Modal title="Extra grid actions" onClose={() => setModalVisibility(false)}>
      Add back the columns that you've hide before:
      <hr />
      {hiddenColumns.map(
        name => <button
          key={name}
          type="button"
          className="btn btn--secondary btn--small s-mr--2"
          onClick={() => showColumnModalAction(name)}>
          {name}
        </button>
      )}
    </Modal> : null}
  </>;
}
