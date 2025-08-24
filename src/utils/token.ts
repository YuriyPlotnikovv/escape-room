export class Token {
  private static _name = 'escape-room-auth-token';

  static get() {
    const token = localStorage.getItem(this._name);

    return token ?? '';
  }

  static set(token: string) {
    localStorage.setItem(this._name, token);
  }

  static remove() {
    localStorage.removeItem(this._name);
  }
}
