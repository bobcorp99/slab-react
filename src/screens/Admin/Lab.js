import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  deleteItem,
  getAdminlabs,
  getAdminOrg,
  getInstitution,
  moderadorCheckPostLabs,
  moderadorCheckPutLabs,
  moderadorPostLabs,
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

import ScrollAnimation from 'react-animate-on-scroll'

import { BsArrowDownUp } from 'react-icons/bs'

import { SiMicrosoftexcel } from 'react-icons/si'
import moment from 'moment'
import PanelBreadCrumb from './PanelBreadCrumb'

import Pagination from 'react-js-pagination'

export default class Lab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      labs: [],
      loading: true,
      institution: [],

      deleteModal: false,
      checkModal: false,
      modal_text: '',

      search_text: '',
      lowerLimit: '2020-01-01',
      upperLimit: '2023-01-01',
      institution_list2: [],
      modalItem: {},

      activePage: 1,

      count: 0,
      pageNumber: 1,
    }
  }

  componentDidMount() {
    getAdminlabs(this, '', this.state.pageNumber)

    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })
  }

  handlePageChange(pageNumber) {
    getAdminlabs(this, this.state.dataFilter, pageNumber)
    this.setState({ pageNumber: pageNumber })
    console.log(`active page is ${pageNumber}`)
    this.setState({ activePage: pageNumber })
  }

  filter(filter) {
    this.setState({ loading: true })

    this.setState ({ filter: !this.state.filter })
    this.state.filter == true
      ? this.setState({ dataFilter: filter })
      : this.setState({ dataFilter: '-' + filter })
    this.state.filter == true
      ? getAdminlabs(this, filter, this.state.pageNumber)
      : getAdminlabs(this, '-' + filter, this.state.pageNumber)
  }

  render() {
    return (
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <PanelBreadCrumb
          name={'Laboratoriyalar'}
          main_name="Bosh sahifa"
          back="/dashboard/main"
        />
        <div className="table">
          <div className="table_header">
            <p>
              Tashkilot laboratoriyalari <br />{' '}
              <span>miqdori {this.state.count}</span>
            </p>
            <div className="t_header_g">
              {/* <button className="exel">
              <NavLink to={'/admin/lab/form'}>
                <SiMicrosoftexcel /> Экспорт в эксель
              </NavLink>
            </button> */}
              <button>
                <NavLink to={'/dashboard/lab/form'}>
                  <FiPlus /> Qo'shish
                </NavLink>
              </button>
            </div>
          </div>

          <div className="table_filter">
            <div className="date_filter">
              <input
                type="date"
                onChange={(e) => {
                  this.setState({ lowerLimit: e.target.value })
                }}
              />
              <input
                type="date"
                onChange={(e) => {
                  this.setState({ upperLimit: e.target.value })
                }}
              />
            </div>
            <div className="table_filter_search">
              <input
                type="text"
                placeholder="Nomi bo'yicha qidirish"
                onChange={(e) => this.setState({ search_text: e.target.value })}
                name=""
                id=""
              />
            </div>
          </div>

          <table class="styled-table">
            <thead>
              <tr>
                <th>
                  {' '}
                  <a href="#" onClick={() => this.filter('id')}>
                    {' '}
                    № <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  <a href="#" onClick={() => this.filter('organisation')}>
                    Tashkilot
                    <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  <a href="#" onClick={() => this.filter('name')}>
                    Nomi
                    <BsArrowDownUp />
                  </a>
                </th>

                <th>Yangilangan sanasi</th>
                <th>
                  {' '}
                  <a href="#" onClick={() => this.filter('disabled')}>
                    Holat <BsArrowDownUp />
                  </a>
                </th>
              </tr>
            </thead>
            {this.state.loading == true ? (
              <tbody>
                <div className="table_loading">
                  <img src="https://naenisee.ru/static/img/public/loading.gif" />
                </div>
              </tbody>
            ) : (
              <tbody>
                {this.state.labs
                  .filter(
                    (item2) =>
                      item2.name
                        .toLowerCase()
                        .includes(this.state.search_text.toLowerCase()) ||
                      item2.organisation_name
                        .toLowerCase()
                        .includes(this.state.search_text.toLowerCase()),
                  )
                  .filter(
                    (item3) =>
                      this.state.lowerLimit <= item3.updated_at &&
                      item3.updated_at <= this.state.upperLimit,
                  )
                  .map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>
                        <NavLink to={`/dashboard/lab/formedit/${item.id}`}>
                          {item.organisation_name}{' '}
                        </NavLink>{' '}
                      </td>
                      <td>
                        {' '}
                        <p className="table_text_main">
                          {' '}
                          <NavLink to={`/dashboard/lab/formedit/${item.id}`}>
                            {item.name}
                          </NavLink>{' '}
                        </p>{' '}
                      </td>

                      <td>{moment(item.updated_at).format('DD.MM.YYYY')}</td>
                      <td>
                        {' '}
                        <div
                          className="table_status"
                          style={{
                            backgroundColor:
                              item.disabled == true ? '#FEF3BB' : '#C8FCE0',
                            color:
                              item.disabled == true ? '#8D421C' : '#0C4E36',
                          }}
                        >
                          {item.disabled == true ? 'Kutish jarayonida' : 'Faol'}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={this.state.count}
            pageRangeDisplayed={20}
            onChange={this.handlePageChange.bind(this)}
          />
          {/* <div className="table_bottom">
          <p>Всего (1)</p>
        </div> */}

          {this.state.checkModal == true ? (
            <div className="modal">
              <div className="modal_content">
                <div className="modal_header">Tasdiqlash</div>
                <div className="modal_text">{this.state.modal_text}</div>
                <div className="modal_buttons">
                  <button
                    className="m-cancel"
                    onClick={() => this.setState({ checkModal: false })}
                  >
                    Bekor qilish{' '}
                  </button>
                  <button
                    onClick={() =>
                      moderadorCheckPutLabs(this, this.state.modalItem, false)
                    }
                    className="m-delete_2"
                  >
                    Tasdiqlash
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.deleteModal == true ? (
            <div className="modal">
              <div className="modal_content">
                <div className="modal_header">Удалить</div>
                <div className="modal_text">{this.state.modal_text}</div>
                <div className="modal_buttons">
                  <button
                    className="m-cancel"
                    onClick={() => this.setState({ deleteModal: false })}
                  >
                    Отметить{' '}
                  </button>
                  <button
                    onClick={() => (
                      this.setState({ deleteModal: false }),
                      deleteItem(
                        this,
                        'labs',
                        this.state.modalID,
                        '/dashboard/lab',
                      ),
                      this.filter()
                    )}
                    className="m-delete"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </ScrollAnimation>
    )
  }
}
