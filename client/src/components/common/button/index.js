import { Component } from 'ms-vanilla';
import './style.css';

class Button extends Component {
  markup() {
    const { href, type, text } = this.props;
    return /* html */ `
    ${
      href
        ? `<a class="button" href="${href}">${text}</a>`
        : `<button class="button" type="${type || 'button'}">${text}</button>`
    }
    `;
  }
}

export default Button;
