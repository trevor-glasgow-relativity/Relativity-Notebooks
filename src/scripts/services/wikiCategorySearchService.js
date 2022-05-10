export class WikiCategorySearchService {
  
    constructor(fetchClient) {
        this.fetchClient = fetchClient;
    }
  
    async search(categoryName) {
        return await this.fetchClient.get(`wikipedia-management/v1/wikipedia-service/categories?prefix=${categoryName}`);
    }
}