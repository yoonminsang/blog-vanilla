// import { Component } from 'ms-vanilla';
import Component from '../../../lib/component';
import './style.css';

class TextArea extends Component {
  markup() {
    const { type, value, placeholder, maxlength } = this.props;
    return /* html */ `
    <textarea class="textarea" type="${type}" placeholder="${placeholder || ''}" maxlength="${
      maxlength || ''
    }">${value}</textarea>
    `;
  }
}

export default TextArea;
