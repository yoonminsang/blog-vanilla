// import { Component } from 'ms-vanilla';
import Component from '../../../lib/component';
import './style.css';

class Loader extends Component {
  markup() {
    return /* html */ `
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
    </svg>
    `;
  }
}

export default Loader;
