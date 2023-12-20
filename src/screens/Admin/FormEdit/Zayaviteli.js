import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { moderadorPostServise } from '../../../api'

export default class FormZayaviteli extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution: [],
      lang: 1,

      short_name: '',
      short_name_ru: '',
      short_name_uz: '',
      name: '',
      name_ru: '',
      name_uz: '',
      description: '',
      description_ru: '',
      description_uz: '',
      disabled: false,
      since_year: '',
      organisation: '',
      equipment: '',
    }
  }

  setData() {
    moderadorPostServise(
      this,
      this.state.login,
      this.state.password,
      this.state.organisation,
      this.state.full_name,
      this.state.is_legal,
      this.state.region,
      this.state.address_line,
      this.state.zip_code,
      this.state.phone,
      this.state.email,
      this.state.sex,
      this.state.degree,
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
      <div className="admin_form">
        <div className="form_header">
          <p>Добавить Услуги организации</p>
        </div>
        <div className="form_top">
          <ul>
            <li>
              <a
                className={this.state.lang == 1 ? 'active' : null}
                onClick={() => this.setState({ lang: 1 })}
                href="#"
              >
                UZ
              </a>
            </li>
            <li>
              <a
                onClick={() => this.setState({ lang: 2 })}
                className={this.state.lang == 2 ? 'active' : null}
                href="#"
              >
                RU
              </a>
            </li>
          </ul>
        </div>
        <form action="">
          <label htmlFor="">
            <p>Наименование</p>
            <input
              onChange={(e) => this.handle_change('name', e.target.value)}
              type="text"
              placeholder="Наименование"
            />
          </label>
          <label htmlFor="">
            <p>Описание</p>
            <input
              onChange={(e) =>
                this.handle_change('description', e.target.value)
              }
              type="text"
              placeholder="Описание"
            />
          </label>

          <label htmlFor="">
            <p>Скрыто</p>
            <input
              onChange={(e) => this.handle_change('disabled', e.target.value)}
              style={{ width: 15 }}
              className="check_box"
              type="checkbox"
              placeholder="Скрыто"
            />
          </label>
          <label htmlFor="">
            <p>Организация</p>
            <input
              onChange={(e) =>
                this.handle_change('organisation', e.target.value)
              }
              type="text"
              placeholder="Организация"
            />
          </label>
          <label htmlFor="">
            <p>Группа научного оборудования</p>
            <input
              onChange={(e) => this.handle_change('equipment', e.target.value)}
              type="text"
              placeholder="Группа научного оборудования"
            />
          </label>
          <div className="form_bottm">
            <a href="" className="submt">
              Добавить
            </a>
          </div>
        </form>
      </div>
    )
  }
}
