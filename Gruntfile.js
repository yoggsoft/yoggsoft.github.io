module.exports = function(grunt) {

	// Project configuration.
  grunt.initConfig({
    path:
    {
      js:
      {
        source:"src/js",
        target:"deploy/js"
      },

      sass:
      {
        source:"src/sass",
        deploy_target:"deploy/css",
        prod_target:"src/css",
      },

      html:
      {
        source:
        {
          index:"src",
          template: 'src/templates'
        },
        target:
        {
          index: "",
          template: 'deploy/templates'
        }
      },

      json:
      {
        source: "",
        target:"deploy"
      }
    },

    pkg: grunt.file.readJSON('package.json'),

    /*
    htmlmin Task
    */
    minjson:
    {
      build:
      {
        files:
        {
          '<%= path.json.target %>/data.min.json' : 'data.json'
        }
      }
    },

    /*
    htmlmin Task
    */
    htmlmin:
    {
      dist:
      {
        options:
        {
          removeComments: true,
          collapseWhitespace: true
        },
        files:
        [
          {
           '<%= path.html.target.index %>index.html' : '<%= path.html.source.index %>/*.html'
          },
          {
            expand: true,
            cwd: '<%= path.html.source.template %>',
            src: ['**/*.html'],
            dest: '<%= path.html.target.template %>'
          }
        ],
      },
    },

    /*
    uglify Task
    */
    uglify:
    {
    	options:
    	{
    		manage:false,
    	},
    	target:
    	{
    		files:
    		{
          '<%= path.js.target %>/app.js' :
          [
            '<%= path.js.source %>/*.min.js',
            '<%= path.js.source %>/*.js'
          ]
    		}
    	}
    },

    /*
    watch Task
    */
    watch:
    {
      minjson:
      {
        files: ['<%= path.json.source%>/*.json'],
        tasks:['minjson']
      },
      uglify:
      {
        files : [
          '<%= path.js.source %>/*.js',
          '<%= path.js.source %>/**/*.js'
        ],
        tasks : ['uglify']
      },
      sass:
      {
        files : '<%= path.sass.source %>/*.scss',
        tasks : ['sass']
      },
      htmlmin:
      {
        files: [
          '<%= path.html.source.index %>/*.html',
          '<%= path.html.source.template %>/*.html'
        ],
        tasks: ['htmlmin']
      }
    },

    /*
    sass Task
    */
    sass:
    {
      dev:
      {
        options:
        {
          style: 'expanded',
          sourcemap:'none'
        },
        files:
        {
          '<%= path.sass.prod_target %>/main.css' : '<%= path.sass.source %>/main.scss',
        }
      },
      dist:
      {
        options:
        {
          style: 'compressed',
          sourcemap: 'none'
        },
        files:
        {
          '<%= path.sass.deploy_target %>/main.css' : '<%= path.sass.source %>/main.scss'
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "minjson" task
  grunt.loadNpmTasks('grunt-minjson');
  // Load the plugin that provides the "htmlmin" task
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin that provides the "sass" task
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "watch" task
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s)
  grunt.registerTask('default', ['htmlmin']);

  grunt.registerTask('build', [
    'grunt-minjson',
    'grunt-contrib-htmlmin',
    'grunt-contrib-uglify',
    'grunt-contrib-sass'
  ]);

};
