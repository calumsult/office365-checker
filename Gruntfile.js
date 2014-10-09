/* global module */

module.exports = function(grunt) {
    grunt.initConfig({
        distFolder: "dist",
        pkg: grunt.file.readJSON("package.json"),

        compress: {
            main: {
                options: {
                    archive: "<%= distFolder %>/<%= pkg.name %>.zip"
                },
                files: [
                    { src: ["_locales/**", "src/**", "key.pem", "LICENSE", "manifest.json", "README.md"] }
                ]
            }
        },

        jshint: {
            files: [
                "Gruntfile.js",
                "src/**/*.js",
                "!src/js/lib/*.js",
                "test/**/*.js",
            ],
            options: {
                bitwise: true,
                camelcase: true,
                curly: false,
                eqeqeq: true,
                es3: false,
                forin: true,
                freeze: true,
                immed: true,
                indent: 4,
                latedef: true,
                maxdepth: 3,
                maxparams: 5,
                newcap: true,
                noempty: true,
                nonbsp: true,
                nonew: true,
                plusplus: true,
                quotmark: "double",
                strict: false,
                undef: true,
                unused: "vars",

                browser: true,
                globals: {
                    assert: true,
                    console: true,
                    define: true,
                    describe: true,
                    it: true,
                    mocha: true,
                    require: true
                }
            }
        },

        "js-test": {
            options: {
                pattern: "test/js/*.js",
                deps: [
                    "src/js/RequireConfig.js",
                    "src/js/lib/require-2.1.14.min.js",
                    "test/js/util/testBootstrapper.js"
                ],
                log: true,
                requirejs: true
            }
        },

        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-js-test");

    grunt.registerTask("test", ["jshint", "js-test"]);
    grunt.registerTask("default", ["jshint", "js-test", "compress"]);
};