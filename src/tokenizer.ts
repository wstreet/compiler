import { Token } from "./token";

export class Tokenizer {
  current: number = 0;
  input: string = "";

  static singleCharacter = new Map([
    ["(", Token.l_paren],
    [")", Token.r_paren],
    ["{", Token.l_curly],
    ["}", Token.r_curly],
    ["=", Token.equal],
    [".", Token.dot],
    [";", Token.semicolon],
  ]);

  static keywords = new Map([
    ["function", Token.function_kw],
    ["const", Token.const_kw],
    ["var", Token.var_kw],
  ]);

  static isWhiteSpace(char: string): boolean {
    return /\s/.test(char);
  }
  static isAlpha(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  static isSingleCharacter(char: string): boolean {
    return Tokenizer.singleCharacter.has(char);
  }

  static getCharToken(char: string): Token {
    const builder = Tokenizer.singleCharacter.get(char);
    return builder!();
  }

  finishIdentifier(): Token {
    let name = "";

    while (Tokenizer.isAlpha(this.input[this.current])) {
      name += this.input[this.current];
      this.current++;
    }
    const builder = Tokenizer.keywords.get(name);
    if (builder) {
      return builder(); // 要么是关键字
    }
    return Token.identifier(name); // 要么是标识符
  }

  finishStringLiteral(): Token {
    let value = "";
    while (this.input[this.current] && this.input[this.current] !== "'") {
      value += this.input[this.current];
      this.current++;
    }

    if (this.input[this.current] === "'") {
      this.current++;
      return Token.string_literal(value);
    }
    throw new Error(`Unterminated string, expected a closing '`);
  }

  tokenize(input: string): Token[] {
    this.input = input;
    const tokens: Token[] = [];

    while (this.current < input.length) {
      // 取出current位置的字符
      const currentChar = input[this.current];

      // 判断是否是空格
      if (Tokenizer.isWhiteSpace(currentChar)) {
        this.current++;
        continue;
      }
      if (Tokenizer.isAlpha(currentChar)) {
        tokens.push(this.finishIdentifier());
      } else if (Tokenizer.isSingleCharacter(currentChar)) {
        tokens.push(Tokenizer.getCharToken(currentChar));
        this.current++;
      } else if (currentChar === "'") {
        this.current++;
        tokens.push(this.finishStringLiteral());
      } else {
        throw new Error(`Unknown character: ${currentChar}`);
      }
    }

    return tokens;
  }
}

export default new Tokenizer();
