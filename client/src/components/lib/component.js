class Component {
  constructor(target, props) {
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
      this.addClass(this.target);
    }
    this.appendComponent(this.target);
    if (this.target.nodeName === 'INSIDE') {
      this.inside = true;
      this.target = this.changeInside(this.target);
    }
  }

  addClass(target) {
    const el = target.firstElementChild;
    const classArr = this.props.class.split(' ');
    classArr.forEach(className => {
      el.classList.add(className);
    });
  }

  changeInside(target) {
    const temp = target.firstElementChild;
    target.replaceWith(...target.childNodes);
    return temp;
  }

  appendComponent() {}

  componentDidMount() {}

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

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.update();
  }

  update() {
    const newMarkup = this.markup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    this.appendComponent(newDom);

    const newElements = this.inside ? [...newDom.querySelectorAll('*')].slice(1) : [...newDom.querySelectorAll('*')];
    const currentElements = [...this.target.querySelectorAll('*')];

    if (newElements.length !== currentElements.length) {
      this.target.innerHTML = newMarkup;
      this.appendComponent(this.target);
      return;
    }

    for (let i = 0; i < newElements.length; i++) {
      const newEl = newElements[i];
      const curEl = currentElements[i];
      if (newEl.childElementCount !== curEl.childElementCount) {
        this.target.innerHTML = newMarkup;
        this.appendComponent(this.target);
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
