module.exports = function(grunt) {

	// Project configuration.
  grunt.initConfig({
    path:{
      js:{
        origin:"prod/js",
        destiny:"deploy/js"
      },
      sass:{
        origin:"prod/sass",
        deploy_destiny:"deploy/css",
        prod_destiny:"prod/css",
      }
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
          '<%= path.js.destiny %>/app.js' : 
          [
            '<%= path.js.origin %>/angular.min.js',
            '<%= path.js.origin %>/velocity.min.js',
            '<%= path.js.origin %>/resume_module.js',
            '<%= path.js.origin %>/resume.js'
          ]
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
        files : ['<%= path.js.origin %>/*.js','<%= path.js.origin %>/**/*.js'],
        tasks : ['uglify']
      },
      sass : {
        files : '<%= path.sass.origin %>/*.scss',
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
          '<%= path.sass.prod_destiny %>/main.css' : '<%= path.sass.origin %>/main.scss',
        }
      },
      dist : {
        options : {
          style : 'compressed',
          sourcemap:'none'
        },
        files : {
          '<%= path.sass.deploy_destiny %>/main.css' : '<%= path.sass.origin %>/main.scss'
        }
      }
    }
  });
  // Load the plugin that provides the "uglify" task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "htmlmin" task
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin that provides the "sass" task
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "watch" task
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s)
  grunt.registerTask('default', ['htmlmin']);

};