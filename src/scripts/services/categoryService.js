export class CategoryService {
     
    constructor(fetchClient, globalObjectService) {
        this.fetchClient = fetchClient;
        this.globalObjectService = globalObjectService;
        this.appConstants = {
            articleCategoryObjectTypeGuid: '6B20F149-1B17-4E9C-8403-439E98E8BFD2',
            articleCategoryNameFieldGuid: '16D8A362-2923-45B7-8444-7339C57B3AF0',
            overwriteArticleTextFieldGuid: '042E0329-1467-4993-8188-66615E103DE3',
            automaticUpdatesEnabledFieldGuid: 'F365DE2E-A641-428F-9188-A3970A7C308F'
        };
    }
 
    create(categoryName) {
        const request = {
            'request': {
                'ObjectType': {
                    'Guid': this.appConstants.articleCategoryObjectTypeGuid
                },
                'FieldValues': [
                    {
                        'Field': {
                            'Guid':  this.appConstants.articleCategoryNameFieldGuid
                        },
                        'Value': categoryName
                    },
                    {
                        'Field': {
                            'Guid':  this.appConstants.overwriteArticleTextFieldGuid
                        },
                        'Value': false
                    },
                    {
                        'Field': {
                            'Guid': this.appConstants.automaticUpdatesEnabledFieldGuid
                        },
                        'Value': true
                    }
                ]
            }
        };
 
        return this.fetchClient.post(this._getObjectManagerMethodPath('create'), request);
    }
 
    async getCategories() {
        const request = {
            'request': {
                'ObjectType': {
                    'Guid': this.appConstants.articleCategoryObjectTypeGuid
                },
                'Condition': '',
                'Fields': [
                    {
                        'Guid': this.appConstants.articleCategoryNameFieldGuid
                    }
                ]
            },
            'start': 1,
            'length': 99999
        };
 
        const result = await this.fetchClient.post(this._getObjectManagerMethodPath('queryslim'), request);
 
        const mappedCategories = result.Objects.map(object => {
            return object.Values[0];
        });
         
        return mappedCategories;
    }
 
    _getWorkspaceId() {
        const windowObject = this.globalObjectService.getTopWindow();
        const url = new URL(windowObject.location.href);
        return url.searchParams.get('AppID');
    }
 
    _getObjectManagerMethodPath(methodName) {
        const workspaceId = this._getWorkspaceId();
        return `Relativity.Objects/workspace/${workspaceId}/object/${methodName}`;
    }
}