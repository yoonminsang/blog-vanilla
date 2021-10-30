class Component {
  constructor(target, props = {}) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
    this.componentDidMount();
    this.setEvent();
  }

  setup() {}

  render() {
    this.target.innerHTML = this.markup();
    if (this.props?.class) {
      this.addClass();
    }
    this.appendComponent(this.target);
    if (this.target.nodeName === 'INSIDE') {
      this.inside = true;
      this.changeInside();
    }
  }

  addClass() {
    const el = this.target.firstElementChild;
    const classArr = this.props.class.split(' ');
    classArr.forEach(className => {
      el.classList.add(className);
    });
  }

  changeInside() {
    const temp = this.target.firstElementChild;
    this.target.replaceWith(...this.target.childNodes);
    this.target = temp;
  }

  appendComponent() {}

  componentDidMount() {}

  componentDidUpdate() {}

  markup() {
    return '';
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    const children = [...this.target.querySelectorAll(selector)];
    const isTarget = target => children.includes(target) || target.closest(selector);
    this.target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }

  setState(nextState, cb) {
    this.componentDidUpdate({ ...this.state }, { ...this.state, ...nextState });
    this.state = { ...this.state, ...nextState };
    this.update();
    if (cb) {
      cb();
    }
  }

  update() {
    const newMarkup = this.markup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    this.appendComponent(newDom);

    const newElements = this.inside
      ? [...newDom.firstElementChild.querySelectorAll('*')]
      : [...newDom.querySelectorAll('*')];
    const currentElements = [...this.target.querySelectorAll('*')];

    if (newElements.length !== currentElements.length) {
      this.target.innerHTML = this.inside
        ? [...newDom.firstElementChild.children].map(el => el.outerHTML).join('')
        : newDom.firstElementChild.outerHTML;
      return;
    }

    for (let i = 0; i < newElements.length; i++) {
      const newEl = newElements[i];
      const curEl = currentElements[i];
      if (newEl.childElementCount !== curEl.childElementCount) {
        this.target.innerHTML = this.inside
          ? [...newDom.firstElementChild.children].map(el => el.outerHTML).join('')
          : newDom.firstElementChild.outerHTML;
        return;
      }
      if (!newEl.isEqualNode(curEl)) {
        if (newEl.tagName !== curEl.tagName) {
          curEl.replaceWith(newEl);
        } else {
          if (curEl.firstChild?.nodeName === '#text' && newEl.firstChild?.nodeName === '#text') {
            if (curEl.firstChild.nodeValue !== newEl.firstChild.nodeValue) {
              curEl.firstChild.nodeValue = newEl.firstChild.nodeValue;
            }
          } else if (curEl.firstChild?.nodeName === '#text') {
            curEl.removeChild(curEl.firstChild);
          } else if (newEl.firstChild?.nodeName === '#text') {
            const text = document.createTextNode(newEl.firstChild.nodeValue);
            curEl.appendChild(text);
          }

          const curAttributes = curEl.attributes;
          const newAttributes = newEl.attributes;

          [...curAttributes].forEach(curAttr => {
            if (!newAttributes.getNamedItem(curAttr.name)) curEl.removeAttribute(curAttr.name);
          });

          [...newAttributes].forEach(newAttr => {
            const currentAttribute = curAttributes.getNamedItem(newAttr.name);
            if (!currentAttribute || currentAttribute.value !== newAttr.value)
              curEl.setAttribute(newAttr.name, newAttr.value);
          });
        }
      }
    }
  }
}

export default Component;
