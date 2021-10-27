// import { Component } from 'ms-vanilla';
import Component from '../../../lib/component';
import './style.css';

class TextArea extends Component {
  markup() {
    const { value, placeholder, maxlength, option } = this.props;
    return /* html */ `
    <textarea class="textarea" placeholder="${placeholder || ''}" maxlength="${maxlength || ''}" ${
      option ? '' : 'required'
    }>${value}</textarea>
    `;
  }
}

export default TextArea;
