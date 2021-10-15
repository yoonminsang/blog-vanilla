// import { Component } from 'ms-vanilla';
import Component from '../../lib/component';
import './style.css';

class Modal extends Component {
  markup() {
    const { img, visible, body, confirm } = this.props;
    return /* html */ `
    <div class="modal${visible ? '' : ' blind'}">
      <div class="modal-content">
        ${img ? `<div class="icon ${img}"></div>` : ''}
        ${body ? `<div class="modal-body">${body}</div>` : ''}
        ${
          confirm
            ? '<button class="modal-btn modal-confirm">네</button><button class="modal-btn modal-cancel">아니오</button>'
            : ''
        }
      </div>
    </div>
    `;
  }

  setEvent() {
    const { setVisible, onConfirm } = this.props;
    if (setVisible && onConfirm) {
      this.addEvent('click', '.modal-confirm', () => {
        onConfirm();
        setVisible(false);
      });
      this.addEvent('click', '.modal-cancel', () => {
        setVisible(false);
      });
    }
  }
}

export default Modal;
