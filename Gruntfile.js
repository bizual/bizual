/*jslint node: true*/

module.exports = function (grunt) {

  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    // Meta data
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      bowerInstall: {
        command: 'bower install'
      },
      ghcss: {
        command: 'cp css/all.css ../ && git checkout gh-pages && cp ../all.css css/ && git add css/all.css && git commit -m "CSS from master" && git push && git checkout master'
      }
    },


    copy: {
      ui: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: ['jquery.slim.{js,js.map,min.js}'],
            dest: 'js/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/css/',
            src: ['bootstrap.{css,css.map,min.css}'],
            dest: 'css/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/js/',
            src: ['bootstrap*'],
            dest: 'js/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/fonts/',
            src: ['*'],
            dest: 'css/fonts'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
            src: ['**/*.scss'],
            dest: 'scss/twbs/'
          },
          {
            expand: true,
            cwd: 'bower_components/material-design-lite/',
            src: ['material.min.js'],
            dest: 'js/'
          },
          {
            expand: true,
            cwd: 'bower_components/material-design-icons/',
            src: ['material-icons.css'],
            dest: 'css/'
          }
        ]
      }
    },

    concat: {
      allcss: {
        files: {
          'css/all.css': ['css/material.blue-orange.min.css', 'css/material-icons.css', 'css/style.css']
        }
      }
    },

    sass: {
      ui: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ]
      },
      style: {
        src: [
          'css/style.css'
        ]
      }
    },

    watch: {
      style: {
        files: 'scss/*.scss',
        tasks: ['style']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('style', ['sass', 'autoprefixer', 'concat']);

  grunt.registerTask('bower', ['shell:bowerInstall', 'copy']);
  grunt.registerTask('install', ['bower', 'uglify']);

  grunt.registerTask('default', ['watch']);

};
