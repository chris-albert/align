const _ = require('lodash');


function dumbWay(splitChar,input) {
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
      const spaces = _.fill(new Array(diff),' ').join('');
      return _.slice(line,0,index).join('') + spaces + _.slice(line,index).join('');
    } else {
      return line;
    }
  });
  return out.join('\n');
}

exports.align = function(splitChars, text) {
  if(_.isEmpty(splitChars)) {
    return text;
  }
  return dumbWay(splitChars[0],text);
};