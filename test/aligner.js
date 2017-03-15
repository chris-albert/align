
const Aligner = require('../app/aligner.js');
const expect  = require("chai").expect;

function arrToMultiline(arr) {
  return arr.join('\n');
}

describe('align', function () {
  describe('aligns nothing', function () {
    describe('with single align char', function () {
      it('if no align chars', function () {
        expect(Aligner.align([], 'foo')).to.equal('foo');
      });
      it('if only single line of text', function () {
        const input = 'foo = bar';
        expect(Aligner.align(['='], input)).to.equal(input);
      });
      it('if multi line already aligned', function () {
        const input = arrToMultiline([
          'foo = bar',
          'fab = baz'
        ]);
        expect(Aligner.align(['='], input)).to.equal(input);
      });
      // it('if split char is split by line with no split char', function () {
      //   const input  = arrToMultiline([
      //     'foo = bar',
      //     'somthing',
      //     'foofoo = barbar',
      //     'hey man, what\'s up'
      //   ]);
      //   const output = arrToMultiline([
      //     'foo = bar',
      //     'somthing',
      //     'foofoo = barbar',
      //     'hey man, what\'s up'
      //   ]);
      //   expect(Aligner.align(['='], input)).to.equal(output);
      // });
    });
    describe('aligns', function () {
      it('aligns equals', function () {
        const input  = arrToMultiline([
          'foo = bar',
          'foofoo = barbar'
        ]);
        const output = arrToMultiline([
          'foo    = bar',
          'foofoo = barbar'
        ]);
        expect(Aligner.align(['='], input)).to.equal(output);
      });
      it('aligns equals, but not lines without equals', function () {
        const input  = arrToMultiline([
          'somthing',
          'foo = bar',
          'foofoo = barbar',
          'hey man, what\'s up'
        ]);
        const output = arrToMultiline([
          'somthing',
          'foo    = bar',
          'foofoo = barbar',
          'hey man, what\'s up'
        ]);
        expect(Aligner.align(['='], input)).to.equal(output);
      });
    });
  })
});

describe('charIndexes', function() {
  it('return empty if not found', function () {
    expect(Aligner.charIndexes('asdfasdffoo', ['baz'])).to.eql([])
  });
  it('return multi char index', function () {
    expect(Aligner.charIndexes('asdfasdffoo', ['foo'])).to.eql([{
      index: 8,
      search: 'foo'
    }])
  });
  it('return multi char indexs', function () {
    expect(Aligner.charIndexes('hey there foo and then bar', ['foo','bar'])).to.eql([
      {
        index: 10,
        search: 'foo'
      },
      {
        index: 23,
        search: 'bar'
      }
    ])
  });
});
