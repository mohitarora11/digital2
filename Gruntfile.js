module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin']
            },
            images: {
                files: ['images/*'],
                tasks: ['imagemin']
            },
            js: {
                files: ['js/**/*.js','js/**/*.json'],
                tasks: ['uglify']
            }
        },

        copy: {
            
            js: {
                expand: true,
                cwd: 'js',
                src: ['*.js','*.json'],
                dest: 'build/js',
                filter: 'isFile'
            },
            html: {
                expand: true,
                cwd: 'views',
                src: ['**'],
                dest: 'build/views'
            },
            images: {
                expand: true,
                cwd: 'images',
                src: ['**'],
                dest: 'build/images'
            }
        },
        imagemin: { // Task
            dynamic: {
                options: {
                    optimizationLevel: 7
                }, // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'images/', // Src matches are relative to this path
                    src: ['{,*/}*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: 'build/images/' // Destination path prefix
                }]
            }
        },
        cssmin : {
            options: {
              keepSpecialComments: 0
            },
            minify : {
                expand : true,
                cwd : 'css',
                src : ['*.css', '!*.min.css'],
                dest : 'build/css',
                ext : '.min.css'
            },
            combine : {
                files: {
                    'build/css/digital.min.css': ['build/css/bootstrap.min.css','build/css/style.min.css']
                }
            }
        },
        uglify: {
            my_target: {
              files: {
                'build/js/digital.min.js': ['js/gallery.json','js/app.js']
              }
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    'build/css/*.css',
                    'build/js/*.js',
                    '*.html'
                ]
            },
            options: {
                watchTask: true,
                server: "build/"
            }
        },
        notify: {
            server: {
                options: {
                    message: 'Server is ready!'
                }
            }
        }
    });

    // Load the plugins to run your tasks
    
    //require("load-grunt-tasks")(grunt, { scope: "devDependencies" });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-notify');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    

    grunt.registerTask('default', 'html templates', [  'copy',  'cssmin','uglify','browserSync',  'notify:server', 'watch']);
   // grunt.registerTask('purecss', 'convert into one', ['purifycss']);

};
