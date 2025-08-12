export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._username = document.querySelector(nameSelector);
    this._occupation = document.querySelector(jobSelector);
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
}
