/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Messages } from '../../imports/api/messages.js';
import { withRenderedTemplate } from './test-helpers.js';
import faker from 'faker';
import './message.js';

StubCollections.stub(Messages);

Factory.define('message', Messages, {
  userId: () => faker.random.number(),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
  userName:()=> faker.lorem.word()
});

describe('message component', function () {
  beforeEach(function () {
    Template.registerHelper('_', key => key);
  });
  afterEach(function () {
    Template.deregisterHelper('_');
  });
  it('renders correctly with simple data', function () {
    const message = Factory.create('message');
    
    withRenderedTemplate('message', message, el => {

      var textTag = $(el).find('.message-text')[0];
      var renderedText = textTag.innerText;
      chai.assert.equal(renderedText, message.text);

      var userNameTag = $(el).find('.message-username')[0];
      var renderedUserName = userNameTag.innerText;
      chai.assert.equal(renderedUserName, message.userName);

    });
  });
});