import React, { Component } from 'react'

import { BsChevronDown } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { getFileList } from '../api'

export default class ServiseListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fileData: [],
    }
  }

  componentDidMount() {
    getFileList(this, '', '', '', this.props.item.id)
  }

  render() {
    return (
      <NavLink
        to={`/servisepage/0/${this.props.item.id}/`}
        className="resident_item_2"
      >
        <div className="resident_left">
          <div className="r_l_top">{this.props.item.name.substring(0, 10)}</div>
          <div
            className="r_l_bottom"
            style={{
              backgroundColor: '#5fc9e5',
            }}
          >
            {this.props.item.name.substring(0, 1)}
          </div>
        </div>
        <div className="resident_right">
          <h1>
            {' '}
            {this.state.lang == 'ru'
              ? this.props.item.name_ru
              : this.props.item.name_uz}
          </h1>
          <p>
            {this.state.lang == 'ru'
              ? this.props.item.description_ru.slice(0, 80)
              : this.props.item.description_uz.slice(0, 80)}
          </p>
          <div className="files_data_3">
            {this.state.fileData.map((item) => (
              <a href={item.filename} target="_blank" className="files_item">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/1200px-.docx_icon.svg.png"
                  alt=""
                />
                <div className="file_item_right">
                  <p>{item.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </NavLink>
    )
  }
}
