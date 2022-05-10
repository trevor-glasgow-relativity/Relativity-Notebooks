export class SearchResultsPresenter {
  
    constructor(
        categoryService,
        elementFactory,
        categoryResultElementFactory,
        globalObjectService) {
        this.categoryService = categoryService;
        this.elementFactory = elementFactory;
        this.categoryResultElementFactory = categoryResultElementFactory;
        this.globalObjectService = globalObjectService;
    }
  
    async showSearchResults(categories) {
        const existingCategories = await this.categoryService.getCategories();
  
        const categoriesToRender = categories.map(category => {
            const exists = existingCategories.includes(category.Title);
            return {
                name: category.Title,
                exists: exists
            };
        });
  
        this._renderCategories(categoriesToRender);
    }
  
    _renderCategories(categories) {
        const documentObject = this.globalObjectService.getDocument();
        const resultsDiv = documentObject.getElementById('hw-results-container');
        resultsDiv.innerHTML = '';
  
        this._addResultsTitle(resultsDiv);
  
        categories.forEach(category => {
            const resultElement = this.categoryResultElementFactory.createHtmlElement(category);
            resultsDiv.appendChild(resultElement);
        });
    }
  
    _addResultsTitle(resultsDiv) {
        const resultsHeader = this.elementFactory.createDiv('hw-results-header hw-category-row');
        const headerText = this.elementFactory.createSpan('hw-category-cell');
        headerText.innerText = 'Categories Found';
        resultsHeader.appendChild(headerText);
        resultsDiv.appendChild(resultsHeader);
    }
}