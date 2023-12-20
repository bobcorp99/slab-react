import React, { Component } from 'react'
import { SiGmail } from 'react-icons/si'
import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

import { strings } from '../localozation'

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 'uz',
    }
  }

  componentDidMount() {
    let lang = localStorage.getItem('lang') || 'uz'
    this.setState({ lang: lang })
  }

  render() {
    return (
      <div className="footer">
        <div className="container_f">
          <div className="footer_logo">
            {' '}
            {/* <img
              src={require('../logo/Slab2.png')}
              alt=""
              className="logo_he2"
            /> */}
            <div className="footer_links">
              <a href="http://facebook.com" className="links">
                <FaFacebookF />
              </a>
              <a href="http://instagram.com" className="links">
                <FaInstagram />
              </a>
              <a href="http://t.me" className="links">
                <FaTelegram />
              </a>
              <a href="http://whatsapp.com" className="links">
                <FaYoutube />
              </a>
              {/* <a href="http://gmail.com" className="links">
              <SiGmail />
            </a> */}
            </div>
          </div>

          <div className="footer_contacts">
            <div className='footer_menu_title'>
              {this.state.lang == 'uz'
                ? "Bog’lanish"
                : 'Связаться'}
            </div>
            <p style={{ lineHeight: 2 }}>

              <b> {strings.contacts.text_left_1}:</b>{' '}
              {strings.contacts.text_right_1}<br />{' '}

              <b> {strings.contacts.text_left_2}: </b> <a href="tel:+998 (71) 203-32-23">+998 (71) 203-32-23</a> <br />
              <b> {strings.contacts.text_left_3}:</b> <a href="mailto:info@mininnovation.uz">info@mininnovation.uz</a>
            </p>
          </div>

          <div className="footer_menu">
            <div className='footer_menu_title'>
              {this.state.lang == 'uz'
                ? "Sayt xaritasi"
                : 'Карта сайта'}
            </div>
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
                <NavLink to="/news"> {strings.header.menu.news}</NavLink>
              </li>
              <li>
                <NavLink to="/about"> {strings.header.menu.about}</NavLink>
              </li>
              <li>
                <NavLink to="/contact">{strings.header.menu.contacts}</NavLink>
              </li>
            </ul>
          </div>

        </div>
        <div className="footer_info">
          {this.state.lang == 'uz'
            ? "Sayt pilot ish rejimida ishlaydi. Slab fondining eski veb-saytiga o'ting"
            : '  Сайт функционирует в режиме опытно-промышленной эксплуатации. Перейти на старый сайт Фонда Slab'}
        </div>
      </div>
    )
  }
}
