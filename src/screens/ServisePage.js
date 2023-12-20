import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { NavLink } from 'react-router-dom'

import { strings } from '../localozation'
import {
  equpmentZayavkaPost,
  getApplicatorInfo,
  getEquipment,
  getFileList,
  getInstitution,
  getInstitution4,
  getInstitutionByID,
  getInstitutionList,
  getRegionList,
  getServiseByID,
} from '../api'
import moment, { now } from 'moment'
import BreadCrumb from '../components/BreadCrumb'

export default class ServisePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution_info3: {
        description_uz: '',
        name_uz: '',
        organisation: 1,
        equipment: [],
      },

      institution_info: {},
      institution_list2: [{ id: 0 }],
      institution_list: [],
      equipment: [],

      name: '',

      education_flag: false,
      result_flag: '',
      requested_date: moment().format('YYYY-MM-DD'),
      once_flag: false,
      result_flag: false,
      instruction: '',
      purpose: '',
      duration_days: '',

      role: null,

      fileData: [],

      aplicator_info: [],
      institution: [],
      region: [],
      required_date: '',
    }
  }

  sendData() {
    this.state.instruction == '' ||
      this.state.name == '' ||
      this.state.purpose == '' ||
      this.state.requested_date == '' ||
      this.state.duration_days == '' ||
      this.state.required_date == ''
      ? this.setState({ error: true })
      : equpmentZayavkaPost(
        this,
        this.props.match.params.item_id,
        this.state.institution_info3?.organisation,
        this.state.equipment
          .filter((item) =>
            this.state.institution_info3.equipment.includes(item.id),
          )
          .map((item) => item.id),
        this.state.purpose,
        this.state.name,
        this.state.once_flag,
        this.state.instruction,
        this.state.duration_days,
        this.state.education_flag,
        this.state.result_flag,
        this.state.requested_date,
        this.state.required_date,
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

    getInstitution4(this, lang)
    getRegionList(this, '', lang)
  }

  componentDidMount() {
    getServiseByID(this, this.props.match.params.item_id)
    const user =
      localStorage.getItem('user') ||
      '{"id":16,"username":"applicant2","first_name":"Сидор","last_name":"Петров","permissions":[],"role":"","organisation":104}'

    const parse = JSON.parse(user).role

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    this.setState({
      role: parse,
      user_name: JSON.parse(user).first_name + ' ' + JSON.parse(user).last_name,
      organisation: JSON.parse(user).organisation,
    })
    getInstitution(this)
    getApplicatorInfo(this)
    getInstitution4(this, lang)
    getRegionList(this, '', lang)
    getEquipment(this)
    getFileList(this, '', '', '', this.props.match.params.item_id)
  }
  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <BreadCrumb
            home_name={this.state.lang == 'uz' ? 'Asosiy' : 'Главная'}
            lang={this.state.lang}
            back={'/servise'}
            main_name={this.state.lang == 'uz' ? 'Xizmatlar' : 'Сервисы'}
            name={
              this.state.lang == 'uz'
                ? this.state.institution_info3.name_uz
                : this.state.institution_info3?.name_ru
            }
          />
          <div className="block liner">
            <div className="lined_tt">
              {' '}
              <h2>
                {this.state.institution_list2
                  .filter(
                    (item) =>
                      item.id == this.state.institution_info3.organisation,
                  )
                  .map((item) => (
                    <p
                      style={{
                        borderBottom: '1px solid #eaeaea',
                        paddingBottom: 10,
                        marginBottom: 10,
                        display: 'block',
                        fontSize: 24,
                      }}
                    >
                      {this.state.lang == 'uz'
                        ? item.short_name_uz
                        : item.short_name_ru}
                    </p>
                  ))}
              </h2>
              <h1 style={{ marginBottom: 12, display: 'block' }}>
                {this.state.lang == 'uz'
                  ? this.state.institution_info3.name_uz
                  : this.state.institution_info3?.name_ru}
              </h1>
              <p className="more_big_text" style={{ fontSize: 18 }}>
                {this.state.lang == 'uz'
                  ? this.state.institution_info3.description_uz
                  : this.state.institution_info3?.description_ru}
              </p>
            </div>
            <div className="file_block_2">
              <div className="file_title">{strings.servisepage.text_1}</div>
              <div className="files_data_3">
                {this.state.fileData.map((item) => (
                  <a
                    href={item.filename}
                    target="_blank"
                    className="files_item"
                  >
                    <img
                      src={
                        item.attachment_type == 3
                          ? 'https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png'
                          : item.attachment_type == 2
                            ? 'https://aux.iconspalace.com/uploads/file-document-icon-256.png'
                            : item.attachment_type == 1
                              ? 'https://cdn-icons-png.flaticon.com/512/2875/2875411.png'
                              : 'https://cdn-icons-png.flaticon.com/512/2875/2875411.png'
                      }
                      alt=""
                    />
                    <div className="file_item_right">
                      <p>{item.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="some_text">
              <h3>{strings.servisepage.text_2}:</h3>
              {this.state.equipment
                .filter((item) =>
                  this.state.institution_info3.equipment.includes(item.id),
                )
                .map((item) => (
                  <NavLink
                    to={`/equipmentpage/0/${item.id}/`}
                    className="resident_item_2"
                  >
                    <div className="resident_right">
                      <h1>{item.name}</h1>
                      <p>{item.description.slice(0, 80)}</p>
                    </div>
                  </NavLink>
                ))}

              <div className="block_row"></div>
              {/* <iframe
                src={this.state.institution_info.geolocation}
                width="100%"
                height="450"
                frameBorder={0}
                allow={
                  "geolocation 'self' " +
                  this.state.institution_info.geolocation
                }
              ></iframe> */}
              <div className="buttons">
                {this.state.role == 'applicant' ? (
                  <a
                    onClick={() => this.setState({ order: true })}
                    className="phone"
                    href="#"
                  >
                    {strings.institutionpage.text_7}
                  </a>
                ) : (
                  <NavLink to="/login" className="phone" href="#">
                    {strings.institutionpage.text_7}
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.state.order == true ? (
          <div className="order_content">
            <div
              className="order_container"
              style={{
                background: '#f4f4f4',
                paddingLeft: 40,
                paddingRight: 40,
                paddingTop: 20,
              }}
            >
              <div
                className="resident_item_full"
                style={{ marginTop: 10, background: '#f4f4f4' }}
              >
                <div
                  className="resident_left_full_status"
                  style={{
                    backgroundColor: '#C8FCE0',
                  }}
                >
                  <div
                    className="r_l_top"
                    style={{
                      color: '#0C4E36',
                    }}
                  >
                    {strings.zayavka_form.text_1}
                  </div>
                </div>
                <div className="resident_right">
                  <div className="resident_centered">
                    <input
                      className={
                        this.state.error == true && this.state.name == ''
                          ? 'error1'
                          : null
                      }
                      onChange={(e) =>
                        this.handle_change('name', e.target.value)
                      }
                      placeholder={strings.zayavka_form.text_2}
                    />
                    <h1>
                      {' '}
                      {this.state.lang == 'uz'
                        ? this.state.institution_info3.name_uz
                        : this.state.institution_info3?.name_ru}{' '}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="applicetion_row">
                <div className="applicetion_box border_r_box">
                  <div className="applicetion_box_header">
                    {' '}
                    {strings.zayavka_form.text_3}
                  </div>
                  <div className="application_box_item">
                    {this.state.aplicator_info.degree},{' '}
                    {this.state.aplicator_info.full_name} <br />
                    <br />
                    {this.state.institution
                      .filter(
                        (item) =>
                          item.id == this.state.aplicator_info.organisation,
                      )
                      .map((item2) => item2.name)}{' '}
                    <br />
                    {this.state.region
                      .filter(
                        (item) => item.id == this.state.aplicator_info.region,
                      )
                      .map((item2) => item2.name)}{' '}
                    {this.state.aplicator_info.address_line},{' '}
                    {this.state.aplicator_info.zip_code} <br />
                    {this.state.aplicator_info.phone},{' '}
                    {this.state.aplicator_info.email} <br />
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
                <p> {strings.zayavka_form.text_5}:</p>{' '}
                <textarea
                  maxlength="251"
                  className={
                    this.state.error == true && this.state.purpose == ''
                      ? 'error1'
                      : null
                  }
                  onChange={(e) =>
                    this.handle_change('purpose', e.target.value)
                  }
                  placeholder={strings.zayavka_form.text_5}
                ></textarea>
              </div>
              <div className="applicetion_some_inf">
                <p>
                  {strings.zayavka_form.text_16}:
                  <b>
                    {' '}
                    <input
                      className={
                        this.state.error == true &&
                          this.state.required_date == ''
                          ? 'error1'
                          : null
                      }
                      onChange={(e) =>
                        this.handle_change('required_date', e.target.value)
                      }
                      type="date"
                    />{' '}
                  </b>
                </p>
                <p>
                  {strings.zayavka_form.text_6}:
                  <b>
                    {' '}
                    <input
                      className={
                        this.state.error == true &&
                          this.state.duration_days == ''
                          ? 'error1'
                          : null
                      }
                      onChange={(e) =>
                        this.handle_change('duration_days', e.target.value)
                      }
                      type="number"
                      placeholder={strings.zayavka_form.text_7}
                    />{' '}
                    {strings.zayavka_form.text_7}
                  </b>
                </p>{' '}
                <p>
                  <b>
                    <input
                      type={'checkbox'}
                      placeholder="Pereodik tadqiqot*"
                      onClick={() =>
                        this.setState({
                          education_flag: !this.state.education_flag,
                        })
                      }
                    />
                  </b>
                  {strings.zayavka_form.text_8}:
                </p>
                <p>
                  <b>
                    {' '}
                    <input
                      type={'checkbox'}
                      onClick={() =>
                        this.setState({
                          once_flag: !this.state.once_flag,
                        })
                      }
                      placeholder={strings.zayavka_form.text_9}
                    />
                  </b>
                  {strings.zayavka_form.text_9}:{' '}
                </p>
              </div>
              <div className="applicetion_instruction">
                <p> {strings.zayavka_form.text_10}: </p>
                <textarea
                  maxlength="1025"
                  className={
                    this.state.error == true && this.state.instruction == ''
                      ? 'error1'
                      : null
                  }
                  onChange={(e) =>
                    this.handle_change('instruction', e.target.value)
                  }
                  placeholder={strings.zayavka_form.text_10}
                ></textarea>
              </div>
              <div className="buttons_bot">
                <button onClick={() => this.sendData()}>
                  {strings.zayavka_form.text_11}
                </button>
              </div>
              {/* <div className="applicetion_callback">
                <div className="app_header">Murojaat bo’yicha javob</div>
                <p>
                  Javob matni: <b>{this.state.data.close_message}</b>
                </p>
                <p>
                  Javob sanasi: <b> {this.state.data.closed_date}</b>
                </p>
              </div> */}
              <div className="block liner">
                <div className="some_text">
                  {/* <h3>Xizmatda qo'laniladigan ilmiy uskunalar:</h3> */}

                  <div className="block_row"></div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Footer />
      </div>
    )
  }
}
