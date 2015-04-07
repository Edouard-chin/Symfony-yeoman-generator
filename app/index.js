'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: {
        symfony: function () {
            // this.log(chalk.red('                         ,╥,') + chalk.yellow('                                        ╥╥'));
            // this.log(chalk.red('                     ,╦╬▓▓▓▓▒') + chalk.blue('               .╥╥╥╗╗╗╗,') + chalk.yellow('          ╥╥▒▒▒▒▒▒'));
            // this.log(chalk.red('                  ╥▒╬▓▓▓▓▓▓▓▒─') + chalk.blue('       .╓╥▒▒╬╫╫╫╫╫╫╫╫╫▒') + chalk.yellow('    .╥▒▒▒▒▒▒▒▒▒▒▒'));
            // this.log(chalk.red('              ,╦╬▓▓▓▓▓▓▓▓▓▓▓▓U') + chalk.blue('  ,╥╗▒▒▓╫╫╫╫╫╫╫╫╫╫╫╫╫▒▒') + chalk.yellow('  ╥▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒'));
            // this.log(chalk.red('           ╥▒╬▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒') + chalk.blue('▒╬╫╫╫╬╬╬╬╫╫╫╫╫╬╬╬╬╬╫╫╫▒') + chalk.yellow('▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒Ñ'));
            // this.log(chalk.red('        ,▒╬▓▓▓▓▓▓▒   ▓▓▓   ▓▓╫╫╫▒ ````²╢▒M`````^╙╫▒▒▒"`    `²▒▒▒▒▒▒▒U'));
            // this.log(chalk.red('      ╥╬▓▓▓▓▓▓▓▓▓▒   ▓▓▓   ▓▓▓╫╫▒  ▒▓▓▒  ▒┐ j╬▓▒≥ :▒"  ╥▒▒▒╥,  ²▒▒▒▒▒'));
            // this.log(chalk.red('    ╦╬▓▓▓▓▓▓▓▓▓▓▓▒   ▓▓▓   ▓▓▓╫╫▒  ╨Å╨" :▒┐ ^╨╨╨  ╥U  j▒▒▒▒▒▒>  ]▒▒▒U'));
            // this.log(chalk.red('    ╨╫▓▓▓▓▓▓▓▓▓▓▓▒   ▓▓▓   ▓▓▓╫╫▒  ╥╥╥╗▒╬▒┐ ╥╗╥  ▒▒▒  ²▒▒▒▒▒▒"  ]▒▒▒'));
            // this.log(chalk.red('     `╨╣╫▓▓▓▓▓▓▓▓▒         ▓▓▓▓╫▒ .╫▓▒▒╫╫▒┐ ]╫▓m  ╨▒╥  `²╨╨"   ▒▒▒▒U'));
            // this.log(chalk.red('           `╙╝╣╫▓▓▓▓▓▓▓▓▓▓▓▓▓▒⌂ `╨╣╫╫╫╫╫╫╫╫╫╫╫╫▒▒╨▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒U'));
            // this.log(chalk.red('               ^╙╩╣╫▓▓▓▓▓▓▓▓▓▒     ^ß╣╫╫╫╫╫╫╫╫▒▒    ²╨▒▒▒▒▒▒▒▒▒▒▒▒Ü'));
            // this.log(chalk.red('                   `²╨╝╣╬╬▓▓▓Ü        `²╨╫╬╬╬╬▒`       `²╨▒▒▒▒▒▒▒▒'));
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

        symfonyBundle: function () {
            var done = this.async();
            var options = [
                {
                    type: 'checkbox',
                    name: 'bundles',
                    message: 'Which bundle would you like to add ?',
                    choices: [
                        {
                            name: 'Doctrine fixtures Bundles',
                            value: 'doctrine-fixture-bundle',
                            checked: true
                        },
                        {
                            name: 'The UPro FileBundle',
                            value: 'upro-file-bundle',
                            checked: false
                        },
                        {
                            name: 'FOS JS Routing Bundle',
                            value: 'fos-js-routing-bundle',
                            checked: true
                        },
                        {
                            name: 'Fos User Bundle',
                            value: 'fos-user-bundle',
                            checked: true
                        },
                        {
                            name: 'Faker library',
                            value: 'fzaninotto-faker',
                            checker: false
                        }
                    ]
                }
            ];

            this.prompt(options, function (answers) {
                var bundles = answers.bundles;
                function hasBundle(bundle) {
                    return bundle && bundles.indexOf(bundle) !== -1;
                }
                this.addDoctrineFixtureBundle = hasBundle('doctrine-fixture-bundle');
                this.addUProFileBundle = hasBundle('upro-file-bundle');
                this.addFosRoutingBundle = hasBundle('fos-js-routing-bundle');
                this.addFosUserBundle = hasBundle('fos-user-bundle');
                this.addFakerLibrary = hasBundle('fzaninotto-faker');
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
                    },
                    {
                        name: 'DataTables',
                        value: 'datatables',
                        checked: false,
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
                this.includeDataTables = hasDependency('datatables');
                done();
            }.bind(this));
        }
    },
    writing: {
        symfonyInstall: function () {
            var self = this;
            this.on('symfonyFinishDownload', function () {
                this.spawnCommand('php', ['symfony.phar', 'new', this.projectName, this.symfonyVersion]).on('close', self.async());
            })
        },
        downloadSymfony: function () {
            var done = this.async();
            exec('php -r "readfile(\'http://symfony.com/installer\');" > symfony.phar', [], function () {
                done();
            });
        },
        downloadComposer: function () {
            var done = this.async();
            exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', [], function () {
                done();
            });
        }
    },
    install: {
        createSymfonyProject: function () {
            this.async();
            this.emit('symfonyFinishDownload');
        },

        createFiles: function () {
            this.template('_package.json', this.projectName + '/package.json');
            this.template('_bower.json', this.projectName + '/bower.json');
            this.template('bowerrc', this.projectName + '/.bowerrc');
            this.template('Gruntfile.js', this.projectName + '/Gruntfile.js');
        },

        installBundles: function () {
            var dir = path.join(process.cwd(), this.projectName);
            process.chdir(dir);
            var done = this.async();
            fs.rename('../composer.phar', 'composer.phar');
            fs.rename('../symfony.phar', 'symfony.phar');
            if (this.addDoctrineFixtureBundle) {
                this.spawnCommand('php', ['composer.phar', 'require', 'doctrine/doctrine-fixtures-bundle', '--no-update']);
            }
            if (this.addUProFileBundle) {
                var composer = this.readFileAsString('composer.json');
                var data = JSON.parse(composer);
                data['require']['upro/file-bundle'] = 'dev-master';
                data['repositories'] = [];
                data['repositories'].push({'type': 'vcs', 'url': 'git@github.com:upro/UProFileBundle.git'});
                composer = JSON.stringify(data, null, 4);
                fs.writeFileSync('composer.json', composer);
            }
            if (this.addFosRoutingBundle) {
                this.spawnCommand('php', ['composer.phar', 'require', 'friendsofsymfony/jsrouting-bundle', '--no-update']);
            }
            if (this.addFosUserBundle) {
                this.spawnCommand('php', ['composer.phar', 'require', 'friendsofsymfony/user-bundle:~2.0@dev', '--no-update']);
            }
            if (this.addFakerLibrary) {
                this.spawnCommand('php', ['composer.phar', 'require', 'fzaninotto/faker', '--no-update']);
            }
            done();
        },

        composerInstall: function () {
            var done = this.async();
            this.spawnCommand('rm', ['composer.lock']);
            this.spawnCommand('php', ['composer.phar', 'install']).on('close', done);
        },

        postInstallCmd: function () {
            var done = this.async();
            this.spawnCommand('rm', ['app/config/parameters.yml']);
            this.spawnCommand('php', ['composer.phar', 'run-script', 'post-install-cmd']).on('close', done);
        },

        installFrontDependencies: function () {
            this.installDependencies({
                skipInstall: this.options['skip-install']
            });
        }
    }
});
