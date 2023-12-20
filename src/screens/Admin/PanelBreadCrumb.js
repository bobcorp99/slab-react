import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  deleteItem,
  getAdminlabs,
  getAdminOrg,
  getInstitution,
  moderadorCheckPostLabs,
  moderadorCheckPutLabs,
  moderadorPostLabs,
} from '../../api'

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

export default class PanelBreadCrumb extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="PanelBreadCrumb">
        <div className="a_bread_crumb_title">{this.props.name}</div>
        <div className="a_bread_crumb_links">
          <ul>
            <li>
              <NavLink className="active" to={this.props.back}>
                {this.props.main_name}
              </NavLink>
            </li>
            <li>
              <a href="#">{this.props.name}</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
