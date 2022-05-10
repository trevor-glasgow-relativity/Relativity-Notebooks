export class GlobalObjectService {
    getTopWindow() {
        return window.top;
    }
  
    getWindow() {
        return window;
    }
  
    getDocument() {
        return document;
    }
}