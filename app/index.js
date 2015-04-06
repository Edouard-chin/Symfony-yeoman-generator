'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: {
        symfony: function () {
            var done = this.async();
            var options = [
                {
                    type: 'list',
                    name: 'symfonyVersion',
                    message: 'Which version of symfony would you like to use?',
                    choices: [
                        {
                            name: 'Symfony 2.6.1',
                            value: '2.6.1',
                            checked: true
                        },
                        {
                            name: 'Symfony 2.6.5',
                            value: '2.6.5',
                            checked: false
                        }
                    ],
                    default: "2.6.5"
                },
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Name of your fresh project'
                },
                {
                    type: 'input',
                    name: 'bowerDirectory',
                    message: 'Bower_components path',
                    default: 'app/Resources/lib',
                }
            ];
            this.prompt(options, function (props) {
                this.symfonyVersion = props.symfonyVersion;
                this.projectName = props.projectName;
                this.bowerDirectory = props.bowerDirectory;
                done();
            }.bind(this));
        },

        bower: function () {
            var done = this.async();
            var options = [{
                type: 'checkbox',
                name: 'bowerDependency',
                message: 'What do you need?',
                choices: [
                    {
                        name: 'Bootstrap',
                        value: 'bootstrap',
                        checked: true,
                    },
                    {
                        name: 'Font Awesome',
                        value: 'font-awesome',
                        checked: true,
                    },
                    {
                        name: 'Modernizr',
                        value: 'modernizr',
                        checked: true,
                    }
                ]
            }];

            this.prompt(options, function (answers) {
                var dependencies = answers.bowerDependency;
                function hasDependency(dependency) {
                    return dependency && dependencies.indexOf(dependency) !== -1;
                }
                this.includeBootstrap = hasDependency('bootstrap');
                this.includeFontAwesome = hasDependency('font-awesome');
                this.includeModernizr = hasDependency('modernizr');
                done();
            }.bind(this));
        }
    },
    writing: {
        symfonyInstall: function () {
            var self = this;
            this.on('symfonyFinishDownload', function () {
                this.spawnCommand('php', ['symfony.phar', 'new', this.projectName, this.symfonyVersion]);
            })
        },
        download: function () {
            var self = this;
            var done = this.async();
            exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php');
            exec('php -r "readfile(\'http://symfony.com/installer\');" > symfony.phar', [], function () {
                done();
            });
        },
        app: function () {
            this.template('_package.json', 'package.json');
            this.template('_bower.json', 'bower.json');
            this.template('bowerrc', '.bowerrc');
        }
    },
    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
