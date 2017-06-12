import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../../imports/api/messages.js';
import './message.html';

Template.message.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

// Template.message.events({
//   'click .delete'() {
//     Meteor.call('messages.remove', this._id);
//   },
// });

/*
  -- making a direct call to the serverside collection to remove a document.
  -- note the explicit 'allow' statement in ../api/messages.js
 */
Template.message.events({
  'click .delete'(event) {
    event.preventDefault();
    Messages.remove(this._id);
  }
});
