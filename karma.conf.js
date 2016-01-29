// Karma configuration
// Generated on Thu Jan 28 2016 12:02:41 GMT+0300 (RTZ 2 (зима))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-messages.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-route.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-mocks.js',
        'https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js',
        'https://cdn.auth0.com/js/lock-7.min.js',
        'https://cdn.auth0.com/w2/auth0-angular-4.js',
        'http://sugarjs.com/release/current/sugar.min.js',
        'src/Angello.js',
        'tests/**/*.js',
        'src/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
