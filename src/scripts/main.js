import { SearchHandler } from './searchHandler.js';
import { WikiCategorySearchService } from './services/wikiCategorySearchService.js';
import { SearchResultsPresenter } from './searchResultsPresenter.js';
import { CategoryService } from './services/categoryService.js';
import { ApiFetchClient } from './services/apiFetchClient.js';
import { CategoryResultElementFactory } from './categoryResultElementFactory.js';
import { ElementFactory } from './elementFactory.js';
import { GlobalObjectService } from './services/globalObjectService.js';
import '../styles/style.css';
  
let _searchHandler;
  
function startApplication() {
    console.info('HelloWikipedia Categories application started');
  
    const searchButton = _getSearchButton();
    searchButton.addEventListener('click', _onSearchButtonClicked);
    searchButton.setAttribute('disabled', '');
  
    _getSearchInput().addEventListener('input', _onSearchTextChanged);
}
  
function _getSearchHandler() {
    if (_searchHandler) {
        return _searchHandler;
    }
  
    const globalObjectService = new GlobalObjectService();
    const fetchClient = new ApiFetchClient(globalObjectService);
    const categoryService = new CategoryService(fetchClient, globalObjectService);
    const elementFactory = new ElementFactory(globalObjectService);
    const categoryResultElementFactory = new CategoryResultElementFactory(elementFactory, categoryName => categoryService.create(categoryName));
    const resultsPresenter = new SearchResultsPresenter(categoryService, elementFactory, categoryResultElementFactory, globalObjectService);
    const categorySearchService = new WikiCategorySearchService(fetchClient);
    _searchHandler = new SearchHandler(categorySearchService, resultsPresenter);
  
    return _searchHandler;
}
  
function _onSearchButtonClicked() {
    const searchHandler = _getSearchHandler();
    searchHandler.executeSearch(_getSearchInput().value);
}
  
function _onSearchTextChanged() {
    const searchButton = _getSearchButton();
  
    if (_getSearchInput().value) {
        searchButton.removeAttribute('disabled');
    } else {
        searchButton.setAttribute('disabled', '');
    }
}
  
function _getSearchButton() {
    return document.getElementById('hw-category-search-button');
}
  
function _getSearchInput() {
    return document.getElementById('hw-search-input');
}
  
startApplication();