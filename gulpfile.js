var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var merge = require('merge2');
var watch = require('gulp-watch');
const typeDoc = require('gulp-typedoc');
const sass = require('gulp-sass');
const del = require('del');

var paths = {
	doc: {
		src: [
			'src/app/modules/*.ts',
			'src/app/modules/**/*.ts'
		],
		dest: 'docs'
	}
}

gulp.task('docs', function() {
	return gulp.src(paths.doc.src)
		.pipe(typeDoc({
			target: 'ES5',
            module: 'commonjs',
            mode: 'modules',
            readme: 'none',
			includeDeclarations: true,
            experimentalDecorators: true,
            excludeExternals: true,
			out: paths.doc.dest,
			name: 'vivify.core.pb',
			ignoreCompilerErrors: true,
            exclude: ['**/*+(index|.spec|.e2e).ts']
		}))
});
