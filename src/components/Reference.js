import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'
import {
  getEquipment,
  getEquipmentList,
  getFinance,
  getInstitution,
  getInstitution4,
  getInstitutionList,
  getRegion,
  getScienceField,
  getScienceField2,
  getTnved,
} from '../api'

export default class Reference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: [],
      science: [],
      tnved: [],
      finance: [],
      equipment: [],
      institution: [],
      institution_list: [],
      science: [],
      institution_list2: [],
      searchText: '',
      org_id_active: undefined,
      institution_active: undefined,
      science_active: this.props.match.params.f_id,

      loader: false,
      filter: null,

      tnved_list: [],
      data_list: [],

      active: 0,
    }
  }

  componentDidMount() {
    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    this.setState({
      active:
        this.props.match.params.id == undefined
          ? 0
          : this.props.match.params.id,
    })
    if (this.props.match.params.id == 1) {
      getTnved(this, this.state.lang)
    } else if (this.props.match.params.id == 2) {
      getEquipmentList(this)
    } else {
    }

    this._isMounted = true
    window.onpopstate = () => {
      this.setState({
        active: 0,
        data_list: [],
        tnved_list: [],
      })
    }
  }

  setLanguage(lang) {
    this.setState({ lang: lang })
  }

  setTvend() {
    this.setState({ active: 1 })
    getTnved(this, this.state.lang)
  }

  setGroup() {
    this.setState({ active: 2 })
    getEquipmentList(this)
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top"> {strings.header.menu.reference} </div>
          <div className="search">
            <input
              onChange={(e) => this.setState({ searchText: e.target.value })}
              type="text"
              placeholder={strings.filter.search}
            />
          </div>

          <div className="block liner">
            {this.state.active == 0 ? (
              <div className="block_row">
                <NavLink
                  to={'/reference/1'}
                  className="resident_item"
                  onClick={() => this.setTvend()}
                >
                  <div className="resident_top">
                    <div className="r_l_top">
                      {strings.equipmentpage.text_12.substring(0, 20)}
                    </div>
                    {/* <div
                      className="r_l_bottom"
                      style={{
                        backgroundColor: '#3F2CE5',
                      }}
                    >
                      {strings.equipmentpage.text_12.substring(0, 1)}
                    </div> */}
                  </div>
                  <div className="resident_right">
                    <h1>{strings.equipmentpage.text_12}</h1>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>
                </NavLink>
                <NavLink
                  to={'/reference/2'}
                  className="resident_item"
                  onClick={() => this.setGroup()}
                >
                  <div className="resident_top">
                    <div className="r_l_top">
                      {strings.equipmentpage.text_4.substring(0, 20)}
                    </div>
                    {/* <div
                      className="r_l_bottom"
                      style={{
                        backgroundColor: '#E5D65D',
                      }}
                    >
                      {strings.equipmentpage.text_4.substring(0, 1)}
                    </div> */}
                  </div>
                  <div className="resident_right">
                    <h1>{strings.equipmentpage.text_4}</h1>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>
                </NavLink>

              </div>
            ) : null}
            {this.state.loader == true ? (
              <div className="loader">
                <img
                  src={
                    'https://m-files.cdnvideo.ru/lpfile/7/d/d/7dde4abc28d869acae0d349319fdd7a9.gif'
                  }
                />
              </div>
            ) : null}

            {this.state.data_list
              .filter((item3) => item3.parent == null)
              .filter((item2) =>
                item2.name
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase()),
              )
              .map((item, i) => (
                <div>
                  <div className="resident_item_full">
                    <div className="resident_right">
                      <h1>
                        {item.code} {item.name}
                      </h1>
                      <div className="text_flex"></div>
                    </div>
                  </div>
                  {this.state.data_list
                    .filter((item3) => item3.parent == item.id)
                    .map((item2) => (
                      <div>
                        <div className="resident_item_ful pl2">
                          <div className="resident_right">
                            <h1>
                              {item2.code} {item2.name}
                            </h1>
                            <div className="text_flex"></div>
                          </div>
                        </div>
                        {this.state.data_list
                          .filter((item3) => item3.parent == item2.id)
                          .map((item4) => (
                            <div>
                              <div className="resident_item_ful pl3">
                                <div className="resident_right">
                                  <h1>
                                    {item4.code} {item4.name}
                                  </h1>
                                  <div className="text_flex"></div>
                                </div>
                              </div>
                              {this.state.data_list
                                .filter((item3) => item3.parent == item4.id)
                                .map((item5) => (
                                  <div>
                                    <div className="resident_item_ful pl4">
                                      <div className="resident_right">
                                        <h1>
                                          {item5.code} {item5.name}
                                        </h1>
                                        <div className="text_flex"></div>
                                      </div>
                                    </div>
                                    {this.state.data_list
                                      .filter(
                                        (item3) => item3.parent == item5.id,
                                      )
                                      .map((item) => (
                                        <div>
                                          <div className="resident_item_ful pl5">
                                            <div className="resident_right">
                                              <h1>
                                                {item.code} {item.name}
                                              </h1>
                                              <div className="text_flex"></div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
