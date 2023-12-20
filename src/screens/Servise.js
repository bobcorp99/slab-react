import React, { Component } from 'react'
import Pagination from 'rc-pagination'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'
import {
  getFinance,
  getInstitution,
  getInstitution4,
  getInstitutionList,
  getRegion,
  getScienceField,
  getScienceField2,
  getService,
  getTnved,
} from '../api'

export default class Servise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: [],
      science: [],
      tnved: [],
      finance: [],
      service: [],
      institution_list: [],
      science: [],
      institution_list2: [],
      institution: [],
      searchText: '',
      institution_list_active: undefined,

      loader: true,
      equipment: [],
      equipment_active: undefined,

      org_id_active: undefined,
      institution_active: undefined,
      science_active: undefined,

      page: 1,
      total: 0,
      page_size: 12,
    }
  }

  componentDidMount() {
    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    getInstitution4(this, lang)

    getRegion(this, lang)
    getTnved(this, lang)
    getFinance(this, lang)
    getInstitutionList(this, '', lang)
    getScienceField2(this, lang)
    getService(
      this,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
      {
        page: this.state.page,
        page_size: this.state.page_size
      }
    )

  }

  setFilter() {
    this.setState({ page: 1 })
    getService(
      this,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
      {
        page: 1,
        page_size: this.state.page_size
      }
    )
  }

  clearFilter() {
    this.setState({
      page: 1,
      filter: null,
      org_id_active: undefined,
      institution_active: undefined,
      science_active: undefined
    })

    getService(
      this,
      null,
      undefined,
      undefined,
      undefined,
      {
        page: 1,
        page_size: this.state.page_size
      }
    )

    document.getElementById('select').selectedIndex = 0
    document.getElementById('select2').selectedIndex = 0
    document.getElementById('select3').selectedIndex = 0
  }

  onPageChange = (current) => {
    this.setState({ page: current })
    window.scrollTo(0, 0)
    getService(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
      this.state.lang,
      {
        page: current,
        page_size: this.state.page_size
      }
    )
  }

  setLanguage(lang) {
    this.setState({ lang: lang })

    getInstitution4(this, lang)

    getRegion(this, lang)
    getTnved(this, lang)
    getFinance(this, lang)
    getInstitutionList(this, lang)
    getScienceField2(this, lang)
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top"> {strings.header.menu.servise}</div>
          <div className="search">
            <input
              type="text"
              placeholder={strings.filter.search}
              onChange={(e) => this.setState({ searchText: e.target.value })}
            />
          </div>
          <div className="filters">

            <div className='filter_head'>

              <div className="filter_header">{strings.filter.text}
              </div>
              <div className="filter_bottom_flex">
                <a href="#" onClick={() => this.setFilter()}>
                  {strings.filter.submit}
                </a>
                <a
                  className="sec_fil_but"
                  href=""
                  onClick={() => this.clearFilter()}
                >
                  {strings.filter.cancel}
                </a>
              </div>

            </div>

            <div className="filter_row">
              <select
                id="select"
                onChange={(e) =>
                  this.setState({ org_id_active: e.target.value })
                }
              >
                <option value={'undefined'}>{strings.filter.text_1}</option>
                {this.state.institution_list.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
              <select
                id="select2"
                onChange={(e) =>
                  this.setState({ science_active: e.target.value })
                }
              >
                <option value={'undefined'}>{strings.filter.text_4}</option>
                {this.state.science.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
              <select
                id="select3"
                onChange={(e) =>
                  this.setState({ institution_active: e.target.value })
                }
              >
                <option value={'undefined'}>{strings.filter.text_5}</option>
                {this.state.institution.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

          </div>
          <hr className='filter_bottom_line'/>

          <div className="block liner">
            {this.state.loader == true ? (
              <div className="loader">
                <img
                  src={
                    'https://m-files.cdnvideo.ru/lpfile/7/d/d/7dde4abc28d869acae0d349319fdd7a9.gif'
                  }
                />
              </div>
            ) : null}
            <div className="block_row">
              {this.state.loader == false ? (
                this.state.service.filter((item2) =>
                  this.state.lang == 'uz'
                    ? item2.name_uz
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase())
                    : item2.name_ru
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase()),
                ).length == 0 ? (
                  <div className="error_mes">
                    So‘rovingiz bo‘yicha hech narsa topilmadi
                  </div>
                ) : null
              ) : null}
              {this.state.service
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
                    to={`/servisepage/0/${item.id}/`}
                    className="resident_item"
                  >
                    <div className="resident_top">
                        <p className='top_title'>{this.state.institution
                          .filter((item2) => item2.id == item.organisation)
                          .map((item3) =>
                            item3.institution_name
                          )}</p>
                      {/* <div
                        className="r_l_bottom"
                        style={{
                          backgroundColor: item.equipment[0]
                            ? '#CB2F1E'
                            : item.equipment[1]
                              ? '#5fc9e5'
                              : item.equipment[2]
                                ? '#E5D65D'
                                : item.equipment[3]
                                  ? '#3F2CE5'
                                  : null,
                        }}
                      >
                        {this.state.lang == 'ru'
                          ? item.name_ru.substring(0, 1)
                          : item.name_uz.substring(0, 1)}
                      </div> */}
                    </div>

                    <div className="resident_right">

                      <div className="resident_right_content">

                      <h1>
                        {' '}
                        {this.state.lang == 'ru' ? item.name_ru : item.name_uz}
                      </h1>
                      <p>
                        {this.state.lang == 'ru'
                          ? item.organisation_name
                          : item.organisation_name}
                      </p>
                      <p className='service_prname'>{item.equipment_name.map((item) => item.name)}</p>
                      <p>
                        {this.state.lang == 'ru'
                          ? item.organisation_name_ru
                          : item.organisation_name_uz}
                      </p>

                      </div>
                    </div>

                  </NavLink>
                ))}
              {this.state.total > 0 ? (
                <Pagination
                  current={this.state.page}
                  total={this.state.total}
                  pageSize={this.state.page_size}
                  onChange={this.onPageChange}
                  locale={strings.pagination}
                />
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
