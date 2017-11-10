const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const rsync = require('gulp-rsync');
const execFile = require('child_process');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('./tsconfig.json');
const argv = require('yargs')
.alias('e', 'env')
.alias('p', 'project')
.alias('t', 'type')
.argv;

gulp.task('build', function () {
	return gulp.src('./server/**/*.ts')
	.pipe(tsProject({
		sourceMap: false,
	}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('ts-compile', function () {
	return gulp.src('./server/**/*.ts')
	.pipe(changed('./dist', { extension: '.js' }))
	.pipe(tsProject())
	.pipe(gulp.dest('./dist'));
});

gulp.task('rsync', function () {
  if (!argv.e || !argv.p || !argv.t ) {
		console.log(' ');
		console.log('   必须制定 -env -project 和 -type 参数');
    console.log('   -env     : test | qa | prod');
    console.log('   -project : 项目gitlab名称');
    console.log('   -type    : multi | spa');
    console.log('   如 gulp -e test -p \<project-name\> -t spa 或 gulp -env test -project \<project-name\> -type spa');
		console.log(' ');
		process.exit(1);
	}
  return execFile.exec(`rm -rf dist && sh rsync.sh ${argv.e} ${argv.p} ${argv.t}`, function (err, stdout, stderr) {
		if (err) {
			return console.error(err);
		}
		console.log(stdout, '============ SUCCESS TO UPDATE FROM SERVER TO LOCAL');
	});
});

gulp.task('compile', function () {
	return gulp.src('./server/**/*.js') // your ES2015 code
	// .pipe(watch('./server/**/*.js'))
	// .pipe(cache.filter()) // remember files
	.pipe(changed('./dist'))
	.pipe(babel()) // compile new ones
	// .pipe(cache.cache()) // cache them
	.pipe(gulp.dest('./dist')); // write them
});
gulp.task('watch', ['ts-compile'], function () {
	nodemon({
		script: './dist/bin/www.js', // run ES5 code,//
		watch: 'server', // watch ES2015 code,
		ext: 'ts',
		env: {
			'NODE_ENV': 'dev'
		},
		tasks: ['ts-compile'] // compile synchronously onChange
	})
});

gulp.task('default', ['rsync', 'ts-compile', 'watch']);
