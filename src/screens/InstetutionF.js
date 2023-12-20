import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'
import {
  getEquipment,
  getFinance,
  getInstitution,
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

      loader: true,
      filter: null,
    }
  }

  componentDidMount() {
    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })
    getInstitution4(this, lang)
    getRegion(this, lang)
    getScienceField(this)
    getTnved(this, lang)
    getFinance(this, lang)
    getEquipment(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.props.match.params.f_id,
      lang,
    )
    getInstitutionList(this, '', lang)
    getScienceField2(this, lang)
  }

  setLanguage(lang) {
    this.setState({ lang: lang })

    getInstitution4(this, lang)
    getRegion(this, lang)
    getScienceField(this)
    getTnved(this, lang)
    getFinance(this, lang)
    getEquipment(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.props.match.params.f_id,
      lang,
    )
    getInstitutionList(this, '', lang)
    getScienceField2(this, lang)
  }

  setFilter() {
    getEquipment(
      this,
      this.state.filter,
      this.state.org_id_active,
      this.state.institution_active,
      this.state.science_active,
    )
  }

  clearFilter() {
    getEquipment(this, this.state.filter, 'undefined', 'undefined', 'undefined')

    document.getElementById('select').selectedIndex = 0
    document.getElementById('select3').selectedIndex = 0
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="component_top"> {strings.header.menu.equipment} </div>
          <div className="search">
            <input
              onChange={(e) => this.setState({ searchText: e.target.value })}
              type="text"
              placeholder={strings.filter.search}
            />
          </div>
          <div className="filters">
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
                id="select"
                onChange={(e) =>
                  this.setState({ science_active: e.target.value })
                }
              >
                <option value={'undefined'}>{strings.filter.text_4}</option>
                {this.state.science.map((item, i) => (
                  <option
                    key={i}
                    selected={item.id == this.props.match.params.f_id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
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
                        {this.state.institution
                          .filter((item2) => item2.id == item.organisation)
                          .map((item3) =>
                            item3.institution_name.substring(0, 20),
                          )}
                      </div>
                      {/* <div
                        className="r_l_bottom"
                        style={{
                          backgroundColor:
                            item.equipment == 1
                              ? '#CB2F1E'
                              : item.equipment == 2
                              ? '#5fc9e5'
                              : item.equipment == 3
                              ? '#E5D65D'
                              : item.equipment == 4
                              ? '#3F2CE5'
                              : null,
                        }}
                      >
                        {item.name.substring(0, 1)}
                      </div> */}
                    </div>
                    <div className="resident_right">
                      <h1>{item.name}</h1>
                      <div className="text_flex">
                        <p>{item.organisation_name}</p>
                        <p>{item.equipment_name}</p>
                        <p>{item.lab_name}</p>
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
