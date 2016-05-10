module.exports = function(grunt) {

	var paths = {
		prod : "prod",
		deploy : "deploy",
		style : "style",
		logic : "js"
	};

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    /*
    htmlmin Task 
    */
	htmlmin : {
		options : {
			removeComments : true,
			collapseWhitespace : true
		},
		files : {
			'deploy/index.html' : ['prod/index.html']
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
    			'deploy/js/main.min.js' : ['prod/js/game.js']
    		}
    	}    	
    },
    /*
    Watch Task 
    */
    watch: {
      html:{
        files:'prod/*.html',
        tasks: ['htmlmin']
      },
      js:{
        files:'prod/js/*.js',
        tasks: ['uglify']
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "htmlmin" task.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['htmlmin']);

};