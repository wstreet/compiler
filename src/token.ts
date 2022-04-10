export enum TokenType {
  FUNCTION_KW = "FUNCTION_KW",
  CONST_KW = "CONST_KW",
  VAR_KW = "VAR_KW",
  IDENTIFIER = "IDENTIFIER",
  SEMICOLON = "SEMICOLON",
  L_PAREN = "L_PAREN",
  R_PAREN = "R_PAREN",
  L_CURLY = "L_CURLY",
  R_CURLY = "R_CURLY",
  STRING_LITERAL = "STRING_LITERAL",
  DOT = "DOT",
  EQUAL = "EQUAL",
}

export interface IToken {
  type: TokenType;
  value?: string;
  name?: string;
}

export class Token implements IToken {
  type: TokenType;
  value?: string;
  name?: string;

  constructor(type: TokenType, value?: string, name?: string) {
    this.type = type;
    this.name = name;
    this.value = value;
  }

  static function_kw(): Token {
    return new Token(TokenType.FUNCTION_KW);
  }

  static const_kw(): Token {
    return new Token(TokenType.CONST_KW);
  }

  static var_kw(): Token {
    return new Token(TokenType.VAR_KW);
  }
  static semicolon(): Token {
    return new Token(TokenType.SEMICOLON);
  }
  static l_paren(): Token {
    return new Token(TokenType.L_PAREN);
  }
  static r_paren(): Token {
    return new Token(TokenType.R_PAREN);
  }
  static l_curly(): Token {
    return new Token(TokenType.L_CURLY);
  }
  static r_curly(): Token {
    return new Token(TokenType.R_CURLY);
  }
  static dot(): Token {
    return new Token(TokenType.DOT);
  }
  static equal(): Token {
    return new Token(TokenType.EQUAL)
  }
  static identifier(name: string): Token {
    return new Token(TokenType.IDENTIFIER, undefined, name);
  }
  static string_literal(value: string): Token {
    return new Token(TokenType.STRING_LITERAL, value);
  }
}

