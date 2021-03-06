module.exports = {
  "apps" : [{
    "name"   : "srs",
	"cwd": "./",
    "script" : "./app.js",
	"env": {
		"NODE_ENV":"prod"
	},
	"env_sit": {
		"NODE_ENV":"sit"
	},
	"watch":false,
	"ignore_watch":["[\\/\\\\]\\./","node_modules", "sessions",".git",".gitignore"],
	"exec_mode": "cluster_mode",
	"instances": 4
  }]
}
