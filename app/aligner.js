const _ = require('lodash');


function charIndexes(line, searches) {
  return _.filter(_.map(searches, search => {
    let indexOf = line.indexOf(search);
    if(indexOf >= 0) {
      return {
        index: indexOf,
        search: search
      }
    }
    return undefined;
  }),i => !_.isUndefined(i));
}

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

function mergeStack(stack) {
  //First we need to find max index of each split
  const maxIndexes = [];
  for(let i = 0 ;i < stack.length;i++) {
    maxIndexes[i] = [];

    for(let l = 0;l < stack[i].splits.length;l++) {
      const split = stack[i].splits[l];
     
    }
  }
  return _.map(stack, item => {
    return item.line + '-';
  });
}

function stack(splitChars, input) {
  const lines = input.split('\n');
  const accu = [];
  let stack = [];
  _.each(lines,line => {
    const splits = charIndexes(line, splitChars);
    if(_.isEmpty(splits)) {
      if(_.isEmpty(stack)) {
        //If we didn't find split chars and no stack then continue on with line unchanged
      } else {
        //If we didn't find split chars but we do have a stack, we need to flush the stack to create lines
        //then continue on
        _.each(mergeStack(stack), l => accu.push(l));
      }
      accu.push(line);
      stack = [];
    } else {
      //If we did find split chars then we need to add to stack and continue
      stack.push({line: line, splits: splits});
    }
  });
  //If we had a stack at the end then we need to flush
  if(!_.isEmpty(stack)) {
    _.each(mergeStack(stack), l => accu.push(l));
  }
  return accu.join('\n');
}

exports.charIndexes = charIndexes;
exports.align = function(splitChars, text) {
  if(_.isEmpty(splitChars)) {
    return text;
  }
  // return dumbWay(splitChars[0],text);
  return stack(splitChars, text);
};