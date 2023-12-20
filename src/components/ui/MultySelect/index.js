import React, { Component } from 'react'

import { BsChevronDown } from 'react-icons/bs'

export default class UI_MultySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: false,
      select_title: this.props.title,
      select_title_sel: null,
      select_check: this.props.activeValue,
      data: [],
    }
  }

  componentDidMount() {
    this.props.api(this)
    setTimeout(() => {
      this.setState({ select_check: this.props.activeValue })
    }, 2000)
  }

  delete(item) {
    const select_check = this.state.select_check.filter((i) => i !== item)
    this.setState({ select_check })
    this.props.handle_change(this.state.select_check)
  }

  render() {
    return (
      <div className="select_ui">
        <div
          onClick={() => this.setState({ select: !this.state.select })}
          class={
            this.state.select == true
              ? 'select_ui_content_active'
              : 'select_ui_content'
          }
        >
          <span className="fff">
            {this.state.select_check.length == 0
              ? this.props.title
              : this.state.data
                  .filter((item) => this.state.select_check.includes(item.id))
                  .map((item, i) => (
                    <div className="selected">
                      {item.name.slice(0, 30)}{' '}
                      {item.name.length > 30 ? '...' : null}{' '}
                    </div>
                  ))}
          </span>
          <BsChevronDown size={11} />
        </div>
        {this.state.select == false ? null : (
          <div
            className="select_ui_items mm_active"
            onMouseLeave={() => (
              this.setState({ select: false }),
              this.props.handle_change(this.state.select_check)
            )}
          >
            {this.state.data.map((item) =>
              this.state.select_check.map((item2) =>
                item2 == item.id ? (
                  <div
                    onClick={this.delete.bind(this, item2)}
                    className={
                      item2 == item.id
                        ? 'select_ui_item_active'
                        : 'select_ui_item'
                    }
                  >
                    <span>{item.name} </span>
                  </div>
                ) : null,
              ),
            )}

            {this.state.data.map((item) =>
              this.state.select_check.includes(item.id) == false ? (
                <div
                  onClick={() =>
                    item.disabled == true
                      ? alert(
                          "(Qurilmalar moderator tarafidan ko'rib chiqilgandan keyin xizmatga biriktirilishi mumkin)",
                        )
                      : this.state.select_check.includes(item.id) == false
                      ? (this.setState({
                          select_check: this.state.select_check.concat([
                            item.id,
                          ]),
                        }),
                        this.props.handle_change(this.state.select_check))
                      : this.delete.bind(this, item)
                  }
                  className={'select_ui_item'}
                >
                  <span style={item.disabled == true ? { opacity: 0.5 } : null}>
                    {item.name}{' '}
                    <span style={{ color: 'red' }}>
                      {item.disabled == true
                        ? "(Qurilmalar moderator tarafidan ko'rib chiqilgandan keyin xizmatga biriktirilishi mumkin)"
                        : null}
                    </span>{' '}
                  </span>
                </div>
              ) : null,
            )}
          </div>
        )}
      </div>
    )
  }
}
