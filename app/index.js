'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: {
    symfony: function () {
        var done = this.async();
        var options = [{
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
        }];
        this.prompt(options, function (props) {
            this.symfonyVersion = props.symfonyVersion;
            done();
        }.bind(this));
    },
    symfonyName: function () {
        var done = this.async();
        var options = [{
            type: 'string',
            name: 'symfonyName',
            message: 'Name of your fresh project'
        }];

        this.prompt(options, function (props) {
            this.symfonyName = props.symfonyName;
            done();
        }.bind(this));
    }
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json');
    },
  },

  install: function () {
    // this.installDependencies({
      // skipInstall: this.options['skip-install']
    // });
    // this.spawnCommand('symfony', ['new', this.symfonyName, this.symfonyVersion]);
  }
});
