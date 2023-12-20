import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { strings } from '../localozation'

import {
  getInstitution,
  getRegion,
  setApplicatorInfo,
} from '../api'

export default class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region_list: [],
      institution_list2: [],
      
      applicant: JSON.parse(localStorage.getItem('applicant')),

      degree: '',
      organisation: '',
      is_legal: false,
      region_active: '',
      zip_code: '',
    }
  }

  done() {
    this.setState({
      zip_code_error: false,
      org_error: false,
      error: false
    })
    if (this.state.zip_code.length >= 10) {
      this.setState({ zip_code_error: true })
    } else if (this.state.is_legal == true && this.state.organisation == '') {
      this.setState({ org_error: true })
    } else if (
      this.state.degree == '' ||
      this.state.region_active == ''
    ) {
      this.setState({ error: true })
    } else {
      setApplicatorInfo(this, {
        degree: this.state.degree,
        organisation: this.state.organisation,
        is_legal: this.state.is_legal,
        region_active: this.state.region_active,
        zip_code: this.state.zip_code
      })
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
    getRegion(this)
    getInstitution(this)
  }

  render() {
    return (
      <div className="registration">
        <div className="wrapper container">
          <Header />
            <div className="form_row reg2">
              <div className="form_1">
                <div className="label">
                  <p>{strings.registration.fio}</p>
                  <input 
                    type="text" 
                    disabled 
                    value={this.state.applicant?.full_name} 
                  />
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
                    <option selected={this.state.degree == 'Нет степени'} value={'Нет степени'}>
                      Yoq / Нет
                    </option>
                    <option
                      selected={this.state.degree === 'Магистр наук'}
                      value={'Магистр наук'}
                    >
                      Fanlar magistri / Магистр наук
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
                  <p>{strings.registration.region}*</p>
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
                
                <div className="label">
                  <p>{strings.registration.address}</p>
                  <input 
                    type="text" 
                    disabled 
                    value={this.state.applicant?.address_line} 
                  />
                </div>

                <div className="label">
                  <p>{strings.registration.phonenumber}</p>
                  <input 
                    type="text" 
                    disabled 
                    value={this.state.applicant?.phone} 
                  />
                </div>

                <div className="label">
                  <p>{strings.registration.email}</p>
                  <input 
                    type="text" 
                    disabled 
                    value={this.state.applicant?.email} 
                  />
                </div>

                <div className="label">
                  <p>{strings.registration.zipcode}</p>
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

          <div className="flex_button">
            <a className="order_but" href="#" onClick={() => this.done()}>
              {strings.registration.register}
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
