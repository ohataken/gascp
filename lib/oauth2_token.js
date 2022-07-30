const path = require('path');
const fs = require('fs');

module.exports = class OAuth2Token {

  constructor() {
    this.object = {};
  }

  getFilepath() {
    return path.resolve(__dirname, "../oauth2_token.json");
  }

  async read() {
    const json = await fs.promises.readFile(this.getFilepath(), "utf8");
    this.object = JSON.parse(json);
    return this.object;
  }

  async save() {
    return fs.promises.writeFile(this.getFilepath(), this.toJSON());
  }

  setObject(object) {
    this.object = object;
  }

  assign(object) {
    Object.assign(this.object, object);
  }

  toJSON() {
    return JSON.stringify({
      "client_id": this.object.client_id,
      "client_secret": this.object.client_secret,
      "access_token": this.object.access_token,
      "refresh_token": this.object.refresh_token,
      "scope": this.object.scope,
      "token_type": this.object.token_type,
      "id_token": this.object.id_token,
      "expiry_date": this.object.expiry_date,
    }, null, 2);
  }

}
