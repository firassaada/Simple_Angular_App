module.exports = function(config) {
    config.set({

        // base path
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine', 'karma-typescript'], // Add karma-typescript here

        // list of files / patterns to load in the browser
        files: [
            'src/**/*.ts', // Add TypeScript files

        ],

        // preprocessors
        preprocessors: {
            'src/**/*.ts': ['karma-typescript'] // Tell Karma to preprocess TypeScript files
        },

        // reporters
        reporters: ['progress', 'karma-typescript'], // Optionally include karma-typescript for code coverage reports

        // web server port
        port: 9876,

        // enable / disable colors
        colors: true,

        // logging level
        logLevel: config.LOG_INFO,

        // enable / disable watching file changes
        autoWatch: true,

        // browsers to launch
        browsers: ['Chrome'],

        // Continuous Integration mode
        singleRun: false,

        // concurrency level
        concurrency: Infinity
    });
}