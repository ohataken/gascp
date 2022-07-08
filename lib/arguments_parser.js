const google = require('@googleapis/script');

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

    if (this.peek() === "showauthurl") {
      return this.parseAuthorization();
    } else if (this.peek() === "enterauthcode") {
      return this.parseAuthorization2();
    } else {
      throw 'no command';
    }
  }

  async parseShowAuthorizationUrl() {
    this.seek();

    const id = this.seek();
    const secret = this.seek();
    const redirect_uri = this.seek();

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

    const id = this.seek();
    const secret = this.seek();
    const redirect_uri = this.seek();
    const code = this.seek();

    // https://github.com/googleapis/google-auth-library-nodejs/blob/main/src/auth/oauth2client.ts
    const oauth2 = new google.auth.OAuth2(id, secret, redirect_uri);
    const { tokens } = oauth2.getToken(code);

    console.log(tokens);
  }
  
};