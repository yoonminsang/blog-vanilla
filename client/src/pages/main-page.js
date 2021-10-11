import { Component } from 'ms-vanilla';
import Button from '../components/common/button';
import Fat from '../components/common/fat';
import Header from '../components/common/header';
import Input from '../components/common/input';

class MainPage extends Component {
  setup() {
    this.state = {
      value: '',
    };
  }

  markup() {
    return /* html */ `
      <inside class="header"/></inside>
      <inside class="button-div"></inside>
      <inside class="button-div2"></inside>
      <inside class="fat"></inside>
      <inside class="input"></inside>
    `;
  }

  appendComponent(target) {
    const $buttonDiv = target.querySelector('.button-div');
    const $buttonDiv2 = target.querySelector('.button-div2');
    const $fat = target.querySelector('.fat');
    const $header = target.querySelector('.header');
    const $inner = target.querySelector('.input');
    new Button($buttonDiv, { text: '버트은', class: 'full-width' });
    new Button($buttonDiv2, { text: '버트은sdfsdfsd' });
    new Fat($fat);
    new Header($header, { inside: true });
    new Input($inner, { value: this.state.value, class: 'input-1' });
  }

  setEvent() {
    this.addEvent('input', '.input-1', ({ target }) => {
      this.setState({ value: target.value });
    });
  }
}

export default MainPage;
