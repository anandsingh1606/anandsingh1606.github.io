const utils = {
  createElement: (tag, options = {}) => {
    if (typeof tag !== "string") {
      throw new Error("createElement:Tag invalid");
    }
    const node = document.createElement(tag);
    const { innerHTML, ...attrs } = options;
    if (innerHTML) {
      node.innerHTML = innerHTML;
    }
    Object.keys(attrs).forEach((name) => {
      const value = attrs[name];
      return node.setAttribute(name, value);
    });
    return node;
  },
  selector: document.querySelector.bind(document),
  selectorAll: document.querySelectorAll.bind(document),
};
