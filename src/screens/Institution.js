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
  getOrgType,
  getRegion,
  getScienceField,
  getScienceField2,
  getTnved,
} from '../api'

import {
  FaBuildingColumns
} from 'react-icons/fa'

export default class Institution extends React.Component {
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
      org_active: null,
      org_type_list: [],
      searchText: '',
    }
  }

  componentDidMount() {
    getFilterInstetutionEquipment(
      this,
      this.state.science_active,
      this.state.institution_list_active,
      this.state.region_list_active,
    )

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    getRegion(this, lang)
    getOrgType(this, lang)
    getTnved(this, lang)
    getFinance(this, lang)
    getInstitutionList(this, '', lang)
  }

  clearFilter() {
    getFilterInstetutionEquipment(this, 'undefined', 'undefined', 'undefined')

    document.getElementById('select').selectedIndex = 0
    document.getElementById('select2').selectedIndex = 0
    document.getElementById('select3').selectedIndex = 0
  }

  setFilter() {
    getFilterInstetutionEquipment(
      this,
      this.state.science_active,
      this.state.institution_list_active,
      this.state.region_list_active,
    )
  }

  setLanguage(lang) {
    this.setState({ lang: lang })

    getRegion(this, lang)
    getOrgType(this, lang)
    getTnved(this, lang)
    getFinance(this, lang)
    getInstitutionList(this, '', lang)
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top">
            {strings.header.menu.institutions}
          </div>
          <div className="search">
            <input
              type="text"
              onChange={(e) => this.setState({ searchText: e.target.value })}
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
                name=""
                id="select"
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
                id="select2"
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
                id="select3"
                onChange={(e) =>
                  this.setState({ science_active: e.target.value })
                }
              >
                <option value={'undefined'}>{strings.filter.text_3}</option>
                {this.state.org_type_list.map((item) => (
                  <option
                    selected={this.props.match.params.f_id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
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
            
          </div>
          <hr className='filter_bottom_line'/>
          <div className="block liner">
            <div className="block_row">
              {this.state.institutionEquipment
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
                    <div className="resident_top">
                        {/* <a href=""><FaBuildingColumns/></a> */}
                      <div className="r_l_top">
                        {/* <p className='r_l_top_text'>Institut</p> */}
                        {this.state.lang == 'uz'
                          ? item.organization_type_name_uz
                          : item.organization_type_name_ru}
                      </div>
                      {/* <div
                        className="r_l_bottom"
                        style={{
                          backgroundColor:
                            item.organization_type == 1
                              ? '#CB2F1E'
                              : item.organization_type == 2
                              ? '#5fc9e5'
                              : item.organization_type == 3
                              ? '#E5D65D'
                              : item.organization_type == 4
                              ? '#3F2CE5'
                              : null,
                        }}
                      >
                        {this.state.lang == 'uz'
                          ? item.name_uz.substring(0, 1)
                          : item.name_ru.substring(0, 1)}
                      </div> */}
                    </div>
                    <div className="resident_right">
                      <img
                        src={
                          item.logo == null
                            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nNU9EHr1BtZUHmEnQZXFSxcLaPARu8pCmETczEG33LlPrhFvPpKhH7H1MOcKGzRS-6Q&usqp=CAU'
                            : item.logo
                        }
                        alt=""
                      />
                      <h1>
                        {this.state.lang == 'uz' ? item.name_uz : item.name_ru}
                      </h1>
                      <p>
                        {this.state.lang == 'uz'
                          ? item.institution_name_uz
                          : item.institution_name_ru}
                      </p>
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
