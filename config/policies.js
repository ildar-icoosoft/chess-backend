/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'view-faq': true,
  'view-contact': true,
  'legal/view-terms': true,
  'legal/view-privacy': true,
  'deliver-contact-form-message': true,

  'game/find': true,
  'game/findOne': true,
  'seek/find': true,
  'user/find': true,

  'challenge/ai': true, // @todo. I accept unauthorized request to this method, because I need to return custom 401 error message
  'board/create-seek': true, // @todo. I accept unauthorized request to this method, because I need to return custom 401 error message
  'board/accept-seek': true, // @todo. I accept unauthorized request to this method, because I need to return custom 401 error message

  'board/create-chat-message': true, // @todo. I accept unauthorized request to this method, because I need to return custom 401 error message
  'board/get-chat-messages': true,
};
