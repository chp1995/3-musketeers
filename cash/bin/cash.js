/**
 * The program's entry file is used to parse user commands and feedback
 * @module cash/cash
 * @author [Cui Haipeng]代码的作者信息。
 * @version v2.0
 */

'use strict';

const got = require('got');
const money = require('money');
const chalk = require('chalk');
const ora = require('ora');

/**
 * @file Storage the currencies abbreviations and it's meaning
 */
const currencies = require('../lib/currencies.json');


const {API} = require('./constants');

const cash = async command => {
	/**
	 * @param {Object} command the command need to be parsed
	 */
	const {amount} = command;
	const from = command.from.toUpperCase();
	const to = command.to.filter(item => item !== from).map(item => item.toUpperCase());

	console.log();

	/**
	 * when loading the data or calculating, display the prograss.
	 */
	const loading = ora({
		text: 'Converting...',
		color: 'green',
		spinner: {
			interval: 150,
			frames: to
		}
	});

	loading.start();
 
    /**
	 * Send a request to the API and handle the base and rates to calculate the result
	 * @param {got~response} cb - The callback that handles the response.
	 */
	await got(API, {
		json: true
	}).then(response => {
		money.base = response.body.base;
		money.rates = response.body.rates;

		 /**
		  * The values in each list are traversed and compared with the request data,
		  *  if any, the calculations are made, otherwise a warn is emitted. 
		 */
		to.forEach(item => {
			if (currencies[item]) {
				loading.succeed(`${chalk.green(money.convert(amount, {from, to: item}).toFixed(3))} ${`(${item})`} ${currencies[item]}`);
			} else {
				loading.warn(`${chalk.yellow(`The "${item}" currency not found `)}`);
			}
		});

		console.log(chalk.underline.gray(`\nConversion of ${chalk.bold(from)} ${chalk.bold(amount)}`));
	}).catch(error => {
		/**
		 * If the command is incorrect, an exception is thrown
		 */
		if (error.code === 'ENOTFOUND') {
			loading.fail(chalk.red('Please check your internet connection!\n'));
		} else {
			loading.fail(chalk.red(`Internal server error :(\n${error}`));
		}
		process.exit(1);
	});
};

module.exports = cash;
