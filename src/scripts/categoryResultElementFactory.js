export class CategoryResultElementFactory {
  
    constructor(elementFactory, createCategory) {
        this.elementFactory = elementFactory;
        this.createCategory = createCategory;
    }
  
    createHtmlElement(category) {
        const row = this.elementFactory.createDiv('hw-category-row');
  
        const categoryName = this.elementFactory.createSpan('hw-category-cell');
        categoryName.innerText = category.name;
  
        row.appendChild(categoryName);
  
        if (!category.exists) {
            const buttonDiv = this.elementFactory.createDiv('hw-button-cell');
            const button = this._createButton('Create', category.name);
            buttonDiv.appendChild(button);
            row.appendChild(buttonDiv);
        }
  
        return row;
    }
  
    _createButton(buttonText, categoryName) {
        const button = this.elementFactory.createButton(buttonText, 'hw-button');
        button.addEventListener('click',
            () => {
                button.parentNode.removeChild(button);              
                this.createCategory(categoryName);
            });
        return button;
    }
}