import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find({}, { sort: { createdAt: -1 } });
    // return Messages.find({
    //   $or: [
    //     { private: { $ne: true } },
    //     { owner: this.userId },
    //   ],
    // });
  });
}
 
Meteor.methods({
  'messages.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Messages.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'messages.remove'(messageId) {
    check(messageId, String);
 
    const message = Messages.findOne(messageId);
    if (message.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Messages.remove(messageId);
  },
  // 'message.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
 
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== Meteor.userId()) {
  //     // If the task is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }

  //   Tasks.update(taskId, { $set: { checked: setChecked } });
  // },
  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);
 
  //   const task = Tasks.findOne(taskId);
 
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== Meteor.userId()) {
  //     throw new Meteor.Error('not-authorized');
  //   }
 
  //   Tasks.update(taskId, { $set: { private: setToPrivate } });
  // },
});