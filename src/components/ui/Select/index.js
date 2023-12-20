import React, { Component } from 'react'

import { BsChevronDown } from 'react-icons/bs'

export default class UI_Select extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: false,
      select_title: this.props.title,
      select_title_sel: null,
      select_check: 0,
      data: this.props.data,
      search_text: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ select_check: nextProps.activeValue })

      nextProps.selected == ''
        ? this.setState({ dsa: null })
        : this.setState({
            select_title_sel: nextProps.data
              .filter((item) => item.id == nextProps.selected)
              .map((item2) => item2.name),
          })
    }
  }

  render() {
    return (
      <div
        className="select_ui"
        onMouseLeave={() => {
          this.setState({ select: false, search_text: '' })
        }}
      >
        <div
          onClick={() => this.setState({ select: !this.state.select })}
          class={
            this.state.select == true
              ? 'select_ui_content_active'
              : 'select_ui_content'
          }
          id={this.state.select_title_sel !== null ? 'active' : ''}
        >
          <span>
            {this.state.select_title_sel == null
              ? this.props.title
              : this.state.select_title_sel}
          </span>
          <BsChevronDown size={11} />
        </div>
        {this.state.select == false ? null : (
          <div className="select_box_m">
            <div className="select_ui_search">
              <input
                type="text"
                placeholder="Qidirmoq..."
                className="sss_select"
                onChange={(e) => this.setState({ search_text: e.target.value })}
              />
            </div>
            <div
              className="select_ui_items"
              onMouseLeave={() => this.setState({ select: false })}
            >
              {/* <div
              onClick={() =>
                this.setState({
                  select_title_sel: this.props.title,
                  select_check: 0,
                })
              }
              className={'select_ui_item'}
            >
              <p>{this.props.title} </p>
            </div> */}
              {this.props.parrent == true ? (
                <div>
                  {this.props.data

                    .filter((item3) => item3.parent == null)
                    .filter((item4) => item4.disabled == false)
                    .map((item) => (
                      <div>
                        <div
                          onClick={() => (
                            this.setState({
                              select_title_sel: item.name,
                              select_check: item.id,
                              select: false,
                            }),
                            this.props.handle_change(item.id)
                          )}
                          className={
                            this.state.select_check == item.id
                              ? 'select_ui_item_active'
                              : 'select_ui_item'
                          }
                        >
                          <span> {item.name} </span>
                        </div>
                        <div>
                          {this.props.data

                            .filter((item3) => item3.parent == item.id)
                            .filter((item4) => item4.disabled == false)
                            .map((item) => (
                              <div>
                                <div
                                  onClick={() => (
                                    this.setState({
                                      select_title_sel: item.name,
                                      select_check: item.id,
                                      select: false,
                                    }),
                                    this.props.handle_change(item.id)
                                  )}
                                  className={
                                    this.state.select_check == item.id
                                      ? 'select_ui_item_active_2'
                                      : 'select_ui_item_2'
                                  }
                                >
                                  <span>{item.name}</span>
                                </div>
                                {this.props.data
                                  .filter((item2) =>
                                    item2.name
                                      .toLowerCase()
                                      .includes(
                                        this.state.search_text.toLowerCase(),
                                      ),
                                  )
                                  .filter((item3) => item3.parent == item.id)
                                  .filter((item4) => item4.disabled == false)
                                  .map((item) => (
                                    <div>
                                      <div
                                        onClick={() => (
                                          this.setState({
                                            select_title_sel: item.name,
                                            select_check: item.id,
                                            select: false,
                                          }),
                                          this.props.handle_change(item.id)
                                        )}
                                        className={
                                          this.state.select_check == item.id
                                            ? 'select_ui_item_active_3'
                                            : 'select_ui_item_3'
                                        }
                                      >
                                        <span>{item.name} </span>
                                      </div>
                                      {this.props.data
                                        .filter((item2) =>
                                          item2.name
                                            .toLowerCase()
                                            .includes(
                                              this.state.search_text.toLowerCase(),
                                            ),
                                        )
                                        .filter(
                                          (item3) => item3.parent == item.id,
                                        )
                                        .map((item) => (
                                          <div>
                                            <div
                                              onClick={() => (
                                                this.setState({
                                                  select_title_sel: item.name,
                                                  select_check: item.id,
                                                  select: false,
                                                }),
                                                this.props.handle_change(
                                                  item.id,
                                                )
                                              )}
                                              className={
                                                this.state.select_check ==
                                                item.id
                                                  ? 'select_ui_item_active_4'
                                                  : 'select_ui_item_4'
                                              }
                                            >
                                              <span>{item.name} </span>
                                            </div>
                                            {this.props.data
                                              .filter((item2) =>
                                                item2.name
                                                  .toLowerCase()
                                                  .includes(
                                                    this.state.search_text.toLowerCase(),
                                                  ),
                                              )
                                              .filter(
                                                (item3) =>
                                                  item3.parent == item.id,
                                              )
                                              .filter(
                                                (item4) =>
                                                  item4.disabled == false,
                                              )
                                              .map((item) => (
                                                <div>
                                                  <div
                                                    onClick={() => (
                                                      this.setState({
                                                        select_title_sel:
                                                          item.name,
                                                        select_check: item.id,
                                                        select: false,
                                                      }),
                                                      this.props.handle_change(
                                                        item.id,
                                                      )
                                                    )}
                                                    className={
                                                      this.state.select_check ==
                                                      item.id
                                                        ? 'select_ui_item_active_4'
                                                        : 'select_ui_item_4'
                                                    }
                                                  >
                                                    <span>{item.name} </span>
                                                  </div>
                                                  {this.props.data
                                                    .filter((item2) =>
                                                      item2.name
                                                        .toLowerCase()
                                                        .includes(
                                                          this.state.search_text.toLowerCase(),
                                                        ),
                                                    )
                                                    .filter(
                                                      (item3) =>
                                                        item3.parent == item.id,
                                                    )
                                                    .map((item) => (
                                                      <div>
                                                        <div
                                                          onClick={() => (
                                                            this.setState({
                                                              select_title_sel:
                                                                item.name,
                                                              select_check:
                                                                item.id,
                                                              select: false,
                                                            }),
                                                            this.props.handle_change(
                                                              item.id,
                                                            )
                                                          )}
                                                          className={
                                                            this.state
                                                              .select_check ==
                                                            item.id
                                                              ? 'select_ui_item_active_4'
                                                              : 'select_ui_item_4'
                                                          }
                                                        >
                                                          <span>
                                                            {item.name}{' '}
                                                          </span>
                                                        </div>
                                                      </div>
                                                    ))}
                                                </div>
                                              ))}
                                          </div>
                                        ))}
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                this.props.data
                  .filter((item2) =>
                    item2.name
                      .toLowerCase()
                      .includes(this.state.search_text.toLowerCase()),
                  )
                  .map((item) => (
                    <div
                      onClick={() => (
                        this.setState({
                          select_title_sel:
                            item.code == undefined
                              ? item.name
                              : item.code + ' ' + item.name,
                          select_check: item.id,
                          select: false,
                        }),
                        this.props.handle_change(item.id)
                      )}
                      className={
                        this.state.select_check == item.id
                          ? 'select_ui_item_active'
                          : 'select_ui_item'
                      }
                    >
                      <span>
                        {' '}
                        {item.code == undefined ? null : item.code} {item.name}{' '}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}
