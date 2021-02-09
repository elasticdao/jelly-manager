// You enter a [environment]. There is a door [direction].
// In the [environment] are [items].
// You can [action] or [action] or walk through the door.

import { MessageAttachment } from 'discord.js';

const config = {
  1: {
    script: [
      [
        'You are in a room',
        'You see a fireplace,',
        'crazy lights in the corner,',
        'a purple sofa in front of a tv,',
        'and 3 doors labeled `India`, `Jelly`, and `Christmas`\n',
      ],
      [
        'You can:',
        ':one: check the fireplace',
        ':two: watch tv',
        ':three: open the `India` door',
        ':four: open the `Jelly` door',
        ':five: open the `Christmas` door',
      ],
    ],
    reactions: ['1', '2', '3', '4', '5'],
    result: {
      1: '2',
      2: '3',
      3: '4',
      4: '5',
      5: '6',
    },
  },
  2: {
    script: [
      [
        'You check the fireplace and find a note',
        "as you open it, you see the lyrics to 'All I want for Christmas is you'\n",
      ],
      ['You can:', ':one: sing', ':two: sack the writer of this action'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '7',
      2: '8',
    },
  },
  3: {
    script: [
      [
        'You sit down on the purple couch and turn on the tv',
        'Edward R Murrow appears on the screen and tells you to take a shot\n',
      ],
      ['Yeah you...'],
      ['This just became a drinking game!'],
      ['Take a shot!'],
    ],
    reactions: ['1'],
    result: {
      1: '1',
    },
  },
  4: {
    script: [
      [
        'Through the door you see:',
        'a cow walking near several street vendors and',
        "a lady screaming 'Who let the dogs out?!' at you.\n",
      ],
      ['You can:', ':one: enter `India`', ':two: close the door'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '100',
      2: '1',
    },
  },
  5: {
    script: [
      [
        'Through the door you see an ocean.',
        'There are several huge whales in the distance frolicking with a smack (group) of jellyfish.',
      ],
      ['You can:', ':one: enter `Jelly`', ':two: close the door'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '9',
      2: '1',
    },
  },
  6: {
    script: [
      ['Through the door you see:', 'a green slide and clear blue sky\n'],
      ['You can:', ':one: jump on the slide', ':two: close the door'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '200',
      2: '1',
    },
  },
  7: {
    script: [
      [
        "I don't want a lot for Christmas",
        'There is just one thing I need',
        "I don't care about the presents",
        'Underneath the Christmas tree',
      ],
      [
        'I just want you for my own',
        'More than you could ever know',
        'Make my wish come true',
        'All I want for Christmas',
        'Baby is you, oh come on',
      ],
      [
        "I don't want a lot for Christmas",
        'There is just one thing I need',
        "And I don't care about the presents",
        'Underneath the Christmas tree',
      ],
      [
        "I don't need to hang my stocking",
        'There upon the fireplace',
        "Santa Claus won't make me happy",
        'With a toy on Christmas Day',
      ],
      [
        'I just want you for my own',
        'More than you could ever know',
        'Make my wish come true',
        'All I want for Christmas is you',
        'Yeah, you baby (Come on, hey)',
      ],
      [
        "Oh, I won't ask for much this Christmas",
        "I won't even wish for snow",
        "And I'm just gonna keep on waiting",
        'Underneath the mistletoe',
      ],
      [
        "I won't make a list and send it",
        'To the North Pole for Saint Nick',
        "I won't even stay awake to",
        'Hear those magic reindeer click',
      ],
      [
        'Cause I just want you here tonight',
        'Holding on to me so tight',
        'What more can I do?',
        'Baby all I want for Christmas is you,',
        'Yeah, you baby (Oh)',
      ],
      [
        'Oh, all the lights are shining (Lights are shining)',
        'So brightly everywhere',
        "And the sound of children's (Sound of children)",
        'Laughter fills the air',
      ],
      [
        'And everyone is singing',
        'I hear those sleigh bells ringing',
        "Santa, won't you bring me the one I really need?",
        "Won't you please bring my baby to me?",
      ],
      [
        "I don't want a lot for Christmas",
        "This is all I'm asking for",
        'I just want to see my baby',
        'Standing right outside my door',
      ],
      [
        'Oh, I just want you for my own',
        'More than you could ever know',
        'Make my wish come true',
        'Baby all I want for Christmas is',
        'You, yeah, you',
        'Is you, wooh',
        'All I want for Christmas is you (All I want for Christmas is you), eh, come on baby',
        'All I want for Christmas is you (All I want for Christmas is you), wooh',
        'Gimme one (All I want for Christmas is you), yeah alright',
        'Gimme two now (All I want for Christmas is you)',
        'I said all I want for Christmas is you, yeah',
        '(All I want for Christmas is you) Oh yeah',
        "I don't need nobody more than you",
        "No, I don't need nobody else but you",
        "I don't need nobody (I don't need nobody)",
        "I don't need nobody but you (I don't need nobody)",
        'All I want for Christmas is you, yeah',
        'Say it, (All I want for Christmas is you)',
      ],
      [
        '(All I want for Christmas is you)',
        "(All I want for Christmas is you) I don't need no stocking",
        '(All I want for Christmas is you) I just want a little sweet loving',
        '(All I want for Christmas is you)',
      ],
    ],
    reactions: ['1'],
    result: {
      1: '1',
    },
  },
  8: {
    script: [
      ['We apologise for the fault in the subtitles.'],
      ['Those responsible have been sacked.'],
    ],
    reactions: ['1'],
    result: {
      1: '1',
    },
  },
  9: {
    script: [
      [
        'You dive into the inviting water.',
        'It feels right... amazing even to be a part of this ecosystem.',
      ],
      ['Unfortunately, you are drowning...'],
      ['You can:', ':one: continue drowning', ':two: stop drowning'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '10',
      2: '1',
    },
  },
  10: {
    script: [
      ['You bask in the decentralized glory for another minute.', 'You are still drowning.'],
      ['You can:', ':one: continue drowning', ':two: stop drowning'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '666',
      2: '1',
    },
  },

  /*

  INDIA

  */
  100: {
    script: [
      [
        'The cow is now walking very near to you.',
        "The lady is getting closer, still screaming 'WHO LET THE DOGS OUT!?!?!'.",
        'You hear lots of motorcycle horns.',
      ],
      [
        'You can:',
        ':one: move closer to the cow',
        ':two: hit the lady',
        ':three: eat street vendor food',
        ':four: steal a motorcycle',
      ],
    ],
    reactions: ['1', '2', '3', '4'],
    result: {
      1: '101',
      2: '102',
      3: '103',
      4: '104',
    },
  },
  101: {
    script: [
      ['You see that the cow is branded with the ElasticDAO logo.'],
      ['You can:', ':one: follow the cow', ':two: pet the cow', ':three: talk to the cow'],
    ],
    reactions: ['1', '2', '3'],
    result: {
      1: '110',
      2: '111',
      3: '112',
    },
  },
  102: {
    script: [
      ['Frank Sinatra shows up and shakes your hand.', 'You are now a member of the rat pack.'],
    ],
    reactions: [],
    result: {
      1: '100',
    },
  },
  103: {
    script: [
      [
        'The food is very spicy.',
        "After a restless night's sleep you still feel an angry rumbling in your stomach.",
        'You decide to go to an emergency clinic.',
      ],
      ['You are rushed into emergency surgery...'],
      ['As the anesthesia takes hold, you hear someone mention selling your organs.'],
    ],
    reactions: [],
    result: {
      1: '666',
    },
  },
  104: {
    script: [
      [
        'You hop on the motorcycle and start driving away.',
        'Thousands of people emerge from the side streets and give chase.',
      ],
      [
        'Suddenly, you hit an elastic cow and are bounced back into the middle of the crowd.',
        'You are arrested and charged with crimes against the state after a Ledger wallet is discovered in your pocket.',
        'Justice, in the form of your execution, is swift.',
      ],
      ['You can:', ':one: be reincarnated as a Jellyfish', ':two: accept your death'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '300',
      2: '666',
    },
  },
  110: {
    script: [
      ["You become a devote follower of the cow's teachings."],
      ['Years pass.'],
      [
        'You are now wise in the ways of grazing on grass and getting in the way of motor vehicles without being run over.',
        "The cow, having choosen you as it's most devote follower, teaches you the mystical ways of rebasing cheese.",
        "Some of the cow's other followers become jealous of your new found elasticity and stab you to death in your sleep.",
      ],
    ],
    reactions: [],
    result: {
      1: '666',
    },
  },
  111: {
    script: [
      ['It says MOOOOOO in a slightly annoyed way.'],
      ['You can:', ':one: pet the cow again', ':two: talk to the cow'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '113',
      2: '112',
    },
  },
  112: {
    script: [['It urinates on you.'], ['You can:', ':one: pet the cow', ':two: slowly back away']],
    reactions: ['1', '2'],
    result: {
      1: '111',
      2: '100',
    },
  },
  113: {
    script: [
      ['It says MOOOOOOOOO again, angrily.'],
      ['You can:', ':one: pet the cow again', ':two: slowly back away'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '114',
      2: '100',
    },
  },
  114: {
    script: [
      [
        'The cow moos with a ferocity usually reserved for lions.',
        'A sinkhole opens up below you.',
        'The sound of mooing fades as you fall...',
      ],
    ],
    reactions: [],
    result: {
      1: '666',
    },
  },

  /*

  CHRISTMAS

  */

  200: {
    script: [
      ['You see an elf pointing a candy cane in your direction.', 'He asks you to follow him.'],
      ['You can:', ':one: follow him', ':two: run away'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '210',
      2: '201',
    },
  },
  201: {
    script: [
      ['You turn and start to run.'],
      ['Out of the corner of your eye you notice an elf riding a reindeer in your direction.'],
      ['Suddenly, many more elves on reindeer appear...'],
      ['You are being run down by some form of Christmas cavalry.'],
      ['A cold fear-induced sweat appears on your forehead as you break into a full sprint.'],
      ['In the elves hands you can now make out giant candy canes with spear-like tips.'],
      [
        'As you flash back to 5 year old you trying to make a candy cane as sharp as possible,',
        'the first candy cane spears pierce your fragile frame.',
      ],
      ['Before your eyes flash all of the Christmas mornings of your life.'],
    ],
    reactions: [],
    result: {
      1: '666',
    },
  },
  210: {
    script: [
      [
        'You are in front of a large ornate gate looking down a street covered with twinkling lights.',
        'As you follow the elf through the gate you have a sudden urge to laugh "HO HO HO!" and notice a street sign.',
        'You are on Elm Street.',
      ],
      ['You see Rudolph,', 'a large pyramid shaped tree,', 'and many bright spheres.'],
      [
        'You can:',
        ':one: speak to the elf',
        ':two: laugh at Rudolph',
        ':three: approach the tree',
        ':four: approach the spheres',
      ],
    ],
    reactions: ['1', '2', '3', '4'],
    result: {
      1: '211',
      2: '212',
      3: '213',
      4: '214',
    },
  },
  211: {
    script: [
      [
        'You tell the elf to get back to work.',
        'He and the rest of his kind had better work extra hard,',
        "so you'll be able to take credit for their work again next year.",
      ],
    ],
    reactions: [],
    result: {
      1: '210',
    },
  },
  212: {
    script: [
      ['You laugh and call Rudolf names.', 'He hangs his head in shame as his nose dims.'],
      ["'Not you too, Santa', he sobs."],
    ],
    reactions: [],
    result: {
      1: '210',
    },
  },
  213: {
    script: [
      [
        'As you get closer,',
        'you notice that it is not an angel atop the tree,',
        'but the illuminati eye.',
      ],
      ["You feel it's raw, centralized power and bask in the evil, corporate glory."],
    ],
    reactions: [],
    result: {
      1: '210',
    },
  },
  214: {
    script: [
      ['You attempt to walk closer to the spheres but now realize they are very far away.'],
      ['You summon your sleigh and chase them down.'],
      [
        'Eventually, it becomes clear that the spheres are actually',
        'the greatest smack of Jellyfish that you have ever seen.',
      ],
      [
        'As you fly near, you feel yourself morph again into part of a great,',
        'decentralized organization.',
      ],
    ],
    reactions: [],
    result: {
      1: '300',
    },
  },

  /* JELLY */

  300: {
    script: [
      [
        'You arrive at Jelly and notice every other Jellyfish in the smack get a few percent bigger.',
      ],
      ['You see a jellyfish right in front of you.'],
      new MessageAttachment('./assets/jelly.gif'),
      ['It smiles.'],
      [
        'You can:',
        ':one: talk to the jelly',
        ':two: follow the jelly',
        ':three: swim in the opposite direction',
      ],
    ],
    reactions: ['1', '2', '3'],
    result: {
      1: '301',
      2: '302',
      3: '310',
    },
  },
  301: {
    script: [
      ['You start talking to the jellyfish and', 'do a deep dive into the jelly culture.'],
      ["It's fascinating!"],
      ['You now understand why every time that a new jelly joins everybody becomes bigger.'],
    ],
    reactions: [],
    result: {
      1: '310',
    },
  },
  302: {
    script: [
      ['You follow the jelly.'],
      [
        'After a few hours of greeting people and roaming around,',
        'you meet a large jelly in front of several towers.',
      ],
      ['He is a buidler jelly.', 'You are invited to join him in the central tower.'],
      ['You can:', ':one: follow him into the tower', ':two: go back to jelly plaza'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '320',
      '2:': '310',
    },
  },
  310: {
    script: [
      [
        'You see a small smack of jellyfish dancing,',
        'some others drinking shots with a whale,',
        'and still others painting a tower.',
      ],
      ['Your new friend starts to swim in another direction and greet other jellies.'],
      ['You can:', ':one: follow your friend', ':two: drink with the whale'],
    ],
    reactions: ['1', '2'],
    result: {
      1: '302',
      2: '311',
    },
  },
  311: {
    script: [
      ['You realize that in the Elastic ocean the whales and jellyfishes are friends.'],
      [
        'The other jellies explain that in the Elastic Ocean,',
        'the whale has no more power than they do.',
      ],
      ['There is no need to be fear them.'],
      ['You share a shot with the whale and jellies.'],
      ['Suddenly, the whales and jellies all swim to the city center.'],
    ],
    reactions: [],
    result: {
      1: '420',
    },
  },

  420: {
    script: [
      ['You see everybody gathering around a sealed box and a huge board,'],
      ['You walk closer to the board.'],
      ["In sparkling colorful letters you the words 'Voting time'."],
      [
        'As you and your fellow jellies and whales vote,',
        'you notice that everyone is getting bigger.',
      ],
      ['The smallest jellies grow the most.', 'The growth of the whales is almost inperceptable.'],
      [
        'You notice that some jellies are busy with other things.',
        "They stay the same size, and that's ok, because most of you are here, voting.",
      ],
      [':fireworks:'],
      ['You have won the Jelly Jam!!'],
    ],
  },

  /*

  DEATH

  */
  666: {
    script: [
      ['You have died.', 'Purgatory exists.'],
      ['You are forced to work for a centralized organization.', 'You need to feed your family.'],
      [
        'Your boss sends a questionaire asking about the future direction of the organization.',
        'You are force to vote or go hungry',
        "You know your vote doesn't matter.",
      ],
      ['Mercifully, eventually your purgatory nightmare ends.', 'Your vision fades.'],
      ['You open your eyes.'],
    ],
    reactions: [],
    result: {
      1: '1',
    },
  },
};

export default config;
