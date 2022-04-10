"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.NodeType = void 0;
const token_1 = require("./token");
var NodeType;
(function (NodeType) {
    NodeType["Program"] = "Program";
    NodeType["FunctionDeclaration"] = "FunctionDeclaration";
    NodeType["Identifier"] = "Identifier";
    NodeType["BlockStatement"] = "BlockStatement";
    NodeType["ExpressionStatement"] = "ExpressionStatement";
    NodeType["CallExpression"] = "CallExpression";
    NodeType["MemberExpression"] = "MemberExpression";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
class Parser {
    constructor() {
        this.current = 0;
        this.tokens = [];
    }
    parse(tokens) {
        this.tokens = tokens;
        return this.parseProgram();
    }
    parseProgram() {
        const programNode = { type: NodeType.Program, body: [] };
        //
        while (!this.isAtEnd()) {
            programNode.body.push(this.statement());
        }
        return programNode;
    }
    /**
     * -----------------------------Builders---------------------
     *
     */
    statement() {
        if (this.check(token_1.TokenType.FUNCTION_KW)) {
            return this.declaration();
        }
        else if (this.check(token_1.TokenType.L_CURLY)) {
            return this.blockStatement();
        }
        return this.expressionStatement();
    }
    declaration() {
        return this.functionDeclaration();
    }
    // function hello(x) {
    // }
    functionDeclaration() {
        this.consume(token_1.TokenType.FUNCTION_KW);
        const id = this.identifier();
        this.consume(token_1.TokenType.L_PAREN);
        const params = this.identifier();
        this.consume(token_1.TokenType.R_PAREN);
        const body = this.blockStatement();
        return {
            type: NodeType.FunctionDeclaration,
            id,
            params: [params],
            body,
        };
    }
    identifier() {
        const { name } = this.consume(token_1.TokenType.IDENTIFIER);
        return { type: NodeType.Identifier, name: name };
    }
    blockStatement() {
        this.consume(token_1.TokenType.L_CURLY);
        const statements = [];
        this.consumeUntil(token_1.TokenType.R_CURLY, () => {
            statements.push(this.statement());
        });
        return { type: NodeType.BlockStatement, body: statements };
    }
    expressionStatement() {
        const expr = this.expression();
        this.consume(token_1.TokenType.SEMICOLON);
        return { type: NodeType.ExpressionStatement, expression: expr };
    }
    expression() {
        let expr = this.identifier();
        while (true) {
            if (this.match(token_1.TokenType.DOT)) {
                expr = this.memberExpression(expr);
            }
            else if (this.match(token_1.TokenType.L_PAREN)) {
                expr = this.callExpression(expr);
            }
            else {
                break;
            }
        }
        return expr;
    }
    memberExpression(expr) {
        const property = this.identifier();
        return {
            type: NodeType.MemberExpression,
            object: expr,
            property,
            computed: false,
        };
    }
    callExpression(callee) {
        const args = [];
        this.consumeUntil(token_1.TokenType.R_PAREN, () => {
            args.push(this.expression());
        });
        return {
            type: NodeType.CallExpression,
            callee,
            arguments: args,
        };
    }
    /**
     * --------------------------utils---------------------------
     *
     */
    // returns current token without consuming it
    peek() {
        return this.tokens[this.current];
    }
    // Consumes and returns the current token
    consume(type) {
        if (this.check(type)) {
            return this.advance();
        }
        throw new SyntaxError(`Unexpected token: Expected ${type}, found ${this.peek().type}`);
    }
    // Consumes and returns the current token
    advance() {
        this.current++;
        return this.previous();
    }
    check(type) {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type === type;
    }
    // Checks if we've consumed all the tokens
    isAtEnd() {
        return this.current >= this.tokens.length;
    }
    // returns the previous token
    previous() {
        return this.tokens[this.current - 1];
    }
    consumeUntil(type, callback) {
        while (!this.isAtEnd() && !this.match(type)) {
            callback();
        }
        // 如果查找到结尾都没找到 }, 抛出错误
        if (this.isAtEnd() && this.previous().type !== type) {
            throw new SyntaxError(`Unexpected end of file. Expected ${type}`);
        }
    }
    match(...types) {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
}
exports.Parser = Parser;
exports.default = new Parser();
