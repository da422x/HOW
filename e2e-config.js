exports.config = {

    allScriptsTimeout: 99999,

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        proxy: {
            proxyType: 'manual',
            httpProxy: 'http://one.proxy.att.com:8080',
            sslProxy: 'http://one.proxy.att.com:8080'
        }
    },

    baseUrl: 'http://localhost:9000/',

    framework: 'jasmine',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    }
};
