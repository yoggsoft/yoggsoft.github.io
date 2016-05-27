module.exports = function(grunt) {

	// Project configuration.
  grunt.initConfig({
    path:{
      js:{
        source:"prod/js",
        target:"deploy/js"
      },
      sass:{
        source:"prod/sass",
        deploy_target:"deploy/css",
        prod_target:"prod/css",
      },
      html:{
        templates:{
          source:"prod/templates",
          target:"deploy/public/templates"
        },
        source:"prod/",
        target:"deploy/"
      },
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
          '<%= path.html.templates.target %>/*.html' : '<%= path.html.templates.source %>/*.html',
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
          '<%= path.js.target %>/app.js' : 
          [
            '<%= path.js.source %>/angular.min.js',
            '<%= path.js.source %>/velocity.min.js',
            '<%= path.js.source %>/resume_module.js',
            '<%= path.js.source %>/resume.js'
          ]
    		}
    	}    	
    },
    /*
    watch Task 
    */
    watch: {
      htmlmin:{
        files: ['<%= path.html.templates.source %>/*html','*.html'],
        tasks: ['htmlmin']
      },
      uglify:{
        files : ['<%= path.js.source %>/*.js','<%= path.js.source %>/**/*.js'],
        tasks : ['uglify']
      },
      sass : {
        files : '<%= path.sass.source %>/*.scss',
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
          '<%= path.sass.prod_target %>/main.css' : '<%= path.sass.source %>/main.scss',
        }
      },
      dist : {
        options : {
          style : 'compressed',
          sourcemap:'none'
        },
        files : {
          '<%= path.sass.deploy_target %>/main.css' : '<%= path.sass.source %>/main.scss'
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