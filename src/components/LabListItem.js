import React, { Component } from 'react'

import { BsChevronDown } from 'react-icons/bs'
import { getFileList } from '../api'

export default class LabListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      fileData: [],
      hoverStyle: false,
    }
  }

  toggleHover() {
    this.setState({ hoverStyle: true })
  }

  render() {
    return (
      <div
        className={'resident_item_10'}
        style={{
          backgroundColor:
            this.props.item.id == this.props.activeID ? '#9edb3c' : 'white',
        }}
        onClick={() => this.props.selectLab(this.props.item.id)}
      >
        <p>
          {this.state.lang == 'ru'
            ? this.props.item.name_ru
            : this.props.item.name_uz}
        </p>
        {/* <div className="files_data_2">
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
        </div> */}
      </div>
    )
  }
}
