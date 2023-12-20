import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiBriefcase,
  FiPrinter,
  FiThumbsUp,
  FiTrendingUp,
  FiTrash2,
  FiEdit,
  FiPlus,
} from 'react-icons/fi'

import ScrollAnimation from 'react-animate-on-scroll'

import { BsArrowDownUp } from 'react-icons/bs'

import { SiMicrosoftexcel } from 'react-icons/si'
import moment from 'moment'

export default class BreadCrumb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 'uz',
    }
  }

  async componentDidMount() {
    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })
  }

  render() {
    return (
      <div className="BreadCrumb">
        <div className="bread_crumb_links">
          <ul>
            <li>
              <NavLink className="active" to={'/'}>
                {this.props.home_name}
              </NavLink>
            </li>
            <li>
              <NavLink className="active" to={this.props.back}>
                {this.props.main_name}
              </NavLink>
            </li>
            {this.props.name == null ? null : (
              <li>
                <a className='active_navbar' href="#">{this.props.name}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
