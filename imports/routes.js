import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../client/ui/body.js';

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('body', { main: 'app_rootRedirector' });
  },
});