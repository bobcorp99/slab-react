import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { NavLink } from 'react-router-dom'

import { strings } from '../localozation'
import {
  aplicationAgree,
  aplicationDisAgree,
  equpmentZayavkaPost,
  getApplicatorInfo,
  getEquipment,
  getInstitution,
  getInstitution4,
  getInstitutionByID,
  getInstitutionList,
  getRegionList,
  getServiseByID,
} from '../api'
import moment, { now } from 'moment'

export default class Application extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution_info: {},
      institution_info2: { equipment: [] },
      institution_list2: [{ id: 0 }],
      institution_list: [],
      equipment: [],

      education_flag: '',
      result_flag: '',
      requested_date: moment().format('YYYY-MM-DD'),
      once_flag: false,
      result_flag: false,
      instruction: '',
      purpose: '',
      duration_days: '',

      institution: [],

      role: null,

      data: [],
      aplicator_info: [],
      region: [],
    }
  }

  sendData() {
    this.state.instruction == '' ||
    this.state.name == '' ||
    this.state.purpose == '' ||
    this.state.requested_date == '' ||
    this.state.duration_days == ''
      ? this.setState({ error: true })
      : equpmentZayavkaPost(
          this,
          this.props.match.params.item_id,
          this.state.institution_info?.organisation,
          this.state.equipment
            .filter((item) =>
              this.state.institution_info.equipment.includes(item.id),
            )
            .map((item) => item.id),
          this.state.purpose,
          this.state.user,
          this.state.once_flag,
          this.state.instruction,
          this.state.duration_days,
          this.state.education_flag,
          this.state.result_flag,
          this.state.requested_date,
        )
  }

  handle_change = (names, e) => {
    const name = names
    const value = e
    this.setState((prevstate) => {
      const newState = { ...prevstate }
      newState[name] = value
      return newState
    })
  }

  setLanguage(lang) {
    this.setState({ lang: lang })

    getApplicatorInfo(this, lang)
    aplicationAgree(this, this.props.match.params.item_id, lang)
    aplicationDisAgree(this, this.props.match.params.item_id, lang)

    getInstitution4(this, lang)
    getEquipment(this)
    getRegionList(this, '', lang)
  }

  componentDidMount() {
    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    getApplicatorInfo(this, lang)
    aplicationAgree(this, this.props.match.params.item_id, lang)
    aplicationDisAgree(this, this.props.match.params.item_id, lang)

    const user =
      localStorage.getItem('user') ||
      '{"id":16,"username":"applicant2","first_name":"Сидор","last_name":"Петров","permissions":[],"role":"","organisation":104}'

    const parse = JSON.parse(user).role

    this.setState({ role: parse })

    getInstitution4(this, lang)
    getEquipment(this)
    getRegionList(this, '', lang)
  }
  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <div className="resident_item_full" style={{ marginTop: 10 }}>
            <div
              className="resident_left_full_status"
              style={{
                backgroundColor:
                  this.state.data.status == 'wait'
                    ? '#FEF3BB'
                    : this.state.data.status == 'agreed'
                    ? '#C4F1FB'
                    : this.state.data.status == 'rejected' ||
                      this.state.data.status == 'rejected_agreed'
                    ? 'rgb(255 187 181 / 42%)'
                    : '#C8FCE0',
                color:
                  this.state.data.status == 'wait'
                    ? '#8D421C'
                    : this.state.data.status == 'agreed'
                    ? '#1B4D4C'
                    : this.state.data.status == 'rejected' ||
                      this.state.data.status == 'rejected_agreed'
                    ? 'red'
                    : '#0C4E36',
              }}
            >
              <div
                className="r_l_top"
                style={{
                  color:
                    this.state.data.status == 'wait'
                      ? '#8D421C'
                      : this.state.data.status == 'agreed'
                      ? '#1B4D4C'
                      : this.state.data.status == 'rejected' ||
                        this.state.data.status == 'rejected_agreed'
                      ? 'red'
                      : '#0C4E36',
                }}
              >
                {this.state.data.status == 'wait'
                  ? strings.status_name.text_2
                  : this.state.data.status == 'agreed' ||
                    this.state.data.status == 'rejected_agreed'
                  ? strings.status_name.text_1
                  : this.state.data.status == 'rejected'
                  ? strings.status_name.text_3
                  : strings.status_name.text_4}
              </div>
            </div>
            <div className="resident_right">
              <div className="resident_centered">
                <h1>
                  {strings.zayavka_form.text_12} №{this.state.data.id}{' '}
                </h1>

                <h1>{this.state.data.name}</h1>
                <h3>
                  {' '}
                  {this.state.lang == 'uz'
                    ? this.state.institution_info2.name_uz
                    : this.state.institution_info2.name_ru}
                </h3>
                <h5> {this.state.data.requested_date}</h5>
              </div>
            </div>
          </div>
          <div className="applicetion_row">
            <div className="applicetion_box border_r_box">
              <div className="applicetion_box_header">
                {strings.zayavka_form.text_3}
              </div>
              <div className="application_box_item">
                {/* Name: Доктор наук Петров Сидор Иванович <br /> */}
                {this.state.aplicator_info.degree},{' '}
                {this.state.aplicator_info.full_name} <br />
                <br />
                {this.state.institution
                  .filter(
                    (item) => item.id == this.state.aplicator_info.organisation,
                  )
                  .map((item2) => item2.name)}{' '}
                <br />
                {this.state.region
                  .filter((item) => item.id == this.state.aplicator_info.region)
                  .map((item2) => item2.name)}{' '}
                {this.state.aplicator_info.address_line},{' '}
                {this.state.aplicator_info.zip_code} <br />
                {this.state.aplicator_info.phone},{' '}
                {this.state.aplicator_info.email} <br />
                {/* Adress zipcode: Ташкентская область Паркентский район с. */}
                {/* Номданак ул. Богбоши 12, 100015 <br />
                  Phone and email: +99987129129, Petya9212@gmail.com <br /> */}
                <br />
              </div>
            </div>
            <div className="applicetion_box">
              <div className="applicetion_box_header">
                {strings.zayavka_form.text_4}:
              </div>
              <div className="application_box_item">
                {this.state.institution_info.contact_name} <br />
                {this.state.institution_info.name} <br /> <br />
                {this.state.institution_info.region_name}{' '}
                {this.state.institution_info.address_line},{' '}
                {this.state.institution_info.zip_code} <br />
                {this.state.institution_info.contact_phone},{' '}
                {this.state.institution_info.contact_email}
                <br />
                <br />
              </div>
            </div>
          </div>
          <div className="applicetion_puppose">
            {strings.zayavka_form.text_5}: <b>{this.state.data.purpose}</b>
          </div>
          <div className="applicetion_some_inf">
            <p>
              {strings.zayavka_form.text_16}:
              <b> {this.state.data.required_date}</b>
            </p>
            <p>
              {strings.zayavka_form.text_6}:{' '}
              <b>
                {this.state.data.duration_days} {strings.zayavka_form.text_7}
              </b>
            </p>
            <p>
              <b>
                <input
                  type={'checkbox'}
                  checked={this.state.data.once_flag}
                  value={this.state.data.once_flag}
                  placeholder="Pereodik tadqiqot*"
                />
              </b>
              {strings.zayavka_form.text_8}{' '}
            </p>
            <p>
              <b>
                {' '}
                <input
                  type={'checkbox'}
                  checked={this.state.data.education_flag}
                  value={this.state.data.education_flag}
                  placeholder="Pereodik tadqiqot*"
                />
              </b>
              {strings.zayavka_form.text_9}{' '}
            </p>
          </div>
          <div className="applicetion_instruction">
            {strings.zayavka_form.text_10}: <b>{this.state.data.instruction}</b>
          </div>
          <div className="applicetion_callback">
            <div className="app_header">{strings.zayavka_form.text_13}</div>
            <p>
              {strings.zayavka_form.text_14}:{' '}
              <b>{this.state.data.close_message}</b>
            </p>
            <p>
              {strings.zayavka_form.text_15}:{' '}
              <b> {this.state.data.closed_date}</b>
            </p>
          </div>
          <div className="block liner">
            <div className="some_text">
              {/* <h3>Xizmatda qo'laniladigan ilmiy uskunalar:</h3> */}

              <div className="block_row"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
