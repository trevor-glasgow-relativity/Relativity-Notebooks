export class SearchHandler {
  
    constructor(categorySearchService, resultsPresenter) {
        this.categorySearchService = categorySearchService;
        this.resultsPresenter = resultsPresenter;
    }
  
    async executeSearch(categoryPrefix) {
        const result = await this.categorySearchService.search(categoryPrefix);
        await this.resultsPresenter.showSearchResults(result);
    }
}