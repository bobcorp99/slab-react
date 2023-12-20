import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { strings } from '../localozation'

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
import {
  FaTelegram,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneVolume,
  FaEnvelope,
  FaUserCircle,
  FaSignInAlt
} from 'react-icons/fa'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlinePlusCircle,
  AiOutlineUser,
  AiOutlineMenu,
} from 'react-icons/ai'

import {
  getAplicantions,
  equpmentZayavkaPost,
  getApplicatorInfo,
  getEquipment,
  getFileList,
  getInstitution,
  getInstitution4,
  getInstitutionByID,
  getInstitutionList,
  getRegionList,
  getServiseByID,
} from '../api'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 'uz',
      user: null,
      token: null,
      token1: 2,
      aplications: [],
      aplicator_info: [],
      institution: [],
      region: [],
      menu: false,
    }
  }

  componentWillMount() {
    let lang = localStorage.getItem('lang') || 'uz'

    strings.setLanguage(lang)

    this.setState({ lang: lang })
    if (localStorage.getItem('token')) {
      getApplicatorInfo(this)
    }
    getInstitution4(this, lang)
    getRegionList(this, '', lang)
    //getEquipment(this)
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    this.setState({ user: user || null })

    if (localStorage.getItem('token')) {
      getAplicantions(this)
    }

    this.setState({ token: localStorage.getItem('token') || null })
  }

  _onSetLanguage(text) {
    strings.setLanguage(text)
    this.setState({ lang: text })
    localStorage.setItem('lang', text)
    this.props.setLanguage(text);
  }

  render() {
    return (
      <div>

        <div className="header_contacts">
          <div className="header_top container">

            <div className="header_call">
              <FaPhoneVolume />
              <a className="call_link" href="tel:+998 (71) 203-32-23">+998 (71) 203-32-23</a>
              <FaEnvelope />
              <a className="call_link" href="mailto:info@mininnovation.uz">info@mininnovation.uz</a>
            </div>

          </div>


        </div>



        <div className="header">

          <div>
            <NavLink to="/" className="header_logo">
              <img
                src={require('../logo/Slab2.png')}
                alt=""
                className="logo_he"
              />
            </NavLink>
          </div>

          <div className="header_menu">
            <ul>
              <li>
                <NavLink to="/institution">
                  {strings.header.menu.institutions}
                </NavLink>
              </li>
              <li>
                <NavLink to="/servise">{strings.header.menu.servise}</NavLink>
              </li>
              <li>
                <NavLink to="/equipment">
                  {strings.header.menu.equipment}
                </NavLink>
              </li>
              <li>
                <NavLink to="/reference">
                  {strings.header.menu.reference}
                </NavLink>
              </li>
              <li>
                <NavLink to="/news"> {strings.header.menu.news}</NavLink>
              </li>
              <li>
                <NavLink to="/about"> {strings.header.menu.about}</NavLink>
              </li>
              <li>
                <NavLink to="/contact">{strings.header.menu.contacts}</NavLink>
              </li>
              {this.state.user?.role == 'applicant' ? (
                <li className="apli_f">
                  <NavLink to="/my_application">{strings.zayavka}</NavLink>
                  {this.state.aplications.filter(
                    (item2) =>
                      item2.status == 'approved' || item2.status == 'rejected',
                  ).length == 0 ? null : (
                    <div className="count_application">
                      {
                        this.state.aplications.filter(
                          (item2) =>
                            item2.status == 'approved' ||
                            item2.status == 'rejected',
                        ).length
                      }
                    </div>
                  )}
                </li>
              ) : null}
            </ul>
          </div>

          <div className="header_right">
            <div className="lang">
              <ul>
                <li>
                  <a
                    className={this.state.lang == 'uz' ? 'active' : null}
                    href="#"
                    onClick={() => this._onSetLanguage('uz')}
                  >
                    <img
                      src={require('../logo/uzb.png')}
                      alt='logo'
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={this.state.lang !== 'uz' ? 'active' : null}
                    onClick={() => this._onSetLanguage('ru')}
                  >
                    <img
                      src={require('../logo/rus.png')}
                      alt='logo'
                    />
                  </a>
                </li>
              </ul>
            </div>
            {this.state.token == null ? (
              <div className="header_right_all">
                <NavLink to="/login" className="">

                  <FaUserCircle title="Ro'yxatdan o'tish" className='login_button' />
                  {/* {strings.header.menu_right.button_1} */}
                </NavLink>
                <NavLink to="/login" className="">
                  <FaSignInAlt title='Kirish' className="signIn_button" />
                  {/* {strings.header.menu_right.button_2} */}
                </NavLink>
                <a
                  href="#"
                  onClick={() => this.setState({ menu: !this.state.menu })}
                  className="btn-white ml-10 mob_but"
                >
                  <AiOutlineMenu style={{ marginBottom: -1 }} />
                </a>
              </div>
            ) : (
              <div className="user_inf">
                {this.state.user?.role == 'applicant' ? (
                  <div to="/dashboard/lab" className="user_inf_name_p">
                    <div className="user_inf_icon">
                      <img
                        src="https://icon-library.com/images/google-user-icon/google-user-icon-21.jpg"
                        alt=""
                      />
                    </div>
                    <div className="user_inf_name">
                      <p>{this.state.user?.username}</p>
                      <span>
                        {this.props.user?.role == 'assistant'
                          ? strings.role.text_1
                          : this.props.user?.role == 'moderator'
                            ? strings.role.text_2
                            : strings.role.text_3}
                      </span>
                    </div>

                    <div className="user_data">
                      <div className="u_data_block">
                        {' '}
                        {this.state.aplicator_info.degree},{' '}
                        {this.state.aplicator_info.full_name} <hr />
                        {this.state.institution
                          .filter(
                            (item) =>
                              item.id == this.state.aplicator_info.organisation,
                          )
                          .map((item2) => item2.name)}{' '}
                        <hr />
                        {this.state.region
                          .filter(
                            (item) =>
                              item.id == this.state.aplicator_info.region,
                          )
                          .map((item2) => item2.name)}{' '}
                        {this.state.aplicator_info.address_line},{' '}
                        {this.state.aplicator_info.zip_code} <hr />
                        {this.state.aplicator_info.phone},{' '}
                        {this.state.aplicator_info.email} <br />
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink to="/dashboard/lab" className="user_inf_name_p">
                    <div className="user_inf_icon">
                      <img
                        src="https://icon-library.com/images/google-user-icon/google-user-icon-21.jpg"
                        alt=""
                      />
                    </div>
                    <div className="user_inf_name">
                      <p>{this.state.user?.username}</p>
                      <span>{this.state.user?.role}</span>
                    </div>
                  </NavLink>
                )}

                <NavLink
                  to="/login"
                  onClick={() => localStorage.clear()}
                  className="logout"
                >
                  <FiLogOut />
                </NavLink>
              </div>
            )}
          </div>

          {this.state.menu ? (
            <div className="header_menu_mob">
              <ul>
                <li>
                  <NavLink to="/institution">
                    {strings.header.menu.institutions}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/servise">{strings.header.menu.servise}</NavLink>
                </li>
                <li>
                  <NavLink to="/equipment">
                    {strings.header.menu.equipment}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/reference">
                    {strings.header.menu.reference}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news"> {strings.header.menu.news}</NavLink>
                </li>
                <li>
                  <NavLink to="/about"> {strings.header.menu.about}</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">{strings.header.menu.contacts}</NavLink>
                </li>

                {this.state.user?.role == 'applicant' ? (
                  <li className="apli_f">
                    <NavLink to="/my_application">{strings.zayavka}</NavLink>
                    {this.state.aplications.filter(
                      (item2) =>
                        item2.status == 'approved' || item2.status == 'rejected',
                    ).length == 0 ? null : (
                      <div className="count_application">
                        {
                          this.state.aplications.filter(
                            (item2) =>
                              item2.status == 'approved' ||
                              item2.status == 'rejected',
                          ).length
                        }
                      </div>
                    )}
                  </li>
                ) : null}
                <li>
                  <div className="lang">
                    <ul>
                      <li>
                        <a
                          className={this.state.lang == 'uz' ? 'active' : null}
                          href="#"
                          onClick={() => this._onSetLanguage('uz')}
                        >
                          Uz
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={this.state.lang !== 'uz' ? 'active' : null}
                          onClick={() => this._onSetLanguage('ru')}
                        >
                          Рус
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        {localStorage.getItem('continue_registration') ? (
          <div className="globalMessage">{strings.registration.register_warn} <NavLink to="/oneid_registration">{strings.registration.register_warn_call_to_action}</NavLink>.
          </div>
        ) : null}
      </div>
    )
  }
}
