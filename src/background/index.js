import { runtime, tabs } from 'webextension-polyfill';


console.log('background is running');

if (typeof browser !== 'undefined') {
  // Firefox
  console.log('Extension is running in Firefox');
} else if (typeof chrome !== 'undefined') {
  // Chrome
  console.log('Extension is running in Chrome');
} else {
  console.error('Unable to determine the browser');
}



runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})
