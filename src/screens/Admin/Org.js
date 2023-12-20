import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  deleteItem,
  getAdminOrg,
  getInstitution,
  getInstitutionList,
  getOrgType,
  getRegion,
  getRegionList,
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
import moment from 'moment'
import PanelBreadCrumb from './PanelBreadCrumb'

import Pagination from 'react-js-pagination'

export default class Org extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution: [],
      institution_list: [],
      region_list: [],
      filter: 'id',
      search_text: this.props.search_text,
      loading: true,
      count: 0,

      deleteModal: false,
      modal_text: '',
      search_text: '',
      lowerLimit: '2020-01-01',
      upperLimit: '2023-01-01',
      org_type_list: [],
      institution_active: 'all',
      activePage: 1,
      countC: 0,
      pageNumber: 1,
      filter: undefined,
    }
  }

  componentDidMount() {
    getAdminOrg(this, this.state.filter, this.state.pageNumber)
    getInstitutionList(this, this.state.filter, 'uz')
    getRegion(this, 'uz')
    getOrgType(this, 'uz')
  }

  handlePageChange(pageNumber) {
    getAdminOrg(this, this.state.dataFilter, pageNumber)
    this.setState({ pageNumber: pageNumber })
    console.log(`active page is ${pageNumber}`)
    this.setState({ activePage: pageNumber })
  }

  filter(filter) {
    this.setState({ loading: true })
    this.setState({ filter: !this.state.filter })

    this.state.filter == true
      ? this.setState({ dataFilter: filter })
      : this.setState({ dataFilter: '-' + filter })

    this.state.filter == true
      ? getAdminOrg(this, filter, this.state.pageNumber)
      : getAdminOrg(this, '-' + filter, this.state.pageNumber)
  }

  render() {
    return (
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <PanelBreadCrumb
          name={'Tashkilotlar'}
          main_name="Bosh sahifa"
          back="/dashboard/main"
        />
        <div className="table">
          <div className="table_header">
            <p>
              Tashkilotlar <br /> <span>miqdori {this.state.countC}</span>
            </p>

            <button>
              <NavLink to={'/dashboard/org/form'}>Qo'shish</NavLink>
            </button>
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

              <select
                onChange={(e) =>
                  this.setState({ institution_active: e.target.value })
                }
              >
                <option value={'all'}>Hammasi</option>
                {this.state.institution_list.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
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
                    №{' '}
                  </a>
                </th>
                <th>
                  <a href="#" onClick={() => this.filter('name')}>
                    Nomi
                    <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  <a href="#" onClick={() => this.filter('institution')}>
                    Idora <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  <a href="#" onClick={() => this.filter('organization_type')}>
                    Tashkilot turi
                    <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  {' '}
                  <a href="#" onClick={() => this.filter('region')}>
                    Mintaqa <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  {' '}
                  <a href="#" onClick={() => this.filter('disabled')}>
                    Holat <BsArrowDownUp />
                  </a>
                </th>
                <th>
                  {' '}
                  <a href="#" onClick={() => this.filter('updated_at')}>
                    Yangilanish sanasi <BsArrowDownUp />
                  </a>
                </th>
              </tr>
            </thead>

            {this.state.loading == true ? (
              <tbody>
                <div className="table_loading">
                  <img src="https://i.gifer.com/7plQ.gif" />
                </div>
              </tbody>
            ) : (
              <tbody>
                {this.state.institution
                  .filter(
                    (item2) =>
                      item2.name
                        .toLowerCase()
                        .includes(this.state.search_text.toLowerCase()) ||
                      item2.organization_type_name
                        .toLowerCase()
                        .includes(this.state.search_text.toLowerCase()) ||
                      item2.region_name
                        .toLowerCase()
                        .includes(this.state.search_text.toLowerCase()),
                  )
                  .filter(
                    (item3) =>
                      this.state.lowerLimit <= item3.updated_at &&
                      item3.updated_at <= this.state.upperLimit,
                  )

                  .map((item) =>
                    item.institution == this.state.institution_active ? (
                      <tr>
                        <td> {item.id}</td>
                        <td className="main_t">
                          <img
                            src={
                              item.logo == null
                                ? 'https://plasticsurgery-ua.org/wp-content/uploads/2016/11/default-placeholder.png'
                                : item.logo
                            }
                          />
                          <NavLink to={`/dashboard/org/formedit/${item.id}`}>
                            <p className="table_text_main">{item.short_name}</p>
                          </NavLink>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.organization_type_name}</td>
                        <td>{item.region_name}</td>
                        <td>
                          <div
                            className="table_status"
                            style={{
                              backgroundColor:
                                item.disabled == true ? '#FEF3BB' : '#C8FCE0',
                              color:
                                item.disabled == true ? '#8D421C' : '#0C4E36',
                            }}
                          >
                            {item.disabled == true
                              ? 'Kutish jarayonida'
                              : 'Faol'}
                          </div>
                        </td>
                        <td>{moment(item.updated_at).format('DD.MM.YYYY')}</td>
                      </tr>
                    ) : this.state.institution_active == 'all' ? (
                      <tr>
                        <td> {item.id}</td>
                        <td className="main_t">
                          <img
                            src={
                              item.logo == null
                                ? 'https://plasticsurgery-ua.org/wp-content/uploads/2016/11/default-placeholder.png'
                                : item.logo
                            }
                          />
                          <NavLink to={`/dashboard/org/formedit/${item.id}`}>
                            <p className="table_text_main">{item.short_name}</p>
                          </NavLink>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.organization_type_name}</td>
                        <td>{item.region_name}</td>
                        <td>
                          <div
                            className="table_status"
                            style={{
                              backgroundColor:
                                item.disabled == true ? '#FEF3BB' : '#C8FCE0',
                              color:
                                item.disabled == true ? '#8D421C' : '#0C4E36',
                            }}
                          >
                            {item.disabled == true
                              ? 'Kutish jarayonida'
                              : 'Faol'}
                          </div>
                        </td>
                        <td>{moment(item.updated_at).format('DD.MM.YYYY')}</td>
                      </tr>
                    ) : null,
                  )}
              </tbody>
            )}
          </table>

          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={this.state.countC}
            pageRangeDisplayed={20}
            onChange={this.handlePageChange.bind(this)}
          />

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
                        'organisation',
                        this.state.modalID,
                        '/dashboard/org',
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
