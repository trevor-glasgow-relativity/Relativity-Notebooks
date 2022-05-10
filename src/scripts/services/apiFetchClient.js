export class ApiFetchClient {
    constructor(globalObjectService) {
        this.globalObjectService = globalObjectService;
    }
  
    async get(apiEndpoint) {
        const response = await this.globalObjectService.getWindow().fetch(this._getFullApiPath(apiEndpoint));
        this._validateResponse(response);
        return await response.json();
    }
  
    async post(apiEndpoint, body) {
        const response = await this.globalObjectService.getWindow().fetch(this._getFullApiPath(apiEndpoint), this._getPostRequestInit(body));
        this._validateResponse(response);
        return await response.json();
    }
  
    _getPostRequestInit(payload) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Header': '-'
            },
            body: JSON.stringify(payload)
        };
    }
  
    _validateResponse(response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    }
  
    _getFullApiPath(apiEndpoint) {
        return this.globalObjectService.getTopWindow().GetKeplerApplicationPath() + apiEndpoint;
    }
}