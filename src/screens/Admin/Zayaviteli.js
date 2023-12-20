import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  getAdminZayaviteli,
  getEquipment,
  getInstitution,
  getService,
} from '../../api'

import {
  FiHome,
  FiBriefcase,
  FiPrinter,
  FiThumbsUp,
  FiTrendingUp,
  FiTrash2,
  FiEdit,
  FiPlus,
} from 'react-icons/fi'

export default class Zayaviteli extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zayaviteli: [],
    }
  }

  componentDidMount() {
    getAdminZayaviteli(this)
  }

  render() {
    return (
      <div className="table">
        <div className="table_header">
          <p>Ariza beruvchilar</p>
          <button>
            <NavLink to={'/admin/zayaviteli/form'}>Добавить</NavLink>
          </button>
        </div>
        <table class="styled-table">
          <thead>
            <tr>
              <th>№ - </th>
              <th>To'liq ismi sharif</th>
              <th>Telefon raqami</th>
              <th>Elektron pochta</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.zayaviteli.map((item, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{item.full_name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <button className="table_delete">
                    <FiTrash2 />{' '}
                  </button>
                  <button className="table_edit">
                    {' '}
                    <NavLink to={'/dashboard/lab/form'}>
                      <FiEdit />{' '}
                    </NavLink>{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
