#! node
'use strict'

//脚手架文件路径

process.env.NODE_PATH=__dirname+'/../node_modules/'

const program= require('commander')

//当前版本
program.version(require('../package').version)

//使用方法
program.usage('<command>')

//init命令
program
    .command('init')
    .description('create a new project')
    .alias('i')
    .action(()=>{
        require('../command/init')()
    })

program.parse(process.argv)

// console.log(program.args)

if(!program.args.length){
    program.help()
}
