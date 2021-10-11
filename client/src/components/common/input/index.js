import { Component } from 'ms-vanilla';
import './style.css';

class Input extends Component {
  markup() {
    return /* html */ `
    <input class="input" value=${this.props.value}>
    `;
  }
}

export default Input;
