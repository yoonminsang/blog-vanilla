// import { Component } from 'ms-vanilla';
import Component from '../../lib/component';
import './style.css';

class Fat extends Component {
  // floating action button
  markup() {
    return /* html */ `
    <button class="fat"><div class="icon add"></div></button>
    `;
  }
}

export default Fat;
