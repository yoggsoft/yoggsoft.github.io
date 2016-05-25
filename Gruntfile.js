module.exports = function(grunt) {

	// Project configuration.
  grunt.initConfig({
    path:{
      js:{
        origin:"prod/js",
        destiny:"deploy/js"
      },
      // css:{
      //   origin:"prod/js",
      //   destiny:"deploy/js"
      // },
      // html:{
      //   origin:"prod/js",
      //   destiny:"deploy/js"
      // },
    },
    pkg : grunt.file.readJSON('package.json'),
    /*
    htmlmin Task 
    */
    htmlmin : {
      dist : {
        options : {
          removeComments : true,
          collapseWhitespace : true
        },
        files : {
          'index.html' : 'index-human.html'
        }
      }
    },
    /*
    uglify Task 
    */
    uglify : {
    	options : {
    		manage:false,
    	},
    	target : {
    		files: {
    			// 'deploy/js/main.min.js' : 'prod/js/game.js',
          '<%= path.js.destiny  %>/resume.js' : '<%= path.js.origin  %>/resume.js',
          // '<%= grunt.path.js.destiny  %>/resume.js' : 'prod/js/resume.js',
          
    		}
    	}    	
    },
    /*
    watch Task 
    */
    watch: {
      htmlmin:{
        files:'*.html',
        tasks: ['htmlmin']
      },
      uglify:{
        files :'prod/js/*.js',
        tasks : ['uglify']
      },
      sass : {
        files : 'prod/sass/*.scss',
        tasks : ['sass']
      }
    },
    /*
    sass Task 
    */
    sass : {
      dev : {
        options : {
          style : 'expanded',
          sourcemap:'none'
        },
        files : {
          'prod/css/main.css' : 'prod/sass/main.scss',
        }
      },
      dist : {
        options : {
          style : 'compressed',
          sourcemap:'none'
        },
        files : {
          'deploy/css/main.css' : 'prod/sass/main.scss'
        }
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "htmlmin" task.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['htmlmin']);

};