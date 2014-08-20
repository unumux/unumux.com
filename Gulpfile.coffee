require('coffee-script/register');

gulp            = require("gulp")
gulpLoadPlugins = require('gulp-load-plugins')
plugins         = gulpLoadPlugins()
lazypipe        = require('lazypipe')
wiredep         = require('wiredep').stream
runSequence     = require('run-sequence')
rimraf          = require('rimraf')
merge           = require('merge-stream')
browserSync     = require('browser-sync')


###
launch the Server
###
gulp.task "browser-sync", ->
  browserSync
    server:
      baseDir: ['.tmp', '.']
    port: process.env.PORT || 3000
    host: '0.0.0.0'
    open: false

gulp.task "inject-sass", ->
  gulp.src('./css/app.scss')
    .pipe plugins.inject gulp.src(['css/**/_*.scss'], {read: false}), 
      relative: true
      starttag: '// inject:scss'
      endtag: '// endinject'
      transform: (filepath, file, i, length) ->
        return "@import \"#{filepath}\";"
    .pipe(gulp.dest('./css'))

gulp.task "inject-coffee", ->
  gulp.src('./index.html')
    .pipe plugins.inject(
      gulp.src ['.tmp/js/app.js', '.tmp/js/**/*.js'], {read: false}),
        relative: true
        ignorePath: '.tmp'
    .pipe(gulp.dest('./'));

gulp.task "sass", ->
  sassStream = gulp.src('css/app.scss')
    .pipe plugins.plumber()
    .pipe plugins.clipEmptyFiles()
    .pipe plugins.sass
      onError: browserSync.notify
      includePaths: ['css']
    .pipe plugins.autoprefixer [
        "last 15 versions"
        "> 1%"
        "ie 8"
        "ie 7"
      ] , cascade: true
    .pipe gulp.dest('.tmp/css')
    .pipe(browserSync.reload(stream: true))

gulp.task "coffee", ->
  rimraf.sync './.tmp/js'
  gulp.src('js/**/*.coffee')
    .pipe(plugins.coffee(onError: browserSync.notify))
    .pipe(browserSync.reload(stream: true))
    .pipe(gulp.dest('.tmp/js'))


gulp.task 'bower', ->
  gulp.src(['index.html', 'css/app.scss'], { base: './' })
    .pipe wiredep()
    .pipe gulp.dest('./')


gulp.task 'clean-tmp', (cb) ->
  rimraf './.tmp', ->
    console.log('clean complete')
    cb()

gulp.task 'setup-tmp', ['clean-tmp'], (cb) ->
  runSequence('bower', 'coffee', 'inject-coffee', 'inject-sass', 'sass', -> 
    setTimeout(cb, 100))

gulp.task "watch", ['setup-tmp'], ->
  gulp.watch 'css/**/*.scss', (e) ->
    if e.type == 'added' || e.type == 'deleted'
      gulp.start('inject-sass')
    else
      gulp.start('sass')

  gulp.watch 'js/**/*.coffee', (e) ->
    if e.type == 'added' || e.type == 'deleted'
      runSequence('coffee', 'inject-coffee')
    else
      gulp.start('coffee')

  gulp.watch 'bower.json', ['bower']

  plugins.watch({ glob: ['index.html', 'views/**/*.html'] })
    .pipe(browserSync.reload(stream: true))

###
Minify and concatenate files
###
gulp.task 'build', ->
  gulp.src('.tmp/index.html')
    .pipe usemin
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify()]
    .pipe(gulp.dest('build/'))


# ###
# Default task, running just `gulp` will compile the sass,
# compile the jekyll site, launch BrowserSync & watch files.
# ###
gulp.task "default", [
  "browser-sync"
  "watch"
]
