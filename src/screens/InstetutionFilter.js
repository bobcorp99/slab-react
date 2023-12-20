import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'
import {
  getFilterInstetutionEquipment,
  getFinance,
  getInstitution,
  getInstitution4,
  getInstitutionList,
  getFilterInstetutionIndicator,
  getFilterInstetutionRequest,
  getOrgType,
  getRegion,
  getScienceField,
  getScienceField2,
  getTnved,
  getPublicScience,
} from '../api'

export default class InstitutionFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution_list2: [],
      region_list: [],
      science: [],
      tnved_list: [],
      finance: [],
      institution_list: [],
      institution: [],
      institution_list_active: undefined,
      region_list_active: undefined,
      science_active: undefined,

      institutionEquipment: [],
      institutionRequest: [],
      institutionIndicator: [],
      org_active: null,
      org_type_list: [],
      searchText: '',

      institutionFilterAll: [],

      public_science: [],
    }
  }

  componentDidMount() {
    this.props.match.params.typeid == 1
      ? getFilterInstetutionEquipment(
          this,
          this.state.science_active,
          this.state.institution_list_active,
          this.state.region_list_active,
        )
      : this.props.match.params.typeid == 2
      ? getPublicScience(this)
      : this.props.match.params.typeid == 3
      ? getFilterInstetutionRequest(
          this,
          this.state.science_active,
          this.state.institution_list_active,
          this.state.region_list_active,
        )
      : getFilterInstetutionEquipment(
          this,
          this.state.science_active,
          this.state.institution_list_active,
          this.state.region_list_active,
        )
    getRegion(this)
    getOrgType(this)
    getTnved(this)
    getFinance(this)
    getInstitutionList(this)

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })
  }

  setFilter() {
    this.props.match.params.typeid == 1
      ? getFilterInstetutionEquipment(
          this,
          this.state.science_active,
          this.state.institution_list_active,
          this.state.region_list_active,
        )
      : this.props.match.params.typeid == 2
      ? getPublicScience(this)
      : this.props.match.params.typeid == 3
      ? getFilterInstetutionRequest(
          this,
          this.state.science_active,
          this.state.institution_list_active,
          this.state.region_list_active,
        )
      : getFilterInstetutionEquipment(
          this,
          this.state.science_active,
          this.state.institution_list_active,
          this.state.region_list_active,
        )
  }

  setLanguage(lang) {
    this.setState({ lang: lang })
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top">
            {this.props.match.params.typeid == 1
              ? strings.home.headers.text_2
              : this.props.match.params.typeid == 2
              ? strings.home.headers.text_3
              : this.props.match.params.typeid == 3
              ? strings.home.headers.text_4
              : null}
          </div>
          <div className="search">
            <input
              type="text"
              onChange={(e) => this.setState({ searchText: e.target.value })}
              placeholder={strings.filter.search}
            />
          </div>
          {this.props.match.params.typeid !== '2' ? (
            <div className="filters">
              <div className="filter_header">{strings.filter.text}</div>
              <div className="filter_row">
                <select
                  name=""
                  id=""
                  onChange={(e) =>
                    this.setState({ institution_list_active: e.target.value })
                  }
                >
                  <option value={'undefined'}>{strings.filter.text_1}</option>
                  {this.state.institution_list.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
                <select
                  onChange={(e) =>
                    this.setState({ region_list_active: e.target.value })
                  }
                >
                  <option value={'undefined'}>{strings.filter.text_2}</option>
                  {this.state.region_list.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
                <select
                  onChange={(e) =>
                    this.setState({ science_active: e.target.value })
                  }
                >
                  <option value={'undefined'}>{strings.filter.text_3}</option>
                  {this.state.org_type_list.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
                {/* <select>
                {this.state.tnved.map((item) => (
                  <option>{item.name}</option>
                ))}
              </select> */}
                {/* <select>
                {this.state.finance.map((item) => (
                  <option>{item.name}</option>
                ))}
              </select> */}
              </div>
              <a href="#" onClick={() => this.setFilter()}>
                {strings.filter.submit}
              </a>
            </div>
          ) : null}
          <div className="block liner">
            <div className="block_row">
              {this.props.match.params.typeid !== '2'
                ? this.state.institutionFilterAll
                    .filter((item2) =>
                      this.state.lang == 'uz'
                        ? item2.name_uz
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase())
                        : item2.name_ru
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase()),
                    )
                    .map((item, i) => (
                      <NavLink
                        to={`/institutionpage/1/${item.id}/`}
                        className="resident_item"
                      >
                        <div className="resident_left">
                          <div className="r_l_top">
                            {this.state.lang == 'uz'
                              ? item.organization_type_name_uz
                              : item.organization_type_name_ru}
                          </div>
                          <div
                            className="r_l_bottom"
                            style={{
                              backgroundColor:
                                i == 0 ? '#CB2F1E' : i == 2 ? '#5fc9e5' : null,
                            }}
                          >
                            {this.state.lang == 'uz'
                              ? item.name_uz.substring(0, 1)
                              : item.name_ru.substring(0, 1)}
                          </div>
                        </div>
                        <div className="resident_right">
                          {this.props.match.params.typeid == 1 ? (
                            <div className="count_data">
                              {item.equipment_count}
                            </div>
                          ) : (
                            <div className="count_data">
                              {item.request_count}
                            </div>
                          )}
                          <img
                            src={
                              item.logo == null
                                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nNU9EHr1BtZUHmEnQZXFSxcLaPARu8pCmETczEG33LlPrhFvPpKhH7H1MOcKGzRS-6Q&usqp=CAU'
                                : item.logo
                            }
                            alt=""
                          />
                          <h1>
                            {this.state.lang == 'uz'
                              ? item.name_uz
                              : item.name_ru}
                          </h1>
                          <p>
                            {this.state.lang == 'uz'
                              ? item.institution_name_uz
                              : item.institution_name_ru}
                          </p>
                        </div>
                      </NavLink>
                    ))
                : this.state.public_science
                    .filter((item2) =>
                      this.state.lang == 'uz'
                        ? item2.name_uz
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase())
                        : item2.name_ru
                            .toLowerCase()
                            .includes(this.state.searchText.toLowerCase()),
                    )
                    .map((item, i) => (
                      <NavLink
                        to={`/institutionf/${item.id}/`}
                        className="resident_item_scence"
                      >
                        <div className="resident_right">
                          <div className="count_data">
                            {item.equipment_count}
                          </div>

                          <h1>
                            {this.state.lang == 'uz'
                              ? item.name_uz
                              : item.name_ru}
                          </h1>
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
