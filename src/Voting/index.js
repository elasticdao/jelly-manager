// Create voting mechanism which will allow, anyone to propose new channel or category. everyone should have a right to propose, accept or decline the proposal.
// Start writing the scrypt.
// Receiving a call
// Asking the question about the action => voting on, creating a channel or creating a category

// import config from './config';

// const emoji = {
//     '1': '1️⃣',
//     '2': '2️⃣',
// };

// const emojiMap = {};
// Object.keys(emoji).forEach((key) => {
// 	emojiMap[emoji[key]] = key;
// });

// export default class VotingManager {
// 	constructor(channel) {
// 		this.channel = channel;
// 		this.inputDelay = 6000;
// 		this.renderDealy = 2000;
// 		this.stage = '1';
// 		setTimeout(() => this.start(), 0);
// 	}

// 	async start() {
// 		const { script, reactions, result } = config[this.stage];

// 		const parts = [ ...script ];
// 		parts.reverse();

// 		await this.renderScript([], ...parts);

// 		const filterSet = [];

// 		if(reactions.length > 1) {
// 			const message = await this.channel.send('Click on the numbers below to vote for the proposal');

// 			for (i = 0; i < reactions.length; i += 1) {
// 				const emoji = emoji[reactions[i]];
// 				await message.react(emoji);
// 				filterSet.push(emoji);
// 			}

// 			setTimeout(() => this.collectResults(message, filterSet), this.inputDelay);
// 		} else {
// 			if (reactions.length === 1) {
// 				this.channel.send('Only one vote has been registered, which means this voting will not be executed.');
// 			}
// 		}
// 	}

// 	async collectResults(message, filterSet) {
// 		const { result } = config[this.stage];

// 		const collected = Array.from(message.reactions.cache.values()).filter((reactions) => {
// 			return filterSet.includes(reaction.emoji.name);
// 		});
// 	}

// 	renderScript(...parts) {
//     const self = this;
//     return new Promise((resolve) => {
//       let part = parts.pop();

//       if (Array.isArray(part)) {
//         console.log('part is Array', part)
//         part = [ '-----', ...part ].join('\n');
//       } else {
//         console.log('part is not Array', part)
//       }

//       self.channel.send(part).then(() => {
//         if (parts.length === 0) {
//           resolve();
//         } else {
//           setTimeout(() => {
//             self.renderScript(...parts).then(resolve);
//           }, self.renderDelay);
//         }
//       }, resolve);
//     });
//   }
// }