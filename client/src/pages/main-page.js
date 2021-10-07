import Button from '../components/common/button';
import Main from '../components/main';
import Main2 from '../components/main2';
import Component from '../lib/component';

class MainPage extends Component {
  markup() {
    return /* html */ `
      <div class="main"></div>
      <div class="main2"></div>
      <div class="button-div"></div>
    `;
  }

  appendComponent() {
    const $main = document.querySelector('.main');
    const $main2 = document.querySelector('.main2');
    const $buttonDiv = document.querySelector('.button-div');

    new Main($main);
    new Main2($main2);
    new Button($buttonDiv, { text: '버트은', class: 'full-width blue' });
  }
}

export default MainPage;
