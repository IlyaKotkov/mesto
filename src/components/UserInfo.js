export default class UserInfo {
    constructor({name, about, avatar}) {
        this._nameSelector = document.querySelector(name)
        this._jobSelector = document.querySelector(about)
        this._avatarSelector = document.querySelector(avatar)
        console.log(this._nameSelector)
        console.log(this._jobSelector)
        console.log(this._avatarSelector)
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent, 
            about: this._jobSelector.textContent,
            avatar: this._avatarSelector.textContent
            
         }
    }
    

    setUserInfo(data) {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        this._avatarSelector.textContent = data.avatar
        console.log(data.name)
        console.log(data.about)
        console.log(data.avatar)
    }
}