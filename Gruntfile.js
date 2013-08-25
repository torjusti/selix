module.exports = function(grunt) {
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'lib/selix.js': 'src/selix.coffee'
        }
      }
    },
    uglify: {
      options: {
        banner: '// selix - github.com/bilde - MIT License\n'
      },
      my_target: {
        files: {
          'lib/selix.min.js': 'lib/selix.js'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['coffee', 'uglify']);
};