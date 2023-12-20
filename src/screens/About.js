import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header />
          <div className="component_top">{strings.about.title} </div>
          <div class="component_data"></div>
          <div className="image_post">
            <img
              src="https://avatars.mds.yandex.net/get-altay/2755030/2a00000172c5edf71835423016a5bff55841/XXL"
              alt=""
            />
          </div>
          <p
            style={{
              lineHeight: 1.9,
              marginTop: 20,
              marginLeft: 150,
              marginRight: 150,
              opacity: 0.7,
            }}
          >
            {strings.about.text}
          </p>
        </div>
        <Footer />
      </div>
    )
  }
}
