"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = __importDefault(require("./tokenizer"));
// import parser from './parser'
const code = `
function getName() {
  const name = 'wstreet';
  console.log(name);
}
`;
const tokens = tokenizer_1.default.tokenize(code);
console.log(tokens);
// [
//   Token { type: 'FUNCTION_KW', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'getName' },
//   Token { type: 'L_PAREN', name: undefined, value: undefined },
//   Token { type: 'R_PAREN', name: undefined, value: undefined },
//   Token { type: 'L_CURLY', name: undefined, value: undefined },
//   Token { type: 'CONST_KW', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'name' },
//   Token { type: 'EQUAL', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'wstreet' },
//   Token { type: 'IDENTIFIER', name: undefined, value: '' }, // TODO:
//   Token { type: 'SEMICOLON', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'console' },
//   Token { type: 'DOT', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'log' },
//   Token { type: 'L_PAREN', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'name' },
//   Token { type: 'R_PAREN', name: undefined, value: undefined },
//   Token { type: 'SEMICOLON', name: undefined, value: undefined },
//   Token { type: 'R_CURLY', name: undefined, value: undefined }
// ]
// const ast = parser.parse(tokens)
