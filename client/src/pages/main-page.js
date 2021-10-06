import Main from '../components/main';
import Main2 from '../components/main2';
import Component from '../lib/component';

class MainPage extends Component {
  markup() {
    return /* html */ `
      <div class="main"></div>
      <div class="main2"></div>
    `;
  }

  appendComponent() {
    const $main = document.querySelector('.main');
    const $main2 = document.querySelector('.main2');

    new Main($main);
    new Main2($main2);
  }
}

export default MainPage;
