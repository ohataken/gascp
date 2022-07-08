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
    if (this.hasNext()) {
      return this.args[this.index++];
    } else {
      throw 'no arg';
    }
  }

  parse() {
    this.seek();
    this.seek();
  }
  
};
