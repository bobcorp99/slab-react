import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import {
  FiHome,
  FiBriefcase,
  FiPrinter,
  FiThumbsUp,
  FiTrendingUp,
  FiSettings,
  FiSearch,
  FiBell,
  FiLogOut,
} from 'react-icons/fi'
import { getAdminObr, getAdminOrg } from '../api'

export default class AdminHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      institution: [],
    }
  }

  componentDidMount() {
    getAdminOrg(this)
  }

  render() {
    return (
      <div className="admin_header">
        <div className="a_header_left">
          {/* <div className="search_component">
            <FiSearch />
            <input type="text" placeholder="Qidirmoq..." />
          </div> */}
          <div className="admin_user_name">
            <div className="user_icon">
              <img src="https://i.stack.imgur.com/dr5qp.jpg" alt="" />
            </div>
            <div className="user_name">
              <p>
                {this.props.user?.first_name + ' ' + this.props.user?.last_name}
              </p>
              <span>
                {this.props.user?.role == 'assistant'
                  ? 'Tashkilot Admini '
                  : 'Moderator'}
              </span>
            </div>
            <div className="user_data_2">
              <div className="u_data_block">
                {this.props.user?.role == 'assistant' ? null : `Moderator\n\n`}{' '}
                {this.props.user?.role == 'assistant'
                  ? null
                  : this.props.user?.first_name +
                    ' ' +
                    this.props.user?.last_name +
                    `\n\n`}{' '}
                {this.props.user?.role == 'assistant'
                  ? null
                  : this.props.user?.username + `\n\n`}
                {this.state.institution
                  .filter((item) => item.id == this.props.user?.organisation)
                  .map((item2) => (
                    <div className="application_box_item">
                      {item2.contact_name} <br />
                      {item2.name} <br /> <br />
                      {item2.region_name} {item2.address_line}, {item2.zip_code}{' '}
                      <br />
                      {item2.contact_phone}, {item2.contact_email}
                    </div>
                  ))}{' '}
                <br />
                <NavLink to={'/dashboard/changepassword/'}>
                  Parolni o`zgartirish
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="a_header_right">
          <div className="notification">
            {/* <a href="#" onClick={() => this.props.notificationStatus()}>
              {' '}
              <FiBell />
              <div className="count_beel">
                {
                  this.props.zayavki.filter(
                    (item2) =>
                      item2.status == 'wait' || item2.status == 'agreed',
                  ).length
                }
              </div>
            </a> */}
          </div>
          <NavLink to="/" onClick={() => localStorage.clear()}>
            <FiLogOut />
          </NavLink>
        </div>
      </div>
    )
  }
}
