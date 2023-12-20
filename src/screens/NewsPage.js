import React, { Component } from 'react'
import { getNewsByID } from '../api'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default class NewsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
    }
  }

  componentDidMount() {
    getNewsByID(this, this.props.match.params.id)

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header />
          <div className="component_top">
            {this.state.lang == 'uz'
              ? this.state.news.name_uz
              : this.state.news.name_ru}
          </div>
          <div className="component_data">{this.state.news.updated_date}</div>

          <div className="block_m">
            <div className="title_b">
              {this.state.lang == 'uz'
                ? this.state.news.name_uz
                : this.state.news.name_ru}
            </div>
            <img src={this.state.news.photo} alt="" />
            <p>
              <div
                className="text_on"
                dangerouslySetInnerHTML={{
                  __html:
                    this.state.lang == 'uz'
                      ? this.state.news.text_uz
                      : this.state.news.text_ru,
                }}
              ></div>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
