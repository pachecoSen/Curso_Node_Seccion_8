"use strict";

const { appendFile } = require('fs'),
    { Terminal:terminal } = require('terminal-kit'),
    empty = require('is-empty');

module.exports = (file, txt) => {
    txt = `[${ new Date() }] ${txt}\n`;
    appendFile(`${ file }.log`, txt, err => {
        if(!empty(err))
            terminal().red(`${ '\n' }${err}`)
    });
};