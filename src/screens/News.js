import React, { Component } from 'react'
import { getNews } from '../api'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'

export default class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      searchText: '',
    }
  }

  componentDidMount() {
    getNews(this)
    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })
  }

  setLanguage(lang) {
    this.setState({ lang: lang })
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top"> {strings.header.menu.news} </div>
          <div className="search">
            <input
              onChange={(e) => this.setState({ searchText: e.target.value })}
              type="text"
              placeholder={strings.filter.search}
            />
          </div>

          <div className="block liner mt--10">
            <div className="block_row">
              {this.state.news
                .filter((item2) =>
                  item2.name
                    .toLowerCase()
                    .includes(this.state.searchText.toLowerCase()),
                )
                .map((item) => (
                  <NavLink to={`/newspage/${item.id}`} className="new_item">
                    <div className="new_img">
                      <img src={item.photo} alt="" />
                    </div>
                    <div className="new_info">
                      <h3>
                        {this.state.lang == 'uz'
                          ? item.name_uz.slice(0, 30)
                          : item.name_ru.slice(0, 30)}
                      </h3>
                      <p>
                        <div
                          className="text_on"
                          dangerouslySetInnerHTML={{
                            __html:
                              this.state.lang == 'uz'
                                ? item.text_uz.slice(0, 40)
                                : item.text_ru.slice(0, 40),
                          }}
                        ></div>
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <a href="">{strings.more}</a>
                        <span style={{ opacity: 0.6, fontSize: 13 }}>
                          {item.updated_date}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
