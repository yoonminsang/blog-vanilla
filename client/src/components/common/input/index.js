// import { Component } from 'ms-vanilla';
import Component from '../../../lib/component';
import './style.css';

class Input extends Component {
  markup() {
    const { type, value, placeholder } = this.props;
    return /* html */ `
    <input class="input" type="${type}" value="${value}" placeholder="${placeholder || ''}">
    `;
  }
}

export default Input;
