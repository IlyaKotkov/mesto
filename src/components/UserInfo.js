export default class UserInfo {
    constructor({name, about}) {
        this._nameSelector = document.querySelector(name)
        this._jobSelector = document.querySelector(about)
        
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent, 
            about: this._jobSelector.textContent, 
            
         }
    }

    setUserInfo(data) {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        
    }
}