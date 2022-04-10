
import tokenizer from './tokenizer'
import parser from './parser'

const code = `
function getName(name) {
  console.log(name);
}
`

// 词法分析
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

// 语法分析
const ast = parser.parse(tokens)
console.log(JSON.stringify(ast, undefined, 2))

// {
//   "type": "Program",
//   "body": [
//     {
//       "type": "FunctionDeclaration",
//       "id": {
//         "type": "Identifier"
//       },
//       "params": [
//         {
//           "type": "Identifier"
//         }
//       ],
//       "body": {
//         "type": "BlockStatement",
//         "body": [
//           {
//             "type": "ExpressionStatement",
//             "expression": {
//               "type": "CallExpression",
//               "callee": {
//                 "type": "MemberExpression",
//                 "object": {
//                   "type": "Identifier"
//                 },
//                 "property": {
//                   "type": "Identifier"
//                 },
//                 "computed": false
//               },
//               "arguments": [
//                 {
//                   "type": "Identifier"
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   ]
// }