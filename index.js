var fs = require('fs');
var path = require('path');
var log4js = require('log4js');
log4js.configure({
	appenders:[{type:'console'}]		
});
var logger = log4js.getLogger('xapi');
var projectName = process.argv[2];
if(!projectName){
	logger.error('请输入项目名称');
	return;
}

if(!/^[a-z_A-Z0-9]+$/.test(projectName)){
	logger.error('项目名称只能包含英文、数字、下划线');
	return;
}

var dir = fs.mkdirSync(projectName);

var oldPath = path.dirname(process.mainModule.filename);
[
	"apiRouter.js",
	"app.js",
	"nginx.conf",
	"gulpfile.js",
	".jshintrc",
	// "gitignore",
	"pre-commit"
].forEach(function(item){
    fs.writeFileSync(path.join(projectName,item),fs.readFileSync(path.join(oldPath,item)));
});

// 创建目录common 和 api
fs.mkdirSync(path.join(projectName,"common"));
fs.mkdirSync(path.join(projectName,"api"));

fs.writeFileSync(path.join(projectName,"common","logger.js"),fs.readFileSync(path.join(oldPath,"common","logger.js")));
fs.writeFileSync(path.join(projectName,"api","sms.js"),fs.readFileSync(path.join(oldPath,"api","sms.js")));

var packageJson = require(path.join(oldPath,"package.js"));
packageJson.name = projectName;
fs.writeFileSync(path.join(projectName,"package.json"),JSON.stringify(packageJson,null,4));


var startJson = require(path.join(oldPath,"start.js"));

startJson.name = projectName;
fs.writeFileSync(path.join(projectName,"start.json"),JSON.stringify(startJson,null,4));

logger.info('项目文件生成完成，即将执行加载所需要的包资源');

const exec = require('child_process').exec;
logger.info('进入目录',path.join(process.cwd(),projectName));
logger.info('正在安装依赖包，请稍等...');
var npmExec = exec('npm install -d', {cwd:path.join(process.cwd(), projectName)}, function(error, stdout, stderr){
	if(error){
		return logger.error(`exec error: ${error}`);
	}
	logger.info(`npm install process: ${stdout}`);
	logger.error(`npm install error: ${stderr}`);
	require('child_process').execSync('git init', {cwd: path.join(process.cwd(),projectName),stdio: 'inherit'});
	logger.info("初始化git完成");
	//fs.linkSync(path.join(oldPath,"pre-commit"), path.join(projectName,".git/hooks/pre-commit"));
    fs.writeFileSync(path.join(projectName,".git/hooks/pre-commit"),fs.readFileSync(path.join(oldPath,"pre-commit")));
	fs.unlinkSync(path.join(projectName,"pre-commit"));
	//fs.linkSync(path.join(oldPath,"gitignore"), path.join(projectName,".gitignore"));
    fs.writeFileSync(path.join(projectName,".gitignore"),fs.readFileSync(path.join(oldPath,"gitignore")));
	logger.info("初始化git commit hook完成");	
	logger.info('************************************');
	logger.info(`即将启动server，请稍等`);
	require('child_process').execSync('node app', {cwd: path.join(process.cwd(),projectName),stdio: 'inherit'});
});
npmExec.stdout.pipe(process.stdout);
npmExec.stderr.pipe(process.stderr);
