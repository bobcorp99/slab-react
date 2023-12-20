import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Tabs from '../components/ui/Tabs'

import { strings } from '../localozation'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { NavLink } from 'react-router-dom'
import { login, oneid_login, URL } from '../api'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      error: false,
      oneid_error: false,
      currentTab: 0,

      show: true,
    }
  }

  componentDidMount() {
    const { token } = Object.fromEntries(new URLSearchParams(this.props.location.search))
    if (token) {
      oneid_login(this, token)
    }
  }

  login = (e) => {
    e.preventDefault()
    this.setState({
      error: false,
      oneid_error: false
    })
    login(this, this.state.username, this.state.password)
  }

  tabChange = (i) => {
    this.setState({ currentTab: i })
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
      <div>
        <div className="wrapper container">
          <Header />
          <div className="login_wrapper">
            <div className="login">
              <Tabs
                elements={[strings.login.user_auth, strings.login.admin_auth]}
                current={this.state.currentTab}
                onChange={this.tabChange}
              />
              <div className="form">
                {this.state.currentTab == 0 ? (
                  <>
                    <div className="oneid_tip">{strings.login.oneid_button}</div>
                    <a className="oneid_button" href={`${URL}api/one-id/enter/`}>
                      {strings.login.text_3}
                    </a>
                    <div className="login_footer">
                      <div className="form_button">
                        <span>{strings.login.text_4}</span>
                        <br />
                        <a className={'regs'} href={`${URL}api/one-id/enter/`}>
                          {strings.login.text_5}
                        </a>
                      </div>
                      <div>
                        <img
                          src={require('../assets/oneid.png')}
                          alt="OneID"
                        />
                      </div>
                    </div>
                    {this.state.oneid_error ? (
                      <div className="error">{strings.login.oneid_error}</div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <form onSubmit={this.login}>
                      <label htmlFor="">
                        <p>{strings.login.text_1}:</p>
                        <input
                          onChange={(e) =>
                            this.handle_change('username', e.target.value)
                          }
                          placeholder="login"
                          type="text"
                        />
                      </label>
                      <label htmlFor="" className="pass_l">
                        <p>{strings.login.text_2}:</p>
                        <input
                          onChange={(e) =>
                            this.handle_change('password', e.target.value)
                          }
                          placeholder="password"
                          type={this.state.show ? 'password' : 'text'}
                        />
                        <a
                          className={'l_show_pass'}
                          href="#"
                          onClick={() => this.setState({ show: !this.state.show })}
                        >
                          {this.state.show == false ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </a>
                      </label>
                      <br />
                      <button type="submit" className={'log'} href="#login">
                        {strings.login.text_3}
                      </button>
                    </form>

                    {this.state.error ? (
                      <div className="error">{strings.login.wrong_credentials}</div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(Login)