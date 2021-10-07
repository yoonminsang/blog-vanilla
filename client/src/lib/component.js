class Component {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
    this.appendComponent();
    this.componentDidMount();
    this.setEvent();
  }

  setup() {}

  render() {
    this.target.innerHTML = this.markup();
    if (this.props?.class) {
      const el = this.target.firstElementChild;
      const classArr = this.props.class.split(' ');
      classArr.forEach(className => {
        el.classList.add(className);
      });
    }
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

    const newElements = [...newDom.querySelectorAll('*')];
    const currentElements = [...this.target.querySelectorAll('*')];

    if (newElements.length !== currentElements.length) {
      this.target.innerHTML = newMarkup;
      return;
    }

    for (let i = 0; i < newElements.length; i++) {
      const newEl = newElements[i];
      const curEl = currentElements[i];

      if (newEl.childElementCount !== curEl.childElementCount) {
        this.target.innerHTML = newMarkup;
        return;
      }

      if (!newEl.isEqualNode(curEl)) {
        if (newEl.tagName !== curEl.tagName) {
          curEl.replaceWith(newEl);
        } else {
          if (
            curEl.firstChild?.nodeName === '#text' &&
            newEl.firstChild?.nodeName === '#text' &&
            curEl.firstChild.nodeValue !== newEl.firstChild.nodeValue
          ) {
            curEl.firstChild.nodeValue = newEl.firstChild.nodeValue;
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
