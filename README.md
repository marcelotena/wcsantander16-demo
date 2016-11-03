# WCSantander16 Demo
WordPress theme - Single Page Application using AngularJS and the WP REST API.

## 1. THEME Installation

1.0. Requirements
- Plugin: https://es.wordpress.org/plugins/rest-api/

1.1. Clone repository to your themes folder
- Navigate to: ../wp-content/themes/ in your WordPress installation.
- Execute: git clone https://github.com/marcelotena/wcsantander16-demo.git

1.2. Rename folder "wcsantander16-demo" to "wp_ng_spa"

## 2. DEV Installation

2.0. Requirements
- NodeJS: https://nodejs.org
- Gulp CLI:
```
npm install --global gulp-cli
```

2.1. Install theme following steps described in "1. THEME Installation"

2.2. Download node_modules: Navigate to "wp_ng_spa" and execute:
```
npm install
```

2.3. Open "gulpfile.js" and modify browserSync proxy URL with your local PHP environment URL:
```JavaScript
gulp.task('default', ['sass', 'concat-dependencies', 'concat-scripts'], function () {

    browserSync.init({
        proxy: "yourlocaldevelopmenturl.dev"
    });


    gulp.watch("assets/stylesheets/**/*.scss", ['sass']);
    gulp.watch(["assets/js/**/*.js", "assets/js/*.js", "./*.html"], ['concat-scripts', 'reload']);
});
````

2.4. To start working on the theme, simply execute "gulp" on the terminal and it will run gulp's default task with:
- SASS and JS watch, file concatenation, autoprefixing and minification.
- Browser reload.
