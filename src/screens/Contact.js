import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'
import {
  FaAddressBook
} from 'react-icons/fa'

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header />
          <hr class="filter_bottom_line"></hr>
          
          <div className="component_top"><FaAddressBook/> {strings.contacts.title} </div>
          <p style={{ lineHeight: 2, marginTop: 40 }}>
            <b
              style={{
                fontSize: 24,
                marginTop: 10,

                display: 'block',
              }}
            >
              {strings.contacts.span}
            </b>{' '}
            <b> {strings.contacts.text_left_1}:</b>{' '}
            {strings.contacts.text_right_1}
            Университетская, дом 7 <br />{' '}
            <b> {strings.contacts.text_left_2}: </b> +998 (71) 203-32-23 <br />
            <b> {strings.contacts.text_left_2}:</b> info@mininnovation.uz
          </p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.164623273241!2d69.20794699999999!3d41.3487754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d755132b921%3A0x3d2c94a22bdea876!2z0JzQuNC90LjRgdGC0LXRgNGB0YLQstC-INCY0L3QvdC-0LLQsNGG0LjQvtC90L3QvtCz0L4g0KDQsNC30LLQuNGC0LjRjyDQoNC10YHQv9GD0LHQu9C40LrQuCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1sru!2s!4v1654300714863!5m2!1sru!2s"
            width="100%"
            height="750"
            style={{ border: 0, marginTop: 20 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <Footer />
      </div>
    )
  }
}
