import { Component } from 'ms-vanilla';
import './style.css';

class Button extends Component {
  markup() {
    return /* html */ `
    <button class="button" type="${this.props.type || 'button'}">${this.props.text}</button>
    `;
  }
}

export default Button;
