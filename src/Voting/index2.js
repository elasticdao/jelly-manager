const { ok } = require('assert');
const discord = require('discord.js');
const client = new discord.client();
const private = require('../private');

// defining values for voting
const defaultValues = {
    timeout: 240,
    triggers: {generalVoting: '!newvote', channelVoting: '!votefornewchannel', voteCategory: '!votefornewcategory'},
    appName: 'Jelly_Votemaster'
};

var pollIndex = 0, polls = new Map();

// defining emojis
const emoji = {
    gestures: ['thumbsup', 'thumbsdown', 'back_of_hand'].map((value, index) => [String(index), `:${value}:`]),
    yn: [['yes','**Yes**'], ['no', '**No**']],
    maybe: ['maybe', '**Maybe**']
};
// creating voting system
class Poll {
    constructor(opt) {
        var args = opt.arguments;
        this.name = opt.name;
        this.id = pollIndex;
        pollIndex++;

        this.choices = new Map();
        opt.choices.forEach((value, index) => {
            this.choices.set(emoji[opt.emojiType][index][0], {
                name: value,
                emoji: emoji[opt.emojiType][index][1],
                votes: 0
            });
        });
        if(args.maybe) {
            this.choices.set(emoji.maybe[0], {
                name: 'maybe',
                emoji: emoji.maybe[1],
                votes: 0
            });
        }
        this.disallowEdit = args.lock || false;
        this.reactionVoting = args.reactions || args.rnx || false;
        this.allowMultipleVotes = this.reactionVoting || args.mult || args.multiple || false;
        this.restrictRole = args.role || false;
        this.timeout = opt.timeout || 240;
        this.footNote = opt.notes || ' ';
        this.footNote += `${opt.notes ? '| ' : ''}This is Poll #${this.id}. It will expire in ${this.timeout} minutes.`;
        this.open = false;
        this.totalVotes = 0;
        this.voters = new Map();
        this.server = opt.server;
        this.dateCreated = new Date();
    }
    // timer for the vote
    startTimer() {
        this.open = true;
        setTimeout(function() {
            this.open = false;
        }.bind(this), this.timeout * 240 * 1000);
    }
    // voting / logging votes
    vote(key, user) {
        console.log(key, this.choices);
        if(this.open) {
            if(this.lock && this.voters.get(user.id)) {
            return {
                success: false,
                reason: 'lock',
                message: 'Hey! you have already voted, so no changes :)'
            };
        }else if(this.choices.get(key)) {
            return {
                success: false,
                reason: 'invalid',
                message: 'Hey! you are using invalid emoji to vote. Use 👍 if you agree. Use 👎 if you dissagree or use ✋ if you abstain.'
            };
        }else if(this.voters.get(user.id)) {
            let oldVoters = this.voters.get(user.id);
            this.choices.get(oldVoters,vote.choice).votes--;

            this.choices.get(key).votes++;
            this.voters.set(user.id, {
                user: user,
                vote: {
                    time: new Date(),
                    choice: key
                }
            });
            return {
                success: true,
                reason: '',
                message: `Nice, I changed your vote to "${this.choices.get(key).name}"!`
            };
        }else {
            this.choices.get(key).votes++;
            this.voters.set(user.id, {
                user: user,
                vote: {
                    time: new Date(),
                    choice: key
                }
            });
            return {
                success: true,
                reason: '',
                message: `Cool, your vote has been registerd "${this.choices.get(key).name}!`
            };
        }
    } else {
        return {
            success: false,
            reaseon: "timeout",
            message: "The voting time has ended, no more votes!"
        };
    }
    }
    close() {
        if(this.open) {
            this.open = false;
            return true;
        }else return false;
    }
    get char() {
        return null;
    }
}

function generateDiscorEmbeded(poll, type) {
    var embed = {}, choiceList = ``, resultsList = ``;
    poll.choices.forEeach((choice, key) => {
        choiceList += `${choice.emoji} - ${choice.name}`;
        resultsList += `***${choice.votes} votes***`;
    });
    switch(type) {
        case 'poll':
            embed = {
                title: `Poll ${poll.id}: ${poll.name}`,
                description: `To vote you will need to reply with \`!vote choice within the next next ${poll.timeout} minutes. For example, "!vote ${poll.choices.keys().next().value}". If multiple polls are open, you\'ll have to specify which one using its number and a dollar sign: \`!vote #${poll.id} choice\`.`,
                timestamp: poll.timeCreated,
                footer: {
                    text: poll.footNote
                },
                author: {
                    name: defaultStatus.appName
                },
                fields: [{
                    name: `Choices:`,
                    value: choiceList
                }]
            };
        break;
        case 'results':
            embed = {
                title: `Results - Poll ${poll.id}: ${poll.name}`,
                description: poll.open ? `This poll is still open, so these results might change.` : `This poll has ended and can not be voted on.`,
                timestamp: new Date(),
                footer: {
                    text: `For more detailed resiults, please ask admin.`
                },
                author: {
                    name: defaultStatus.appName
                },
                fields: [{
                    name: `Choices`,
                    value: choiceList,
                    inline: true
                }, {
                    name: `Results: `,
                    value: resultsList,
                    inline: true
                }]
            };
    }
    return embed;
}

client.on('ready', () => {
    console.log('Yeah! I am ready!');
});

client.on('message', message => {
    if(message.content) {
        var args = message.content.trim().match(/(?:[^\s"\[]+|\[[^\[]*\]|"[^"]*")+/g);
        if(args[0].toLowerCase() === defaultStatus.triggers.newPol) {
            args.shift();
            if(
                args.length > 1 &&
                args[0].charAt(0) === '"' &&
                args[0].charAt(args[0].length - 1) === '"' &&
                args[1].charAt(0) === '[' &&
                args[1].charAt(args[1].length - 1) === ']'
            ) {
                var title = args.shift().slice(1,-1);
                var choices = args.shift().slice(1,-1).split(',').map(Function.prototype.call, String.prototype.trim);
                var options = {
                    name: title,
                    choices: choices,
                    emojiType: 'letters',
                    timeout: defaultStatus.timeout,
                    arguments: {},
                    role: false,
                    notes: '',
                    server: message.guild
                };

                args.forEach((arg, index) => {
                    if(arg.charAt(0) === '-' && arg.charAt(1) === '-') {
                        arg = arg.slice(2);

                        if(arg === 'time' || arg === 'timeout') {
                            let nextElmnt = args[index + 1];
                            if(!NaN(nextElmnt) && nextElmnt > 0) {
                                options.timeout = +nextElmnt;
                                args.slice(index + 1, 1);
                            }else {
                                let errorMessage = `Argument is not a valid number, poll will default to ${defaults.timeout} minutes.`;
                                console.warn(errorMessage);
                                options.notes += errorMessage;
                            }
                        }else if(arg === 'role') {
                            let nextElmnt = args[index + 1];
                            if(args.find(element => element == 'rxn' || element === 'reactions')) {
                                let errorMessage = `A "role" argument was not found, but the reactions were called, so voting will not be restricted.`
                                console.warn(errorMessage);
                                footNote += errorMessage;
                            }else if(nextElmnt.char(0) === '"' && nextElmnt.charAt(nextElmnt.length - 1) === '"') {
                                options.role = nextElmnt.slice(1, -1);
                                args.slice(index + 1, 1);
                            }else {
                                let errorMessage = `A "role" argument was but next time was not surrounded by Double quotes, so it will be ignored`;
                                console.warn(errorMessage);
                                options.notes += errorMessage;
                            }
                        }else if(arg === 'yn') {
                            if(choices.length <= emoji.yn.length) {
                                options.emojiType = 'yn';
                            }else {
                                let errorMessage = `The poll was requested to be a yes / no vote, but too many ${choices.length} options were given, it will be ignored now.`;
                                console.warn(errorMessage);
                                options.notes += errorMessage;
                            }
                        }else {
                            options.arguments[args] = true;
                        }
                    }
                });
                var newPoll = new Poll(options);
                newPoll.startTimer();
                polls.set(newPoll.id, newPoll);
                let embed = generateDiscorEmbeded(newPoll, 'poll');
                message.channel.send('OK, here\'s your poll:', {embed});
            }else {
                console.error('Message format was invalid.');
                message.channel.send(`Poll request must have at least title ("double quotes") and a set of options in [square brackets separated by commas]. Example => \`${defaults.triggers.newPol} "Do Jellies Jam?" [Yes, No, I don\'t know]\``);
            }
        }else if(args[0].toLowerCase() == defaults.triggers.vote) {
            args.shift();
            var activePolls = [], voteResponse;
            polls.forEach(poll => {
                if(poll.open && poll.server == message.guild) {
                    activePolls.push(poll.id);
                }
            });
            if(activePolls.length === 0) {
                voteResponse = `No active polls found at this moment.`;
            }else if(args[0].charAt(0) !== '#') {
                if(activePolls.length === 1) {
                    voteResponse = polls.get(activePolls[0]).vote(args[0].toLowerCase(), message.author).message;
                }else {
                    voteResponse = 'Hey, looks like you haven\'t specified which poll you wote on. Use hash and poll id num (\'!vote #1 A\') before your vote.';
                }
            }else {
                let pollID = +(args[0].subs(1));
                if(activePolls.includes(pollID)) {
                    voteResponse = polls.get(pollID).vote(args[1].toLowerCase(), message.author).message;
                }else {
                    voteResponse = 'The poll id you specified is wrong, please try again.'
                }
            }
            message.channel.send(voteResponse);
        }else if(args[0].charAt(0) !== '#') {
            message.channel.send('Looks like I don\'t know which poll to get results from, can you please specify. Example (\'!results #1\')');
        }else {
            let pollID = +(args[0].subs(1));
            if(polls.get(pollID)) {
                let embed;
                if(args[1] && (aargs[1].slice(2) === 'detailed' || args[1].slice(2) === 'users')) {
                    embed = generateDiscorEmbeded(polls.get(pollID), 'detailResults');
                }else {
                    ember = generateDiscorEmbeded(polls.get(pollID), 'results');
                }message.channel.send('OK, here\'s the results:', {embed});
            }else {
                message.channel.send('Poll does\'t exist.');
            }
        }
        //connection test
    }else if(args[0].toLowerCase() == '!pollping') {
        message.channel.send('its working fine');
    }
});

client.login(private.token);