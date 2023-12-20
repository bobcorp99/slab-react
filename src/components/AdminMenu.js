import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import {
  FiHome,
  FiBriefcase,
  FiPrinter,
  FiThumbsUp,
  FiTrendingUp,
  FiSettings,
  FiUsers,
  FiPhoneCall,
  FiMail,
  FiServer,
} from 'react-icons/fi'
import {
  getAdminlabs,
  getAdminObr2,
  getAdminOrg,
  getAdminServive,
  getAdminZayaviteli,
  getAdminZayavki,
  getEquipment,
} from '../api'

export default class AdminMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 0,
      user: this.props.user,
      labs: [],
      equipment: [],
      institution: [],
      service: [],
      zayaviteli: [],
      zayavki: [],
      organisation: null,
    }
  }

  componentDidMount() {
    getAdminServive(this)
    getAdminlabs(this)
    getAdminObr2(this, this.state.filter)
    getAdminOrg(this, this.state.filter)
    getAdminZayaviteli(this)
    getAdminZayavki(this)
    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })
  }

  render() {
    return (
      <div className="admin_menu">
        <div className="admin_logo">Slab</div>
        {/* <div className="admin_user_name">
          <div className="user_icon">
            <img
              src="https://esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-6.png"
              alt=""
            />
          </div>
          <div className="user_name">
            <p>
              {this.props.user?.first_name + ' ' + this.props.user?.last_name}
            </p>
            <span>{this.props.user?.role}</span>
            <h3>
              {' '}
              {this.state.institution
                .filter((item2) => item2.id == this.state.organisation)
                .map((item3) => item3.name)}
            </h3>
          </div>
        </div> */}

        <ul>
          <div className="admin_top_text">Bosh sahifa</div>
          <li>
            <NavLink to="/dashboard/main">
              <div className="a_menu_svg">
                <FiHome />
              </div>{' '}
              Bosh sahifa{' '}
            </NavLink>
          </li>
          <div className="admin_top_text">Tashkilot ma'lumotlari</div>

          {this.props.user?.role == 'moderator' ? (
            <div>
              {' '}
              <li>
                <NavLink to="/dashboard/org">
                  {' '}
                  <div className="a_menu_svg">
                    <FiPrinter />
                  </div>
                  Tashkilotlar
                  {this.state.institution.filter(
                    (item) => item.disabled == true,
                  ).length == 0 ? null : (
                    <span>
                      {
                        this.state.institution.filter(
                          (item) => item.disabled == true,
                        ).length
                      }
                    </span>
                  )}
                </NavLink>
              </li>
            </div>
          ) : null}
          <li>
            <NavLink to="/dashboard/lab">
              <div className="a_menu_svg">
                <FiBriefcase />{' '}
              </div>
              Laboratoriyalar{' '}
              {this.state.labs.filter((item) => item.disabled == true).length ==
              0 ? null : (
                <span>
                  {this.state.labs.filter((item) => item.disabled == true)
                    .length == 0
                    ? null
                    : this.state.labs.filter((item) => item.disabled == true)
                        .length}
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/ob">
              {' '}
              <div className="a_menu_svg">
                <FiServer />
              </div>
              Uskunalar{' '}
              {this.state.equipment.filter((item) => item.disabled == true)
                .length == 0 ? null : (
                <span>
                  {
                    this.state.equipment.filter((item) => item.disabled == true)
                      .length
                  }
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/servise">
              <div className="a_menu_svg">
                <FiThumbsUp />
              </div>{' '}
              Xizmatlar
              {this.state.service.filter((item) => item.disabled == true)
                .length == 0 ? null : (
                <span>
                  {
                    this.state.service.filter((item) => item.disabled == true)
                      .length
                  }
                </span>
              )}
            </NavLink>
          </li>

          <div className="admin_top_text">Arizalar</div>

          <li>
            <NavLink to="/dashboard/zayavki">
              <div className="a_menu_svg">
                <FiMail />
              </div>{' '}
              Murojjatlar{' '}
              {this.state.zayavki.length == 0 ? null : (
                <span>
                  {
                    this.state.zayavki.filter((item) => item.status == 'wait')
                      .length
                  }
                </span>
              )}
            </NavLink>
          </li>
        </ul>
        {/* <div className="div_but">
          <ul>
            <li>
              <a href="#" onClick={() => this.setState({ type: 1 })}>
                Админка модератора
              </a>
            </li>
            <li>
              <a href="#" onClick={() => this.setState({ type: 2 })}>
                Админка организации{' '}
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    )
  }
}
