exports.config = {
    framework: 'jasmine2',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'specs/*.spec.js'
    ],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
      args: ['disable-popup-blocking', 'test-type','disable-extensions','disable-web-security']
    }
    },
    allScriptsTimeout: 60000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    },
    rootElement: 'html'
};