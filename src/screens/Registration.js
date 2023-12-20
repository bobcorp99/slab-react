import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { strings } from '../localozation'

import {
  getOrgType,
  moderadorPostOrg,
  getEquipment,
  getFinance,
  getInstitution,
  getInstitutionList,
  getRegion,
  getScienceField,
  getTnved,
  moderadorPostServise,
  getEquipmentList,
  getLabsList,
  getPurchaseReason,
  getCountry,
  getCurrency,
  moderadorPostAplicator,
  URL
} from '../api'

export default class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
      region_list: [],
      science: [],
      tnved: [],
      finance: [],
      equipment: [],
      institution_list: [],
      institution: [],
      org_type: [],
      equipment_list: [],
      labs_list: [],
      purchase: [],
      country: [],
      currency: [],

      login: '',
      password: '',

      name: '',
      organisation: '',
      full_name: '',
      is_legal: false,
      region_active: '',
      address_line: '',
      zip_code: '',
      phone: '',
      email: '',
      sex: '',
      degree: '',
      name1: '',
      name2: '',
      name3: '',
      institution_list2: [],
      password2: '',
      message: false,

      error_code: false,
      error_message: '',
      regBut: true,
    }
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

  componentDidMount() {
    getInstitution(this)
    getRegion(this)
    getScienceField(this)
    getTnved(this)
    getFinance(this)
    getEquipment(this)
    getInstitutionList(this)
    getOrgType(this)
    getEquipmentList(this)
    getLabsList(this)
    getPurchaseReason(this)
    getCountry(this)
    getCurrency(this)
  }

  nextPage() {
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

    if (regex.test(this.state.email) === false) {
      this.setState({ mail_error: true })

      this.setState({ error: true })

      setTimeout(() => {
        this.setState({ mail_error: false })
      }, 2000)
    } else if (regex.test(this.state.email) === true) {
      if (this.state.zip_code.length >= 10) {
        this.setState({ zip_code_error: true })
      } else {
        if (this.state.is_legal == true && this.state.organisation == '') {
          this.setState({ org_error: true })
        } else {
          this.state.name1 == '' ||
          this.state.name2 == '' ||
          this.state.sex == '' ||
          this.state.email == '' ||
          this.state.degree == '' ||
          this.state.address_line == '' ||
          this.state.region_active == ''
            ? this.setState({ error: true })
            : this.setState({ type: 2 })
        }
      }
    }
  }

  aplicatorAdd() {
    const full_name =
      this.state.name1 + ' ' + this.state.name2 + ' ' + this.state.name3
    this.state.password == this.state.password2
      ? moderadorPostAplicator(
          this,
          this.state.login,
          this.state.password,
          this.state.organisation,
          full_name,
          this.state.is_legal,
          this.state.region_active,
          this.state.address_line,
          this.state.zip_code,
          this.state.phone,
          this.state.email,
          this.state.sex,
          this.state.degree,
        )
      : this.setState({ error: true })
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

  render() {
    return (
      <div className="registration">
        <div className="wrapper container">
          <Header />
          <div className="component_top">{strings.registration.title}</div>

          {this.state.type == 1 ? (
            <div className="oneid_wrapper">
              <a className="oneid" href={`${URL}social/login/one-id`}>
                <span>{strings.registration.oneid}</span>
                <img
                  src={require('../assets/oneid.png')}
                  alt="OneID"
                />
              </a>
            </div>
          ) : null}

          {this.state.type == 1 ? (
            <div className="form_row reg2">
              <div className="form_1">
                <div className="label">
                  <p>{strings.registration.surname}*</p>
                  <input
                    className={
                      this.state.error == true && this.state.name1 == ''
                        ? 'error1'
                        : null
                    }
                    value={this.state.name1}
                    onChange={(e) =>
                      this.handle_change('name1', e.target.value)
                    }
                    placeholder={strings.registration.surname}
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.name}*</p>
                  <input
                    className={
                      this.state.error == true && this.state.name2 == ''
                        ? 'error1'
                        : null
                    }
                    value={this.state.name2}
                    onChange={(e) =>
                      this.handle_change('name2', e.target.value)
                    }
                    placeholder={strings.registration.name}
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.patronymic}*</p>
                  <input
                    className={
                      this.state.error == true && this.state.name3 == ''
                        ? 'error1'
                        : null
                    }
                    value={this.state.name3}
                    onChange={(e) =>
                      this.handle_change('name3', e.target.value)
                    }
                    placeholder={strings.registration.patronymic}
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.gender}</p>
                  <select
                    className={
                      this.state.error == true && this.state.sex == ''
                        ? 'error1'
                        : null
                    }
                    onChange={(e) => this.setState({ sex: e.target.value })}
                  >
                    <option selected={this.state.sex === ''} value={''}>
                      ---
                    </option>
                    <option selected={this.state.sex === true} value={true}>
                      {strings.registration.male}
                    </option>
                    <option selected={this.state.sex === false} value={false}>
                      {strings.registration.female}
                    </option>
                  </select>
                </div>
                <div className="label">
                  <p>{strings.registration.degree}*</p>
                  <select
                    className={
                      this.state.error == true && this.state.degree == ''
                        ? 'error1'
                        : null
                    }
                    onChange={(e) => this.setState({ degree: e.target.value })}
                  >
                    <option selected={this.state.degree == ''} value={''}>
                      ---
                    </option>
                    <option
                      selected={this.state.degree === 'Магистр наук'}
                      value={'Магистр наук'}
                    >
                      Магистр наук
                    </option>
                    <option
                      selected={this.state.degree === 'Phd'}
                      value={'Phd'}
                    >
                      Phd
                    </option>
                    <option
                      selected={this.state.degree === 'Доктор наук'}
                      value={'Доктор наук'}
                    >
                      Доктор наук
                    </option>
                  </select>
                </div>

                <div className="label">
                  <p>{strings.registration.region}</p>
                  <select
                    className={
                      this.state.error == true && this.state.region_active == ''
                        ? 'error1'
                        : null
                    }
                    onChange={(e) =>
                      this.setState({ region_active: e.target.value })
                    }
                  >
                    <option>----</option>
                    {this.state.region_list.map((item) => (
                      <option
                        selected={item.id == this.state.region_active}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form_1">
                <div className="label">
                  <p>{strings.registration.address}</p>
                  <input
                    className={
                      this.state.error == true && this.state.address_line == ''
                        ? 'error1'
                        : null
                    }
                    value={this.state.address_line}
                    onChange={(e) =>
                      this.handle_change('address_line', e.target.value)
                    }
                    placeholder={strings.registration.address}
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.phonenumber}*</p>
                  <input
                    className={
                      this.state.error == true && this.state.phone == ''
                        ? 'error1'
                        : null
                    }
                    value={this.state.phone}
                    onChange={(e) =>
                      e.target.value == ' '
                        ? null
                        : this.handle_change('phone', e.target.value)
                    }
                    type="number"
                    placeholder={strings.registration.phonenumber}
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.email}*</p>
                  <input
                    className={
                      this.state.error == true && this.state.email == ''
                        ? 'error1'
                        : null
                    }
                    onChange={(e) =>
                      this.handle_change('email', e.target.value)
                    }
                    value={this.state.email}
                    placeholder={strings.registration.email}
                    type="email"
                    pattern=".+@"
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.zipcode}*</p>
                  <input
                    onChange={(e) =>
                      e.target.value == ' '
                        ? null
                        : this.handle_change('zip_code', e.target.value)
                    }
                    value={this.state.zip_code}
                    placeholder={strings.registration.zipcode}
                    type="number"
                    min="0"
                    max="9999999999"
                  />
                </div>
                <div className="label">
                  <div className="check_box">
                    <p>{strings.registration.legal_status}*</p>
                    <input
                      className="check_m"
                      onClick={() =>
                        this.setState({ is_legal: !this.state.is_legal })
                      }
                      value={this.state.is_legal}
                      checked={this.state.is_legal}
                      type="checkbox"
                      style={{ width: 20, height: 20 }}
                    />
                  </div>
                </div>

                {this.state.is_legal == true ? (
                  <div className="label">
                    <p>{strings.registration.choose_org}*</p>
                    <select
                      onChange={(e) =>
                        this.setState({ organisation: e.target.value })
                      }
                    >
                      <option>----</option>
                      {this.state.institution_list2.map((item) => (
                        <option
                          selected={item.id == this.state.organisation}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                {this.state.mail_error == true ? (
                  <div className="message2">
                    <div className="message_box2">{strings.registration.email_error}</div>
                  </div>
                ) : null}
                {this.state.zip_code_error == true ? (
                  <div className="message2">
                    <div className="message_box2">
                    {strings.registration.zipcode_error}
                    </div>
                  </div>
                ) : null}
                {this.state.org_error == true ? (
                  <div className="message2">
                    <div className="message_box2">{strings.registration.choose_org}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="form_row reg2">
              <div className="form_1">
                <div className="label">
                  <p>{strings.registration.login}</p>
                  <input
                    onChange={(e) =>
                      this.handle_change('login', e.target.value)
                    }
                    value={this.state.login}
                    placeholder={strings.registration.login}
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.password}</p>
                  <input
                    className={this.state.error ? 'error1' : null}
                    onChange={(e) =>
                      this.handle_change('password', e.target.value)
                    }
                    value={this.state.password}
                    placeholder={strings.registration.password}
                    type="password"
                  />
                </div>
                <div className="label">
                  <p>{strings.registration.confirm_password}</p>
                  <input
                    className={this.state.error ? 'error1' : null}
                    onChange={(e) =>
                      this.handle_change('password2', e.target.value)
                    }
                    type="password"
                    value={this.state.password2}
                    placeholder={strings.registration.confirm_password}
                  />
                </div>
              </div>
              {this.state.message == true ? (
                <div className="message">
                  <div className="message_box">
                    {strings.registration.success_message}
                  </div>
                </div>
              ) : null}
              {this.state.error_code == true ? (
                <div className="message2">
                  <div className="message_box2">{this.state.error_message}</div>
                </div>
              ) : null}
            </div>
          )}

          <div className="flex_button">
            {this.state.type == 1 ? (
              <a className="order_but" href="#" onClick={() => this.nextPage()}>
                {strings.registration.continue}
              </a>
            ) : this.state.cliced == null ? (
              <div
                style={{
                  display: 'flex',
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <a
                  className="order_but_2"
                  href="#"
                  onClick={() => this.setState({ type: 1 })}
                >
                  {strings.registration.back}
                </a>
                <a
                  className="order_but"
                  href="#"
                  onClick={() => this.aplicatorAdd()}
                >
                  {strings.registration.register}
                </a>
              </div>
            ) : (
              <a className="order_but_dis" href="#">
                {strings.registration.register}
              </a>
            )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
