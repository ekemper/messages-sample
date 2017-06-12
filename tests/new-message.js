/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
// These are Chimp globals
/* globals browser assert server */
function countMessages() {
  browser.waitForExist('.message');
  const elements = browser.elements('.message');
  return elements.value.length;
};
describe('main page', function () {
  beforeEach(function () {
    browser.url('http://localhost:3000');
    server.call('generateFixtures');
  });
  it('can create a message @watch', function () {
    const initialCount = countMessages();
    
    //TODO:

    // sigin ??

    // enter text 

    //hit enter to submit...

    assert.equal(countMessages(), initialCount + 1);
  });
});