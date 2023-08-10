import moment from 'moment';
import mongoose from 'mongoose'
import configService from '../utils/config';
import chalk from 'chalk';

const MONGO_URI = process.env.MONGO_URI!

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  )
}

mongoose.connect(MONGO_URI, {
})

mongoose.connection.on('error', (error) => {
	const date = moment().format('LLLL');
	const msg = {
		error: error.message,
		client: 'MongoDB',
		date
	};
	console.log(chalk.red(JSON.stringify(msg)));
});
// mongoose.connection.on('connected', () => {
// 	const time = moment(new Date().getTime()).format('LLLL');
// 	logger.info({
// 		message: 'Mongoose connected',
// 		timestamp: time,
// 		level: 'info',
// 		service: 'Mongoose',
// 		environment: envConfig.environment,
// 		client: 'MongoDB'
// 	});
// });
mongoose.connection.once('open', () => {
	const date = moment().format('LLL');
	const msg = {
		message: 'Mongodb connection established',
		timestamp: date,
		client: 'MongoDB',
		level: 'info',
		service: 'Mongoose',
		environment: configService.getKey('NODE_ENV')
	};
	console.info(msg);
});
mongoose.connection.on('disconnected', () => {
	const date = moment().format('LLLL');
	const msg = {
		message: 'Disconnected from MongoDB',
		timestamp: date,
		client: 'MongoDB',
		level: 'error',
		service: 'Mongoose',
		environment: configService.getKey('NODE_ENV')
	};
	console.error(chalk.red(JSON.stringify(msg)));
});

export default mongoose;