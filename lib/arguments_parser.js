const google = require('@googleapis/script');
const OAuth2Token = require('./oauth2_token');

module.exports = class ArgumentsParser {

  static parse(args) {
    const parser = new this(args);
    return parser.parse();
  }

  constructor(args) {
    this.args = args;
    this.index = 0;
  }

  peek() {
    return this.args[this.index];
  }

  hasNext() {
    return this.index + 1 < this.args.length;
  }

  seek() {
    return this.args[this.index++];
  }

  parse() {
    this.seek();
    this.seek();

    if (this.peek() === "--showauthurl") {
      return this.parseShowAuthorizationUrl();
    } else if (this.peek() === "--enterauthcode") {
      return this.parseEnterAuthorizationCode();
    } else if (this.peek() === "cp") {
      return this.parseCopy();
    } else {
      throw 'no command';
    }
  }

  async parseShowAuthorizationUrl() {
    this.seek();

    const id = this.seek();
    const secret = this.seek();
    const redirect_uri = this.seek();

    const t = await OAuth2Token.read();
    t.assign({
      client_id: id,
      client_secret: secret,
    });
    await t.save();

    // https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts
    const oauth2 = new google.auth.OAuth2(id, secret, redirect_uri);

    const url = oauth2.generateAuthUrl({
      access_type: "offline",
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/script.projects',
        'https://www.googleapis.com/auth/script.deployments',
        'https://www.googleapis.com/auth/script.processes',
      ],
    });

    console.log(url);
  }

  async parseEnterAuthorizationCode() {
    this.seek();

    const t = await OAuth2Token.read();
    const id = t.object.client_id;
    const secret = t.object.client_secret;
    const redirect_uri = this.seek();
    const code = this.seek();

    // https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts
    const oauth2 = new google.auth.OAuth2(id, secret, redirect_uri);
    const { tokens } = await oauth2.getToken(code);

    t.assign(tokens);
    await t.save();
  }

  async parseCopy() {
    this.seek();

    const t = await OAuth2Token.read();
    const id = t.object.client_id;
    const secret = t.object.client_secret;
    const redirect_uri = "";

    // https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts
    const oauth2 = new google.auth.OAuth2(id, secret, redirect_uri);

    const originId = this.seek();
    const distinationId = this.seek();
    oauth2.setCredentials(t.object);

    const script = google.script({
      version: 'v1',
      auth: oauth2,
    });

    // https://googleapis.dev/nodejs/googleapis/latest/script/classes/Resource$Projects.html
    const { data } = await script.projects.getContent({ scriptId: originId });

    // https://googleapis.dev/nodejs/googleapis/latest/script/classes/Resource$Projects.html
    await script.projects.updateContent({
      scriptId: distinationId,
      requestBody: data,
    });
  
  }
  
};
