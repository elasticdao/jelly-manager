const config = {
    '1' : {
      script: [
        [
          'Hello, Jelly Master here',
          'I have heard that you want to create something new...'
        ],
        [
          `Let's see what I can offer you:`,
          ':one: Create a new Channel on the server',
          ':two: Create a new Category on the channel',
        ],
      ],
      reactions: [
        '1',
        '2',
      ],
      result: {
        '1': '2',
        '2': '3',
      },
    },
};
export default config;