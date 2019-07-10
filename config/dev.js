"use strict";

const dev = {};

dev.PORT = process.env.PORT || 1000;
dev.IP = process.env.IP || 'localhost';

/**
 * Configuracion MongoDB
*/
dev.URL_HOST = `mongodb://${ dev.IP }:27017/cafe`;

/**
 * Configuracion Hash
 */
dev.CICLOS = 15;
dev.SECRET_TOKEN = 'D3v310p3r_2019';
dev.CADUCA = 60 * 60 * 24;

/**
 * Key Google Api
 */
dev.API_KEY_SIGN_IN = "288907806633-ukf9k7gkd02t0qnu4p5lagn1ehgm5p82.apps.googleusercontent.com";

module.exports = dev;