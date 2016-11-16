const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Olá');
console.log('Seu ano de nascimento?');
rl.question('', (year) => {
  console.log('Sua idade é: ' + (2016-year));

  rl.close();
});

