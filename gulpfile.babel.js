import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

gulp.task('build-server', () => {
  return gulp.src('src/server/index.js')
    .pipe(babel({
      presets: ['es2015']
    })).pipe(gulp.dest('build/'));
});

gulp.task('build-client', () => {
  return gulp.src('src/client/js/main.js')
    .pipe(babel({
      presets: ['es2015']
    })).pipe(gulp.dest('build/public/js/'));
});

gulp.task('move-views', () => {
  return gulp.src('src/client/views/**')
    .pipe(gulp.dest('build/views'));
});

gulp.task('move-css', () => {
  return gulp.src('src/client/css/**')
    .pipe(gulp.dest('build/public/css'));
});

gulp.task('move-bower', () => {
  return gulp.src('bower_components/**')
    .pipe(gulp.dest('build/public/bower_components'));
});

gulp.task('move-images', () => {
  return gulp.src('src/client/img/**')
    .pipe(gulp.dest('build/public/img'));
});

gulp.task('move-experiments', () => {
  return gulp.src('src/experiments/**')
    .pipe(gulp.dest('build/public/experiments'));
});

gulp.task('run-server', (cb) => {
  let serverStarted = false;

  nodemon({
    script: 'build/index.js',
    debug: false,
    ext: 'js',
    ignore: ['node_modules/**', 'build/**'],
    watch: ['src/**'],
    tasks: () => {
      return ['build']
    }
  }).on('restart', () => {
    console.log('Server restarted');
  }).on('start', () => {
    if (!serverStarted) {
  			cb();
  			serverStarted = true;
  		}
  });
});

gulp.task('build', ['build-server', 'build-client', 'move-views', 'move-css', 'move-bower', 'move-images', 'move-experiments']);

gulp.task('default', ['build', 'run-server']);
