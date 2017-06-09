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
  // 'click .toggle-checked'() {
  //   // Set the checked property to the opposite of its current value
  //   // Tasks.update(this._id, {
  //   //   $set: { checked: ! this.checked },
  //   // });
  //   Meteor.call('tasks.setChecked', this._id, !this.checked);
  // },
  'click .delete'() {
    // Tasks.remove(this._id);
    Meteor.call('messages.remove', this._id);
  },
});