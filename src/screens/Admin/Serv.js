import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  deleteItem,
  getAdminObr,
  getAdminObr2,
  getAdminOrg,
  getAdminServive,
  getEquipment,
  getInstitution,
  getService,
  moderadorCheckPutServise,
} from '../../api'

import Pagination from 'react-js-pagination'

import ScrollAnimation from 'react-animate-on-scroll'
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
import PanelBreadCrumb from './PanelBreadCrumb'

export default class Serv extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      service: [],
      institution: [],
      equipment: [],

      modal_text: '',
      search_text: '',
      lowerLimit: '2020-01-01',
      upperLimit: '2023-01-01',

      institution_list2: [],
      equipment_select: undefined,

      pageNumber: 1,

      countD: 0,
    }
  }

  componentDidMount() {
    getAdminServive(
      this,
      this.state.equipment_select,
      this.state.filter,
      this.state.pageNumber,
    )

    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })
  }

  handlePageChange(pageNumber) {
    getAdminServive(
      this,
      this.state.equipment_select,
      this.state.dataFilter,
      pageNumber,
    )
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
      ? getAdminServive(
          this,
          this.state.equipment_select,
          filter,
          this.state.pageNumber,
        )
      : getAdminServive(
          this,
          this.state.equipment_select,
          '-' + filter,
          this.state.pageNumber,
        )
  }

  filterData(id) {
    if (id == 'Hammasi') {
      getAdminServive(this, undefined)
    } else {
      getAdminServive(this, id)
    }
  }

  render() {
    return (
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <PanelBreadCrumb
          name={'Xizmatlar'}
          main_name="Bosh sahifa"
          back="/dashboard/main"
        />
        <div className="table">
          <div className="table_header">
            <p>
              {' '}
              Tashkilot xizmatlari <br />{' '}
              <span>miqdori {this.state.countD}</span>
            </p>
            <button>
              <NavLink to={'/dashboard/servise/form'}>Qo'shish</NavLink>
            </button>
          </div>
          <div className="table_filter">
            <div className="date_filter">
              <select onChange={(e) => this.filterData(e.target.value)}>
                <option value={undefined}>Hammasi</option>
                {this.state.equipment.map((item) => (
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
                    № -{' '}
                  </a>{' '}
                </th>
                <th>Nomi</th>
                <th>Tashkilot</th>
                <th>Uskunalar</th>
                <th>Yangilangan sanasi</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {this.state.service
                .filter(
                  (item2) =>
                    item2.name
                      .toLowerCase()
                      .includes(this.state.search_text.toLowerCase()) ||
                    item2.equipment_name
                      .toLowerCase()
                      .includes(this.state.search_text.toLowerCase()) ||
                    item2.organisation_name_uz
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
                      <NavLink to={`/dashboard/servise/formedit/${item.id}`}>
                        {item.name}{' '}
                      </NavLink>
                    </td>
                    <td>{item.organisation_name_uz}</td>
                    <td>
                      {item.equipment_name.length == 0 ? (
                        <span style={{ color: 'red' }}>
                          Qurilmalar moderator tarafidan ko'rib chiqilgandan
                          keyin xizmatga biriktirilishi mumkin
                        </span>
                      ) : (
                        item.equipment_name.map((item) => item.name)
                      )}
                    </td>
                    <td>{item.updated_date}</td>
                    <td>
                      {
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
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={this.state.countD}
            pageRangeDisplayed={20}
            onChange={this.handlePageChange.bind(this)}
          />

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
                      moderadorCheckPutServise(
                        this,
                        this.state.modalItem,
                        false,
                      )
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
                        'service',
                        this.state.modalID,
                        '/dashboard/servise',
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
