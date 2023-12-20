import React, { Component } from 'react'

import { BsChevronDown } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { getFileList } from '../api'

export default class EquipmentListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fileData: [],
      colors: this.props.colors,
    }
  }

  componentDidMount() {
    getFileList(this, '', '', this.props.item.id, '')
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ colors: nextProps.colors })
  }

  render() {
    return (
      <NavLink
        to={`/equipmentpage/0/${this.props.item.id}/`}
        className="resident_item_2"
      >
        <div className="resident_left">
          <div className="r_l_top">
            {this.props.item.condition.substring(0, 10)}
          </div> 
          <div
            className="r_l_bottom"
            style={{
              backgroundColor: '#5fc9e5',
            }}
          >
            {this.props.item.condition.substring(0, 1)}
          </div>
        </div>
        <div className="resident_right">
          <h4>{this.props.item.lab_name}</h4>
          <h1>{this.props.item.name}</h1>
          <p>
            {this.props.lang == 'uz'
              ? this.props.item.lab_name_uz
              : this.props.item.lab_name_ru}
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
