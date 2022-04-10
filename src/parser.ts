import { Token, TokenType } from "./token";

export enum NodeType {
  Program = "Program",
  FunctionDeclaration = "FunctionDeclaration",
  Identifier = "Identifier",
  BlockStatement = "BlockStatement",
  ExpressionStatement = "ExpressionStatement",
  CallExpression = "CallExpression",
  MemberExpression = "MemberExpression",
}

export interface Node {
  type: string;
}
interface Statement extends Node {}
interface Expression extends Node {}
interface Pattern extends Node {}
interface Declaration extends Node {}
interface BlockStatement extends Statement {
  type: NodeType.BlockStatement;
  body: Statement[];
}

interface FunctionBody extends BlockStatement {
  body: Statement[];
}
interface Identifier extends Node {
  type: NodeType.Identifier;
  name: string;
}

interface Function extends Node {
  id: Identifier | null;
  params: Pattern[];
  body: FunctionBody;
}

interface FunctionDeclaration extends Declaration, Function {
  type: NodeType.FunctionDeclaration;
}
interface MemberExpression extends Expression, Pattern {
  type: NodeType.MemberExpression;
  object: Expression;
  property: Expression;
  computed: boolean;
}

interface CallExpression extends Expression {
  type: NodeType.CallExpression;
  callee: Expression;
  arguments: Expression[];
}

interface ExpressionStatement extends Statement {
  type: NodeType.ExpressionStatement;
  expression: Expression;
}

export interface Program extends Node {
  type: NodeType.Program;
  body: Statement[];
}
export class Parser {
  private current: number = 0;
  private tokens: Token[] = [];

  public parse(tokens: Token[]): Program {
    this.tokens = tokens;
    return this.parseProgram();
  }
  private parseProgram(): Program {
    const programNode: Program = { type: NodeType.Program, body: [] };
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

   private statement(): Statement {
    if (this.check(TokenType.FUNCTION_KW)) {
      return this.declaration();
    } else if (this.check(TokenType.L_CURLY)) {
      return this.blockStatement();
    }
    return this.expressionStatement();
  }

  private declaration(): Declaration {
    return this.functionDeclaration();
  }

  // function hello(x) {

  // }
  private functionDeclaration(): FunctionDeclaration {
    this.consume(TokenType.FUNCTION_KW);
    const id = this.identifier();
    this.consume(TokenType.L_PAREN);
    const params = this.identifier();
    this.consume(TokenType.R_PAREN);
    const body = this.blockStatement();
    return {
      type: NodeType.FunctionDeclaration,
      id,
      params: [params],
      body,
    };
  }

  private identifier(): Identifier {
    const { name } = this.consume(TokenType.IDENTIFIER);
    return { type: NodeType.Identifier, name: name! };
  }

  private blockStatement(): BlockStatement {
    this.consume(TokenType.L_CURLY);
    const statements: Statement[] = [];
    this.consumeUntil(TokenType.R_CURLY, () => {
      statements.push(this.statement());
    });

    return { type: NodeType.BlockStatement, body: statements };
  }

  private expressionStatement(): ExpressionStatement {
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON);
    return { type: NodeType.ExpressionStatement, expression: expr };
  }

  private expression(): Expression {
    let expr: Expression = this.identifier();
    while (true) {
      if (this.match(TokenType.DOT)) {
        expr = this.memberExpression(expr);
      } else if (this.match(TokenType.L_PAREN)) {
        expr = this.callExpression(expr);
      } else {
        break;
      }
    }
    return expr;
  }

  private memberExpression(expr: Expression): MemberExpression {
    const property = this.identifier();
    return {
      type: NodeType.MemberExpression,
      object: expr,
      property,
      computed: false,
    };
  }

  private callExpression(callee: Expression): CallExpression {
    const args: Expression[] = [];
    this.consumeUntil(TokenType.R_PAREN, () => {
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
  private peek() {
    return this.tokens[this.current];
  }
  // Consumes and returns the current token
  private consume(type: TokenType) {
    if (this.check(type)) {
      return this.advance();
    }

    throw new SyntaxError(
      `Unexpected token: Expected ${type}, found ${this.peek().type}`
    );
  }

  // Consumes and returns the current token
  private advance() {
    this.current++;
    return this.previous();
  }

  private check(type: TokenType) {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().type === type;
  }
  // Checks if we've consumed all the tokens
  private isAtEnd() {
    return this.current >= this.tokens.length;
  }
  // returns the previous token
  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consumeUntil(type: TokenType, callback: () => void) {
    while (!this.isAtEnd() && !this.match(type)) {
      callback();
    }
    // 如果查找到结尾都没找到 }, 抛出错误
    if (this.isAtEnd() && this.previous().type !== type) {
      throw new SyntaxError(`Unexpected end of file. Expected ${type}`);
    }
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }
}


export default new Parser()