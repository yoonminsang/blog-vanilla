import { Component } from 'ms-vanilla';
import './style.css';

class Input extends Component {
  markup() {
    return /* html */ `
    <input class="input" type="${this.props.type}" value="${this.props.value}" placeholder="${
      this.props.placeholder ? this.props.placeholder : ''
    }">
    `;
  }
}

export default Input;
