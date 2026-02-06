export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._username = document.querySelector(nameSelector);
    this._occupation = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._username.textContent,
      work: this._occupation.textContent,
    };
  }

  setUserInfo({ name, work }) {
    this._username.textContent = name;
    this._occupation.textContent = work;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
