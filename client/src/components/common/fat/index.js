import { Component } from 'ms-vanilla';
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
