
import tokenizer from './tokenizer'
// import parser from './parser'

const code = `
function getName() {
  const name = 'wstreet';
  console.log(name);
}
`

const tokens = tokenizer.tokenize(code)
console.log(tokens)

// [
//   Token { type: 'FUNCTION_KW', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'getName' },
//   Token { type: 'L_PAREN', name: undefined, value: undefined },
//   Token { type: 'R_PAREN', name: undefined, value: undefined },
//   Token { type: 'L_CURLY', name: undefined, value: undefined },
//   Token { type: 'CONST_KW', name: undefined, value: undefined },
//   Token { type: 'IDENTIFIER', name: undefined, value: 'name' },
//   Token { type: 'EQUAL', name: undefined, value: undefined },
//   Token { type: 'STRING_LITERAL', name: 'wstreet', value: undefined },
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