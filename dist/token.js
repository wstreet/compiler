"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType["FUNCTION_KW"] = "FUNCTION_KW";
    TokenType["CONST_KW"] = "CONST_KW";
    TokenType["VAR_KW"] = "VAR_KW";
    TokenType["IDENTIFIER"] = "IDENTIFIER";
    TokenType["SEMICOLON"] = "SEMICOLON";
    TokenType["L_PAREN"] = "L_PAREN";
    TokenType["R_PAREN"] = "R_PAREN";
    TokenType["L_CURLY"] = "L_CURLY";
    TokenType["R_CURLY"] = "R_CURLY";
    TokenType["STRING_LITERAL"] = "STRING_LITERAL";
    TokenType["DOT"] = "DOT";
    TokenType["EQUAL"] = "EQUAL";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
class Token {
    constructor(type, value, name) {
        this.type = type;
        this.name = name;
        this.value = value;
    }
    static function_kw() {
        return new Token(TokenType.FUNCTION_KW);
    }
    static const_kw() {
        return new Token(TokenType.CONST_KW);
    }
    static var_kw() {
        return new Token(TokenType.VAR_KW);
    }
    static semicolon() {
        return new Token(TokenType.SEMICOLON);
    }
    static l_paren() {
        return new Token(TokenType.L_PAREN);
    }
    static r_paren() {
        return new Token(TokenType.R_PAREN);
    }
    static l_curly() {
        return new Token(TokenType.L_CURLY);
    }
    static r_curly() {
        return new Token(TokenType.R_CURLY);
    }
    static dot() {
        return new Token(TokenType.DOT);
    }
    static equal() {
        return new Token(TokenType.EQUAL);
    }
    static identifier(name) {
        return new Token(TokenType.IDENTIFIER, name);
    }
    static string_literal(value) {
        return new Token(TokenType.STRING_LITERAL, undefined, value);
    }
}
exports.Token = Token;
