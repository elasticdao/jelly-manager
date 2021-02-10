import { Client, DMChannel } from 'discord.js';
import { isAddress } from '@pie-dao/utils';
import { promisify } from 'util';
import Redis from 'redis';
import Handler from './Handler';
// import JellyJamGame from './game/index';

const redis = Redis.createClient();
const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);
const emojiPack = ['👍', '👍🏻', '👍🏼', '👍🏽', '👍🏾', '👍🏿'];

const deleteAddress = async (user, address) => {
  const ogMembers = new Set(JSON.parse((await getAsync('ogMembers')) || '[]'));
  ogMembers.delete(address);
  await setAsync('ogMembers', JSON.stringify(Array.from(ogMembers)));
  redis.del(`${user.id}|address`);
  redis.del(address);
};

const detectETHAddress = (str) => str.split(' ').find(isAddress);

const detectNewETHAddress = async (str) => {
  const address = detectETHAddress(str);

  if (address) {
    if (!(await getAsync(address))) {
      return address;
    }
  }

  return false;
};

const registerAddress = async (user, address) => {
  const ogMembers = new Set(JSON.parse((await getAsync('ogMembers')) || '[]'));
  ogMembers.add(address);
  await Promise.all([
    setAsync('ogMembers', JSON.stringify(Array.from(ogMembers))),
    setAsync(address, user.id),
    setAsync(`${user.id}|address`, address),
  ]);
};

class DiscordActions {
  constructor(client) {
    this.client = client;
  }

  async genericMessage(message) {
    const { author, channel, content } = message;
    const isDM = channel.constructor === DMChannel;
    const dmChannel = isDM ? channel : await author.createDM();
    console.log('Got a generic message', content, 'on channel', channel.id, 'from user', author);

    if (content.match(/^!test/)) {
      message.delete();
      this.guildMemberJoin(message);
      return;
    }

    if (content.match(/^!forgetMeJelly/)) {
      const storedAddress = await getAsync(`${author.id}|address`);
      deleteAddress(author, storedAddress);
      message.delete();
      dmChannel.send(
        'I no longer know what your address is. If you want me to have it, message me with it again.',
      );
      return;
    }

    const address = await detectNewETHAddress(content);

    if (address && isDM) {
      const storedAddress = await getAsync(`${author.id}|address`);
      if (storedAddress) {
        await deleteAddress(author, storedAddress);

        await registerAddress(author, address);
        dmChannel.send(
          `Thanks ${author.username}, I've registered your ETH address. If you want me to forget it, message me with !jelly_forget_me and I'll erase my own memory of you.`,
        );
      }
    }
  }

  async guildMemberJoin({ author, channel: { guild } }) {
    const userKey = `${guild.id}|${author.id}`;

    const dmChannel = await author.createDM();
    const message = await dmChannel.send(
      `Welcome to ElasticDAO ${author.username}! I'm you're friendly neighborhood Jellyfish, here for your enjoyment. Please confirm that you're a human by reacting to this with a thumbsup emoji in the next 5 minutes.`,
    );

    const guildMember = guild.member(author);

    const timeoutPid = setTimeout(
      () => this.kickUser(guildMember, 'Captcha Timeout', message),
      300000,
    );

    const filter = (reaction) => emojiPack.includes(reaction.emoji.name);

    const collected = await message.awaitReactions(filter, { max: 1, time: 300000 });

    if (collected.size === 1) {
      clearTimeout(timeoutPid);
    } else {
      return;
    }

    await dmChannel.send(
      'Thanks for verifying that you are not a fellow bot. You are now a member of the ElasticDAO community!',
    );

    await Promise.all([
      setAsync(`${userKey}|dmChannelId`, dmChannel.id),
      setAsync(`dmChannelId|${dmChannel.id}`, userKey),
    ]);
  }

  async kickUser(guildMember, reason, originalMessage) {
    console.log('Kicking this motherfucker', guildMember.username, guildMember.id);

    if (originalMessage) {
      await originalMessage.delete();
    }

    const dmChannel = await guildMember.createDM();
    await dmChannel.send(
      "I'm sorry but I've had to kick you due to a lack of response. " +
        "Please join ElasticDAO again if you're human.",
    );

    guildMember.kick(reason);
  }
}

const client = new Client();
const actions = new DiscordActions(client);
const handler = new Handler(actions);

client.on('ready', (...args) => {
  console.log('Connected', ...args);
});
client.on('message', (...args) => handler.incoming(...args));

redis.on('error', handler.redisError);

client.login(process.env.TOKEN);
