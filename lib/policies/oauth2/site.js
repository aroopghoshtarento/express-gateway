'use strict';

const passport = require('passport');
const path = require('path');

module.exports.loginForm = (request, response) => response.render(path.join(__dirname, 'views/login', { app_url: process.env.APPLICATION_URL ? process.env.APPLICATION_URL : '/' }));

module.exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login?error=true' });

module.exports.logout = (request, response) => {
  request.logout();
  response.clearCookie("connect.sid")
  if (!request.query.returnTo) {
    return response.redirect('/'); // TODO: implement settings section for default view path and return redirects
  }
  const returnUrl = decodeURI(request.query.returnTo);
  return response.redirect(returnUrl);
  // response.redirect('/');
};

module.exports.forgotPassword = (request, response) => {
  let path = process.env.APPLICATION_URL ? (process.env.APPLICATION_URL + '/forgot-password') : '/forgot-password';
  return response.redirect(path+'');
}

module.exports.redirect = (request, response) => {
  response.redirect(process.env.APPLICATION_URL ? process.env.APPLICATION_URL : '/');
}


module.exports.notFound = (request, response) => {
  return response.redirect('http://developers.anuvaad.org/');
};
