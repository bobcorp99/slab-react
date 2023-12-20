import React, { Component } from 'react'
import Pagination from 'rc-pagination'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'
import {
  getEquipment,
  getFinance,
  // getInstitution,
  getInstitution4,
  getInstitutionList,
  getRegion,
  getScienceField,
  getScienceField2,
  getTnved,
} from '../api'

export default class Equipment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      institution_info: {
        description: '',
        name: '',
        organisation_name: '',
        organisation: '',
        short_name_ru: '',
        short_name_uz: '',
      },
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
      science_active: undefined,
      loader: true,
      filter: null,

      page: 1,
      total: 0,
      page_size: 15,
    }
  }

  componentDidMount() {
    let lang = localStorage.getItem('lang')
    getEquipment(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
      lang,
      {
        page: this.state.page,
        page_size: this.state.page_size
      }
    )

    this.setState({ lang: lang })

    getInstitution4(this, lang)

    getInstitutionList(this, '', lang)
    getScienceField2(this, lang)
    getRegion(this, lang)
    getScienceField(this, lang)
    getTnved(this, lang)
    getFinance(this, lang)
  }

  setLanguage(lang) {
    this.setState({ lang: lang })
    getEquipment(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
      lang,
      {
        page: this.state.page,
        page_size: this.state.page_size
      }
    )

    getInstitution4(this, lang)
    getInstitutionList(this, '', lang)
    getScienceField2(this, lang)
    getRegion(this, lang)
    getScienceField(this, lang)
    getTnved(this, lang)
    getFinance(this, lang)
  }

  setFilter() {
    this.setState({ page: 1 })
    getEquipment(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
      this.state.lang,
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

    getEquipment(
      this,
      null,
      undefined,
      undefined,
      undefined,
      this.state.lang,
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
    getEquipment(
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

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top">
            {strings.header.menu.equipment}

          </div>
          <div className="search">
            <input
              onChange={(e) => this.setState({ searchText: e.target.value })}
              type="text"
              placeholder={strings.filter.search}
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
                  href="#"
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
          <hr className='filter_bottom_line' />

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
                this.state.equipment.filter((item2) =>
                  item2.name
                    .toLowerCase()
                    .includes(this.state.searchText.toLowerCase()),
                ).length == 0 ? (
                  <div className="error_mes">
                    So‘rovingiz bo‘yicha hech narsa topilmadi
                  </div>
                ) : null
              ) : null}
              {this.state.equipment
                .filter((item2) =>
                  item2.name
                    .toLowerCase()
                    .includes(this.state.searchText.toLowerCase()),
                )
                .map((item, i) => (

                  <NavLink
                    to={'/equipmentpage/0/' + item.id + '/'}
                    className="resident_item"
                  >
                    <div className="resident_top">
                      <div className="r_l_top">
                        <h4>
                          {this.state.lang == 'uz'
                            ? item.name
                            : item.name}
                        </h4>{/* Example: stock_number, contition, manufecture_country_name */}
                        {/* {this.state.institution
                          .filter((item2) => item2.id == item.organisation)
                          .map((item3) =>
                            item3.short_name.substring(0, 24),
                          )} */}
                      </div>
                    </div>
                    <div className="resident_right">

                      <div className="top_cont">
                        <h1>{item.condition}</h1>
                        <div className='cont_mini'>
                          <span>{this.state.lang == 'uz'
                            ? 'soni '
                            : 'кол '} </span>
                          <h1>{item.quantity}</h1>
                        </div>
                      </div>

                      <div className="text_flex">
                        <p>{this.state.institution
                          .filter((item2) => item2.id == item.organisation)
                          .map((item3) =>
                            item3.short_name,
                          )}</p>

                        <p>{item.organisation_name}</p>
                        <p className='text_flex_desc'>{item.description}</p>

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
