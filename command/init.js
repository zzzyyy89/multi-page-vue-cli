'use strict'

const path=require('path')
const co=require('co')
const prompt=require('co-prompt')
const chalk=require('chalk')
const download=require('download-git-repo')
const ora=require('ora')
const exists = require('fs').existsSync
const rm = require('rimraf').sync

const rawName=process.argv[3]
const inPlace=!rawName||rawName==='.'
const name = inPlace ? path.relative('../', process.cwd()) : rawName
const to = path.resolve(rawName || '.')

function downloadAndCreate() {
    // console.log(name,to)
    let pn =prompt(`Project name?(${name})`)
    if(exists(to)) rm(to)
    const aliseName=pn||name
    const spinner=ora('download project')
    spinner.start()
    download('zzzyyy89/webpack-multi-page',to,{clone:false},e=>{
        spinner.stop()
        if(e){
            console.error(e)
        }
        process.exit()
    })
    // const spinner=ora('download project')
}

module.exports=()=>{
    co(function *() {
        if(inPlace||exists(to)){
            let ok=yield prompt(inPlace?`Create project in current directory?${chalk.blue('Y/n')}`:`Target directory exists. Continue?${chalk.blue('Y/n')}`)
            if(/[y|yes]/i.test(ok)){
                downloadAndCreate()
            }else {
                process.exit()
            }
        }else {
            downloadAndCreate()
        }
    })
}
