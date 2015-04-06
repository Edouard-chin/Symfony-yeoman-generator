module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
        assetRoot: "src/AppBundle/Resources/public",
        concat: {
            options: {
                stripBanners: true
            },
            css: {
                src: [
                    <% if (includeFontAwesome) { %>'<%= bowerDirectory %>/font-awesome/css/font-awesome.css',<% } %>
                    <% if (includeBootstrap) { %>'<%= bowerDirectory %>/bootstrap/dist/css/bootstrap.css',
                    '<%= bowerDirectory %>/boostrap/dist/css/bootstrap-theme.css',<% } %>
                ],
                dest: 'web/css/all.css',
            },
            js: {
                src: [
                    <% if (includeBootstrap) { %>'<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.js',<% } %>
                    <% if (includeDataTables) { %>'<%= bowerDirectory %>/datatables/media/js/jquery.dataTables.js',
                    '<%= bowerDirectory %>/datatables-bootstrap3/BS3/assets/js/datatables.js',<% } %>
                    <% if (includeModernizr) { %>'<%= bowerDirectory %>/modernizr/modernizr.js',<% } %>
                    '<%= bowerDirectory %>/jquery/dist/jquery.js'
                ],
                dest: 'web/js/all.js',
            }
        },
        uglify: {
            dist: {
                src: ['web/js/all.js'],
                dest: "web/js/all.js"
            },
        },
        cssmin: {
            dist: {
                files: {
                    "web/css/all.css": ["web/css/all.css"]
                }
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            css: {
                cwd: "<%= bowerDirectory %>/",
                expand: true,
                src: [
                    <% if (includeBootstrap) { %>'bootstrap/dist/css/*',<% } %>
                    <% if (includeDataTables) { %>'datatables/media/css/*',
                    'datatables-bootstrap3/BS3/assets/css/datatables.css',<% } %>
                    <% if (includeFontAwesome) { %>'font-awesome/css/*',<% } %>
                ],
                dest: 'web/css/lib',
                filter: 'isFile',
                flatten: true
            },
            js: {
                cwd: "<%= bowerDirectory %>/",
                expand: true,
                src: [
                    <% if (includeBootstrap) { %>'bootstrap/dist/js/bootstrap.js',<% } %>
                    <% if (includeDataTables) { %>'datatables/media/js/jquery.dataTables.js',
                    'datatables-bootstrap3/BS3/assets/js/datatables.js',<% } %>
                    <% if (includeModernizr) { %>'modernizr/modernizr.js',<% } %>
                    'jquery/dist/jquery.js'
                ],
                dest: 'web/js/lib',
                filter: 'isFile',
                flatten: true
            }
        }
    });
    grunt.registerTask('prod', ['concat', 'cssmin', 'uglify']);
    grunt.registerTask('dev', ['symlink']);
}
