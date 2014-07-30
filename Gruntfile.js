//Framework Version 1.0.0 for applications
module.exports = function (grunt) {

  grunt.initConfig({
    variables: grunt.file.readJSON('variables.json'),

    sass: {
      dev: {
        files: {
          '<%= variables.dev.css %>': '<%= variables.dev.scss %>' // Output : Input
        }
      },
      release: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= variables.release.css %>': '<%= variables.dev.scss %>' // Output : Input
        }
      }
    },

    copy: {
      build: {
        src: '<%= variables.build.modernizrSource %>',
        dest: '<%= variables.build.modernizrDest %>'
      }
    },

    concat: {
      debug: {
        nonull: true,
        src: '<%= variables.debug.jsSource %>',
        dest: '<%= variables.dev.js %>'
      },
      dev: {
        nonull: true,
        src: '<%= variables.dev.jsSource %>',
        dest: '<%= variables.dev.js %>'
      }
    },

    uglify: {
      options: {
        report: 'gzip',
        mangle: false
      },
      release: {
        files: {
            '<%= variables.release.js %>' : '<%= concat.dev.dest %>'
        }
      }
    },

    jshint: {
      files: {
        src: '<%= variables.debug.js %>'
      }
    },

    uncss: {
      dev: {
        options: {
          ignore: ['']
        },
        files: {
          '<%= variables.dev.css %>': '<%= variables.dev.html %>'
        }
      },

      release: {
        options: {
          ignore: [''],
          report: 'min'
        },
        files: {
          '<%= variables.release.css %>': '<%= variables.dev.html %>'
        }
      }
    },

    captain_hook: {
      debug: {
        jsFiles: '<%= variables.debug.jsPath %>',
        cssFiles: '<%= variables.debug.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      },

      dev: {
        jsFiles: '<%= variables.dev.jsPath %>',
        cssFiles: '<%= variables.debug.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      },

      release: {
        jsFiles: '<%= variables.release.jsPath %>',
        cssFiles: '<%= variables.release.cssPath %>',
        targetHtml: '<%= variables.debug.masterLayout %>'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '<%= variables.watch.scss %>',
        tasks: ['sass:dev']
      },
      js: {
        files: '<%= variables.watch.js %>',
        options: {
          livereload: true
        }
      },
      html: {
        files: ['*.html', '*.aspx', '*.ascx', '*.cshtml'],
        options: {
          livereload: true
        }
      }
    },
    browserSync: {
      bsfiles: {
        src: '<%= variables.debug.cssPath %>'
      },
      options: {
        proxy: '<%= variables.debug.proxy %>',
        watchTask: true
      }
    }

  });

  // Pull in the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-captain-hook');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask("default", function () {
    grunt.log.writeln("\r\n - \x1b[97mGRUNT COMMANDS\x1b[39;49m -------------------------------------------------------------\r\n");
    grunt.log.writeln("   grunt \x1b[93mwatch\x1b[39;49m - Watch scss");
    grunt.log.writeln("   grunt \x1b[93mbuild\x1b[39;49m - Build the initial files and copy over Modernizr");
    grunt.log.writeln("   grunt \x1b[93mdebug\x1b[39;49m - Build for the debug environment");
    grunt.log.writeln("   grunt \x1b[93mdev\x1b[39;49m - Build the dev files");
    grunt.log.writeln("   grunt \x1b[93mrelease\x1b[39;49m - Build the release files");
    grunt.log.writeln("\r\n - \x1b[97mGRUNT COMMANDS (ADVANCED)\x1b[39;49m --------------------------------------------------\r\n");
    grunt.log.writeln("   grunt \x1b[93msass:dev\x1b[39;49m - Compile scss files");
    grunt.log.writeln("   grunt \x1b[93msass:release\x1b[39;49m - Minify  compiled CSS file");
    grunt.log.writeln("   grunt \x1b[93mcopy\x1b[39;49m - Copy files from UI framework to project");
    grunt.log.writeln("   grunt \x1b[93mjshint\x1b[39;49m - Run jslint for javascript errors");
    grunt.log.writeln("   grunt \x1b[93mconcat:debug\x1b[39;49m - Concatenate library javascript files");
    grunt.log.writeln("   grunt \x1b[93mconcat:dev\x1b[39;49m - Concatenate all javascript files");
    grunt.log.writeln("   grunt \x1b[93muglify\x1b[39;49m - Minify and gzip concatenated javascript file");
    grunt.log.writeln("   grunt \x1b[93muncss:dev\x1b[39;49m - Remove unused css styles");
    grunt.log.writeln("   grunt \x1b[93muncss:release\x1b[39;49m - Remove unused css styles");
    grunt.log.writeln("   grunt \x1b[93mcaptain_hook:debug\x1b[39;49m - link page to debug version of the files");
    grunt.log.writeln("   grunt \x1b[93mcaptain_hook:dev\x1b[39;49m - link page to dev version of javascript and CSS");
    grunt.log.writeln("   grunt \x1b[93mcaptain_hook:release\x1b[39;49m - link page to release version of javascript and CSS");
  });

  grunt.registerTask('build', ['copy', 'concat:debug', 'sass:dev', 'captain_hook:debug']);
  grunt.registerTask('debug', ['concat:debug', 'captain_hook:debug', 'browserSync', 'watch']);
  grunt.registerTask('dev', ['concat:dev', 'sass:dev', 'uncss:dev', 'captain_hook:dev']);
  grunt.registerTask('release', ['concat:dev', 'uglify', 'sass:release', 'uncss:release', 'captain_hook:release']);
};
