import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '../../imports/api/messages.js'; 
import './message.js';
import './body.html';
import { ReactiveDict } from 'meteor/reactive-dict';
 
Template.body.helpers({
  messages() {
  	const instance = Template.instance();
    
    return Messages.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a message into the collection
    Meteor.call('messages.insert', text);
 
    // Clear form
    target.text.value = '';
  },
});



Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('messages');
});
