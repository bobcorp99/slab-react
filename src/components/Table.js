import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="table">
        <table class="styled-table">
          <thead>
            <tr>
              <th>№ - </th>
              <th>Наименование</th>
              <th>Год создания</th>
              <th>Время создания</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <a href="/table/35"> Қорақалп. </a>
              </td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
