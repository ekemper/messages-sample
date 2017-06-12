// This file will be auto-imported in the app-test context,
// ensuring the method is always available
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';
import { denodeify } from '../utils/denodeify';
import faker from 'faker';
import { Messages } from '../../imports/api/messages.js';


Factory.define('message', Messages, {
  userId: () => faker.random.number(),
  text: () => faker.lorem.sentence(),
  createdAt: () => new Date(),
  userName:()=> faker.lorem.word()
});

// Remember to double check this is a test-only file before
// adding a method like this!
Meteor.methods({
  generateFixtures() {
    resetDatabase();
    _.times(3, () => Factory.create('message'));
  },
});
let generateData;
if (Meteor.isClient) {
  // Create a second connection to the server to use to call
  // test data methods. We do this so there's no contention
  // with the currently tested user's connection.
  const testConnection = Meteor.connect(Meteor.absoluteUrl());
  generateData = denodeify((cb) => {
    testConnection.call('generateFixtures', cb);
  });
}
export { generateData };