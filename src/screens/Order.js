import React, { Component } from 'react'
import { equpmentZayavkaPost } from '../api'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
      status: false,
      once_flag: true,
      purpose: '',
      instruction: '',
      user: [],
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user') || '[]')
    this.setState({ user: user || null })

    const role = JSON.parse(localStorage.getItem('user') || '[]').role

    if (role == 'applicant') {
    } else if (role == 'moderator' || role == 'assistant') {
      window.open('/login', '_self')
    } else {
      window.open('/registration', '_self')
    }
  }

  sendData() {
    equpmentZayavkaPost(
      this,
      1,
      1,
      [2],
      this.state.purpose,
      this.state.user.username,
      this.state.once_flag,
      this.state.instruction,
      this.state.requested_date,
      this.state.education_flag,
      this.state.result_flag,
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

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header />
          <div className="component_top">Заказ услуги:</div>
        </div>
        <Footer />
      </div>
    )
  }
}
