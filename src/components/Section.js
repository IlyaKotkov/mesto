export default class Section {
    constructor({items, renderer}, cardSelector) { 
        this._item = items
        this._renderer = renderer
        this._cardSelector = document.querySelector(cardSelector)
    }

    rendererItems() {
        this._item.forEach(item => this._renderer(item))           
    }

    addItem(element) {
        this._cardSelector.prepend(element);
    }
}