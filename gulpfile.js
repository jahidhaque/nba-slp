/*
|-----------------------------------------------------
| Setting up gulpfile
|-----------------------------------------------------
*/
var     gulp        =       require('gulp'),
        sass        =       require('gulp-sass'),
        concat      =       require('gulp-concat'),
        uglify      =       require('gulp-uglify'),
        babel       =       require('gulp-babel'),
        es2015      =       require('babel-preset-es2015'),
        notify      =       require('gulp-notify'),
        sourcemaps  =       require('gulp-sourcemaps');



var     paths       =       {
    scripts: [
        "public/libs/angular.js",
        "public/libs/angular-resource.js",
        "public/libs/angular-route.js",
        "public/libs/angular-datepicker.js",
        "public/libs/jquery.js",
        "public/libs/bootstrap.js"
    ],
    frontEndScripts: [
        "app_client/app.js",
        "app_client/common/services/authentication/authentication.service.js",
        "app_client/common/services/account/account.service.js",
        "app_client/common/services/admin/site-controller.service.js",
        "app_client/common/services/admin/user-controller.service.js",
        "app_client/admin/usercontroll/usercontroll.controller.js",
        "app_client/admin/staffcontroll/staffcontroller.controller.js",
        "app_client/common/services/system/system.service.js",
        "app_client/common/directives/nav/nav.directive.js",
        "app_client/common/directives/nav/nav.controller.js",
        "app_client/common/directives/footer/footer.directive.js",
        "app_client/common/directives/fileModel/fileModel.directive.js",
        "app_client/common/directives/sidebar/sidebar.directive.js",
        "app_client/home/welcome/welcome.controller.js",
        "app_client/committees/committees.controller.js",
        "app_client/councilmembers/councilmembers.controller.js",
        "app_client/events/events.controller.js",
        "app_client/aboutus/aboutus.controller.js",
        "app_client/contactus/contactus.controller.js",
        "app_client/signup/signup.controller.js",
        "app_client/signin/signin.controller.js",
        "app_client/profile/profile.controller.js",
        "app_client/welcome/welcome.controller.js",
        "app_client/help/help.controller.js",
        "app_client/admin/sitecontroll/sitecontroll.controller.js",
        "public/js/site-opr.js"
    ],
    styles: [
        "public/scss/app.scss"
    ]
};

function reportError (error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());
    this.emit('end');
}

//gulp task to compile js files.
gulp.task('compile-js', function(){
    
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
            .pipe(babel({presets: ['es2015']}).on('error', reportError ))
            .pipe(uglify())
            .pipe(concat('master.min.js'))
        .pipe(sourcemaps.write())
        .pipe(notify('js compiled'))
        .pipe(gulp.dest("./public/js/"));
});

//gulp task to compile fontend scripts files files.
gulp.task('compile-fontEndsScripts', function(){
    
    return gulp.src(paths.frontEndScripts)
        .pipe(sourcemaps.init())
            .pipe(babel({presets: ['es2015']}).on('error', reportError ))
            .pipe(uglify())
            .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(notify('fontend scripts compiled'))
        .pipe(gulp.dest("./public/js/"));
});


//gulp task to compile sass files.
gulp.task('compile-sass', function(){
    
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(notify('sass compiled'))
        .pipe(gulp.dest("./public/css/"));
});


//gulp-task to keep on watching all files.
gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['compile-js']);
    gulp.watch(paths.frontEndScripts, ['compile-fontEndsScripts']);
    gulp.watch("public/scss/*.scss", ['compile-sass']);
    gulp.watch("public/scss/components/*.scss", ['compile-sass']);
});


//calling gulp task to run as default function.
gulp.task('default', ['watch', 'compile-js', 'compile-fontEndsScripts', 'compile-sass']);
