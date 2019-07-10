"use strict";

const {OAuth2Client} = require('google-auth-library'),
    { pick } = require('underscore');

module.exports = async (audience, idToken) => {
    const client = new OAuth2Client(audience);
    const ticket = await client.verifyIdToken({ idToken, audience });
    return pick(ticket.getPayload(), 'name', 'email', 'picture');
};