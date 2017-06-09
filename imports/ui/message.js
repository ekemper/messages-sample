import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Message } from '../api/messages.js';
import './message.html';
 
Template.message.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.message.events({
  'click .delete'() {
    Meteor.call('messages.remove', this._id);
  },
});