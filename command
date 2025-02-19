#!/usr/bin/env node
require('dotenv').config()
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv)).commandDir('./commands').demandCommand(1).help().parse()
