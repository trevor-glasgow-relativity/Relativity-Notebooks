export class ElementFactory {
  
    constructor(globalObjectService) {
        this.globalObjectService = globalObjectService;
    }
  
    createDiv(className) {
        const div = this._createElement('div');
        div.className = className;
        return div;
    }
  
    createSpan(className) {
        const span = this._createElement('span');
        span.className = className;
        return span;
    }
  
    createButton(buttonText, className) {
        const button = this._createElement('button');
        button.setAttribute('type', 'button');
        button.innerText = buttonText;
        button.className = className;
        return button;
    }
  
    _createElement(tagName) {
        const documentObject = this.globalObjectService.getDocument();
        return documentObject.createElement(tagName);
    }
}