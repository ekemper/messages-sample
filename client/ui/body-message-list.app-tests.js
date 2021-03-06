/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { DDP } from 'meteor/ddp-client';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { assert } from 'meteor/practicalmeteor:chai';
import { Promise } from 'meteor/promise';
import { $ } from 'meteor/jquery';
import { denodeify } from '../../imports/utils/denodeify';
import { generateData } from '../../imports/api/generate-data.app-tests.js';
import { Messages } from '../../imports/api/messages.js';
// Utility -- returns a promise which resolves when all subscriptions are done
const waitForSubscriptions = () => new Promise(resolve => {
  const poll = Meteor.setInterval(() => {
    if (DDP._allSubscriptionsReady()) {
      Meteor.clearInterval(poll);
      resolve();
    }
  }, 200);
});
// Tracker.afterFlush runs code when all consequent of a tracker based change
//   (such as a route change) have occured. This makes it a promise.
const afterFlushPromise = denodeify(Tracker.afterFlush);
if (Meteor.isClient) {
  describe('data available when routed', () => {
    // First, ensure the data that we expect is loaded on the server
    //   Then, route the app to the homepage
    beforeEach(() => generateData()
      .then(() => FlowRouter.go('/'))
      .then(waitForSubscriptions)
    );
    describe('when logged out', () => {
      it('has all messages at homepage', () => {
        assert.equal(Messages.find().count(), 3);
      });
    });
  });
}
