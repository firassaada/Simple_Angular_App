module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false, // Leave Jasmine Spec Runner output visible in browser
        },
        reporters: ['progress', 'coverage'], // Include 'coverage' reporter
        coverageReporter: {
            type: 'lcov', // Format for tools like SonarCloud
            dir: require('path').join(__dirname, './coverage'), // Output directory
            subdir: '.',
            includeAllSources: true, // Optional: include all sources even if not tested
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'], // Use 'ChromeHeadless' for CI/CD
        singleRun: false, // Set to true if you want Karma to exit after tests
        restartOnFileChange: true,
    });
};