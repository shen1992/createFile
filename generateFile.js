#!/usr/bin/env node

const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

const reactTemplate = require('./template')

const resolve = (...file) => path.resolve(process.cwd(), ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

function generateFile(path, data) {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
  } else {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, 'utf8', err => {
        if (err) {
          errorLog(err.message)
          reject(err)
        } else {
          successLog('生成成功')
          resolve(true)
        }
      })
    })
  }
}

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function() {
      resolve(true)
    })
  })
}

function mkdirs(directory, callback) {
  const exists = fs.existsSync(directory)

  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'inputName',
      message: '请输入文件名:'
    },
    {
      type: 'list',
      name: 'template',
      message: '请选择react模板',
      choices: [
        {name: 'Component组件', value: 'Component'}, 
        {name: 'PureComponent组件', value: 'PureComponent'},
        {name: 'React Hook', value: 'reactHook'}
      ],
      default: ['Component']
    }
  ]).then(async function(res) {
    let {
      inputName, 
      template,
    } = res
    let conponentName = ''
    let fileName = ''
    const inputArr = inputName.split('/')
    fileName = inputArr[inputArr.length - 1]
    let index = fileName.indexOf('.')
    conponentName = fileName.slice(0, index)
    let selectTpl = reactTemplate[template]

    if (inputName.includes('/')) {
      let directory = inputArr.slice(0, inputArr.length - 1).join('/')

      log(`正在生成目录`)
      await dotExistDirectoryCreate(directory)
      log(`正在生成 react 文件`)
      await generateFile(resolve(inputName), selectTpl(conponentName))
    } else {
      log(`正在生成 react 文件`)
      await generateFile(resolve(inputName), selectTpl(conponentName))
    }
})
