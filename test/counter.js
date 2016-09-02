import 'jsdom-global/register';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import m from 'mithril';
import mq from 'mithril-query';

import Counter from '../src/components/counter/counter';

describe('Counter', () => {

  before(() =>{

  });

  describe('view', () => {
    describe('when initialized', () => {
      it('renders a count of zero', () => {
        const output = mq(m(Counter));
        expect(output.first('span')).to.have.property('text').and.equal(0);
      });
    });

    describe('when increment button clicked twice', () => {
      it('renders a count of two', () => {
        const output = mq(m(Counter));

        output.click('.increment');
        output.click('.increment');
        expect(output.first('span')).to.have.property('text').and.equal(2);
      });
    });

    describe('when decrement button clicked twice', () => {
      it('renders a count of negative two', () => {
        const output = mq(m(Counter));

        output.click('.decrement');
        output.click('.decrement');
        expect(output.first('span')).to.have.property('text').and.equal(-2);
      });
    });

    describe('when reset button clicked', () => {
      it('renders a count of zero', () => {
        const output = mq(m(Counter));

        output.click('.increment');
        output.click('.increment');
        output.click('.reset');
        expect(output.first('span')).to.have.property('text').and.equal(0);
      });
    });
  });
})
