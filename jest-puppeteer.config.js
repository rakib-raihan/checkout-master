module.exports = {
  launch: {
    dumpio: true,
    headless: true,
  },
  browserContext: 'default',
  connect: {
    browserWSEndpoint: 'wss://chrome.browserless.io?token=a129a1e8-e8c8-49da-857d-23e82aba7def',
  },
}
