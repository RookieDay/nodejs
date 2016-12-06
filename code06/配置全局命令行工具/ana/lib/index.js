'use strict'
const fs = require('fs');
const path = require('path');
const structure = require('./data').items;
// dos--->ana init blog ,init属于 第二个参数
let args = process.argv.slice(2);
let cmd =args[0];
// let structure = {
// 	name:'',
// 	type:'',
// }
switch (cmd) {
	case 'init':
		let projectName = args[1];
		var rootName = `./${projectName}`;
		fs.mkdir(rootName,(err)=>{
			if(err){
				throw  err;
			}
			// console.log('success')
			structure.forEach((item)=>{
				let type = item.type;
				if(type === 'dir'){
					fs.mkdir(`${rootName}/${item.name}`,(err) =>{
						if(err){
							throw err;
						}
					})
					console.log(`${rootName}/${item.name}`);
				}else if (type === 'file') {
					fs.writeFile(`${rootName}/${item.name}`,item.content,(err) =>{
						if(err){
							console.log('failed')
							throw err;
						}
					})
					console.log(`${rootName}/${item.name}`);
				}
			})
		})
		// console.log('init')
		break;
	case 'help':
		// console.log('help')
		break;
	case '--version':
		// console.log('version')
		break;
	case'-v':
		// console.log('-v')
		break;
	default:
		console.log('Wrong support')
		break;
	}



