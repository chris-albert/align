const _ = require('lodash');

const splitChar = process.argv[2];
const input = process.argv[3];

let max = 0;
_.each(input.split('\n'),line => {
  if(_.includes(line,splitChar)) {
  const index = line.indexOf(splitChar);
  if(index > max) {
    max = index;
  }
}
});

const out = _.map(input.split('\n'),line => {
    if(_.includes(line,splitChar)) {
  const index = line.indexOf(splitChar);
  const diff = max - index;
  const spaces = _.fill(new Array(diff),' ').join('')
  return _.slice(line,0,index).join('') + spaces + _.slice(line,index).join('');
} else {
  return line;
}
});

console.log(out.join('\n'));