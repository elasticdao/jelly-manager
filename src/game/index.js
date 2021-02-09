import config from './config';

const emoji = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
};

const emojiMap = {};
Object.keys(emoji).forEach((key) => {
  emojiMap[emoji[key]] = key;
});

export default class JellyJamGame {
  constructor(channel) {
    this.channel = channel;
    this.inputDelay = 12000;
    this.renderDelay = 2000;
    this.stage = '1';
    setTimeout(() => this.start(), 0);
  }

  static start(channel) {
    const game = new this(channel);
    console.log('started game', game);
  }

  async start() {
    const { reactions, result, script } = config[this.stage];

    const parts = [...script];
    parts.reverse();

    await this.renderScript([], ...parts);
    console.log('here');

    const filterSet = [];

    if (reactions.length > 1) {
      const message = await this.channel.send('Click the numbers below to vote on the next action');

      for (let i = 0; i < reactions.length; i += 1) {
        const emoj = emoji[reactions[i]];
        await message.react(emoj);
        filterSet.push(emoj);
      }

      setTimeout(() => this.collectResults(message, filterSet), this.inputDelay);
    } else {
      if (reactions.length === 1) {
        this.channel.send(
          'You feel dizzy.\nYou lay on the couch.\nAn ambulance is called...\n\n5 days later.....',
        );
      }
      this.stage = result['1'];
      setTimeout(() => this.start(), this.renderDelay);
    }
  }

  async collectResults(message, filterSet) {
    const { result } = config[this.stage];

    const filter = (reaction) => filterSet.includes(reaction.emoji.name);
    const collected = Array.from(message.reactions.cache.values()).filter(filter);

    const reducer = (acc, reaction) => (reaction.count > acc.count ? reaction : acc);
    const winner = collected.reduce(reducer);
    this.stage = result[emojiMap[winner.emoji.name]];

    this.start();
  }

  renderScript(...parts) {
    const self = this;
    return new Promise((resolve) => {
      let part = parts.pop();

      if (Array.isArray(part)) {
        console.log('part is Array', part);
        part = ['-----', ...part].join('\n');
      } else {
        console.log('part is not Array', part);
      }

      self.channel.send(part).then(() => {
        if (parts.length === 0) {
          resolve();
        } else {
          setTimeout(() => {
            self.renderScript(...parts).then(resolve);
          }, self.renderDelay);
        }
      }, resolve);
    });
  }
}
