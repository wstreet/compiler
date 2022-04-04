"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = void 0;
const token_1 = require("./token");
class Tokenizer {
    constructor() {
        this.current = 0;
        this.input = "";
    }
    static isWhiteSpace(char) {
        return /\s/.test(char);
    }
    static isAlpha(char) {
        return /[a-zA-Z]/.test(char);
    }
    static isSingleCharacter(char) {
        return Tokenizer.singleCharacter.has(char);
    }
    static getCharToken(char) {
        const builder = Tokenizer.singleCharacter.get(char);
        return builder();
    }
    finishIdentifier() {
        let name = "";
        while (Tokenizer.isAlpha(this.input[this.current])) {
            name += this.input[this.current];
            this.current++;
        }
        const builder = Tokenizer.keywords.get(name);
        if (builder) {
            return builder(); // 要么是关键字
        }
        return token_1.Token.identifier(name); // 要么是标识符
    }
    finishStringLiteral() {
        let value = "";
        while (this.input[this.current] && this.input[this.current] !== "'") {
            value += this.input[this.current];
            this.current++;
        }
        if (this.input[this.current] === "'") {
            this.current++;
            return token_1.Token.string_literal(value);
        }
        throw new Error(`Unterminated string, expected a closing '`);
    }
    tokenize(input) {
        this.input = input;
        const tokens = [];
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
            }
            else if (Tokenizer.isSingleCharacter(currentChar)) {
                tokens.push(Tokenizer.getCharToken(currentChar));
                this.current++;
            }
            else if (currentChar === "'") {
                this.current++;
                tokens.push(this.finishStringLiteral());
            }
            else {
                throw new Error(`Unknown character: ${currentChar}`);
            }
        }
        return tokens;
    }
}
exports.Tokenizer = Tokenizer;
Tokenizer.singleCharacter = new Map([
    ["(", token_1.Token.l_paren],
    [")", token_1.Token.r_paren],
    ["{", token_1.Token.l_curly],
    ["}", token_1.Token.r_curly],
    ["=", token_1.Token.equal],
    [".", token_1.Token.dot],
    [";", token_1.Token.semicolon],
]);
Tokenizer.keywords = new Map([
    ["function", token_1.Token.function_kw],
    ["const", token_1.Token.const_kw],
    ["var", token_1.Token.var_kw],
]);
exports.default = new Tokenizer();
