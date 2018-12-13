let gulp=require("gulp");
let uglify=require("gulp-uglify");//压缩模块
let babel = require("gulp-babel");	// 编译ES6模块
let cleancss=require("gulp-clean-css");	// 压缩css
let webserver=require("gulp-webserver");  // 外部服务器
let sass=require("gulp-sass"); //编译scss到css

gulp.task("copy",()=>{
	gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"));
})

//gulp.task("buildJS",()=>{
//	gulp.src("./src/**/*.*")
//	.pipe(uglify())
//	.pipe(gulp.dest("./dist"));
//})

gulp.task("buildJS",()=>{
	//只复制	
	gulp.src("./src/scripts/libs/*.js")
	.pipe(gulp.dest("./dist/scripts/libs"))	//dext 目的地
	// 编译压缩复制
	gulp.src("./src/scripts/*.js")
	.pipe(babel({
            presets: ['@babel/env']
        }))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/scripts"))
});




gulp.task("buildHTML",()=>{
	gulp.src("./src/pages/*.html").pipe(gulp.dest("./dist/pages"));
	gulp.src("./src/pages/*.js").pipe(gulp.dest("./dist/pages"));
});

gulp.task("buildCSS",()=>{
//	gulp.src("./src/styles/*.css")
	gulp.src("./src/styles/*.scss")	//将css变成scss，因为再styles的文件下已经没有css文件
//	.pipe(cleancss())
	.pipe(sass())
	.pipe(gulp.dest("./dist/styles"));
});


//静态图   字体文件
gulp.task("buildstaticResource",()=>{
	gulp.src("./src/static/**/*.*").pipe(gulp.dest("./dist/static"));
})







//实时监听
gulp.task("watching",()=>{
	gulp.watch("./src/**/*.scss",["buildCSS"]);
	gulp.watch("./src/**/*.html",["buildHTML"]);
	gulp.watch("./src/**/*.js",["buildHTML"]);
	gulp.watch("./src/**/*.js",["buildJS"]);
})
//可是当


gulp.task('webserver',["watching"],function() {
gulp.src('dist')  //改成src的目的，读取哪一个目录，作为服务器启动的根目录 
    .pipe(webserver({
      livereload: true,	//热部署(我的服务器不需要重启,修改了以后不需要重启服务器,修改文件以后,在页面上能立刻看到效果)
//    directoryListing: true, //目录列表是否要展示
//    open: true,	//是否自动打开浏览器
      https:true,	//默认的是http开头打开的,如果希望是https开头打开的,则可以修改
//    port:10002,	//修改端口号
      proxies:[		//服务器代理
	      {
	     	source: '/listmozre',	//源地址
	      	target: 'https://m.lagou.com/listmore.json',
	      	// 服务器
	      }
      ]
    }));
});

gulp.task("build",["buildJS","buildHTML","buildCSS","buildstaticResource"])
