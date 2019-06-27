module.exports = {
  Component: compoenntName => {
  return `
import React, { Component } from 'react'
import axios from 'axios'
import toast from '@winman-f2e/rc/lib/toast'

export default class ${compoenntName} extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <div></div>
    )
  }
}`},
  PureComponent: compoenntName => {
    return `
import React, { Component } from 'react'
import axios from 'axios'
import toast from '@winman-f2e/rc/lib/toast'

export default class ${compoenntName} extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <div></div>
    )
  }
}`}, 
  reactHook: compoenntName => {
    return `
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import toast from '@winman-f2e/rc/lib/toast'

export default function ${compoenntName}() {

  useEffect(() => {

  })

  return (
    <div></div>
  )
}`}
}