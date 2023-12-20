import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  deleteItem,
  getAdminZayavki,
  getEquipment,
  getInstitution,
  getService,
  moderadorPutZayavka,
  getAdminZayaviteli,
  getAdminOrg,
} from '../../api'

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
import moment, { now } from 'moment'
import { strings } from '../../localozation'
import PanelBreadCrumb from './PanelBreadCrumb'

import Pagination from 'react-js-pagination'
import BreadCrumb from '../../components/BreadCrumb'

export default class Zayavki extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zayavki: [],

      purpose: '',
      name: '',
      required_date: '',
      requested_date: '',
      duration_days: '',
      once_flag: '',
      instruction: '',
      education_flag: '',
      result_flag: '',
      status: '',
      status: '',
      close_message: '',
      applicant: '',
      service: '',
      organisation: '',
      closed_by: '',
      equipment: '',

      closed_date: moment().format('YYYY-MM-DD'),
      modal_text: [],
      zayaviteli: [],
      institution: this.props.institution,

      activePage: 1,
      countE: 0,
      pageNumber: 1,
      filter: undefined,

      search_text: '',
    }
  }

  componentDidMount() {
    getAdminZayavki(this, this.state.pageNumber)
    getAdminZayaviteli(this)

    const user = localStorage.getItem('user')

    this.setState({ admin_id: JSON.parse(user).id })
  }

  handlePageChange(pageNumber) {
    getAdminZayavki(this, pageNumber)
    this.setState({ pageNumber: pageNumber })
    console.log(`active page is ${pageNumber}`)
    this.setState({ activePage: pageNumber })
  }

  submit() {
    this.state.close_message == ''
      ? this.setState({ error: true })
      : moderadorPutZayavka(
          this,
          this.state.modal_text.id,
          this.state.modal_text.purpose,
          this.state.modal_text.name,
          this.state.modal_text.required_date,
          this.state.modal_text.requested_date,
          this.state.modal_text.duration_days,
          this.state.modal_text.once_flag,
          this.state.modal_text.instruction,
          this.state.modal_text.education_flag,
          this.state.modal_text.result_flag,
          'approved',
          this.state.closed_date,
          this.state.close_message,
          this.state.modal_text.applicant,
          this.state.modal_text.service,
          this.state.modal_text.organisation,
          '',
          this.state.modal_text.equipment,
          this.state.modal_text.applicant_full_name,
          this.state.admin_id,
        )
  }

  cancel() {
    moderadorPutZayavka(
      this,
      this.state.modal_text.id,
      this.state.modal_text.purpose,
      this.state.modal_text.name,
      this.state.modal_text.required_date,
      this.state.modal_text.requested_date,
      this.state.modal_text.duration_days,
      this.state.modal_text.once_flag,
      this.state.modal_text.instruction,
      this.state.modal_text.education_flag,
      this.state.modal_text.result_flag,
      'rejected',
      this.state.closed_date,
      this.state.close_message,
      this.state.modal_text.applicant,
      this.state.modal_text.service,
      this.state.modal_text.organisation,
      '',
      this.state.modal_text.equipment,
      this.state.modal_text.applicant_full_name,
      this.state.admin_id,
    )
  }

  handle_change = (names, e) => {
    const name = names
    const value = e
    this.setState((prevstate) => {
      const newState = { ...prevstate }
      newState[name] = value
      return newState
    })
  }

  render() {
    return (
      <div>
        <PanelBreadCrumb
          name={'Murojjatlar'}
          main_name="Bosh sahifa"
          back="/dashboard/main"
        />
        <div className="table">
          <div className="table_header">
            <p style={{ paddingBottom: 30 }}>
              Murojjatlar <span>miqdori {this.state.countE}</span>
            </p>

            <div className="table_filter">
              <div className="table_filter_search">
                <input
                  type="text"
                  placeholder="Nomi bo'yicha qidirish"
                  onChange={(e) =>
                    this.setState({ search_text: e.target.value })
                  }
                  name=""
                  id=""
                />
              </div>
            </div>

            {/* <button>
            <NavLink to={'/admin/zayavki/form'}>Добавить</NavLink>
          </button> */}
          </div>
          <table class="styled-table">
            <thead>
              <tr>
                <th>№ - </th>
                <th>Murojjatchi / Tashkilot</th>
                <th>Xizmat</th>
                <th>Tadiqqot nomi</th>
                <th>Tadiqqot sanasi</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.zayavki
                .filter((item2) =>
                  item2.name
                    .toLowerCase()
                    .includes(this.state.search_text.toLowerCase()),
                )
                .map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                      {item.applicant_full_name} /{' '}
                      {item.applicant_organisation_name}
                    </td>
                    <td>{item.service_name}</td>
                    <td>{item.name}</td>
                    <td>{item.closed_date}</td>
                    <td>
                      {' '}
                      <p>
                        <div
                          className="table_status"
                          style={{
                            backgroundColor:
                              item.status == 'wait'
                                ? '#FEF3BB'
                                : item.status == 'agreed'
                                ? '#C4F1FB'
                                : item.status == 'rejected' ||
                                  item.status == 'rejected_agreed'
                                ? 'rgb(255 187 181 / 42%)'
                                : '#C8FCE0',
                            color:
                              item.status == 'wait'
                                ? '#8D421C'
                                : item.status == 'agreed'
                                ? '#1B4D4C'
                                : item.status == 'rejected' ||
                                  item.status == 'rejected_agreed'
                                ? 'red'
                                : '#0C4E36',
                          }}
                        >
                          {item.status == 'wait'
                            ? 'Kutish jarayonida'
                            : item.status == 'agreed' ||
                              item.status == 'rejected_agreed'
                            ? 'Koʻrildi'
                            : item.status == 'rejected'
                            ? 'Rad etilgan'
                            : 'Tasdiqlangan'}
                        </div>
                      </p>
                    </td>
                    <td>
                      <a
                        className="table_rec"
                        onClick={() =>
                          this.setState({
                            deleteModal: true,
                            modal_text: item,
                            modalID: item.id,
                          })
                        }
                      >
                        Javob berish
                      </a>
                      {/* <button className="table_edit">
                    {' '}
                    <NavLink to={'/dashboard/lab/form'}>
                      <FiEdit />{' '}
                    </NavLink>{' '}
                  </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={this.state.countE}
            pageRangeDisplayed={20}
            onChange={this.handlePageChange.bind(this)}
          />

          {this.state.deleteModal == true ? (
            <div className="order_content_admin">
              <div className="order_container">
                <div className="PanelBreadCrumb">
                  <div className="a_bread_crumb_links">
                    <ul>
                      <li>
                        <NavLink to="/dashboard/main">Bosh sahifa</NavLink>{' '}
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => this.setState({ deleteModal: false })}
                        >
                          Murojjatlar
                        </a>{' '}
                      </li>
                      <li>
                        <a href="#">{this.state.modal_text.service_name}</a>{' '}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="resident_item_full" style={{ marginTop: 10 }}>
                  <div
                    className="resident_left_full_status"
                    style={{
                      backgroundColor:
                        this.state.modal_text.status == 'wait'
                          ? '#FEF3BB'
                          : this.state.modal_text.status == 'agreed'
                          ? '#C8FCE0'
                          : this.state.modal_text.status == 'rejected' ||
                            this.state.modal_text.status == 'rejected_agreed'
                          ? 'rgb(255 187 181 / 42%)'
                          : '#C8FCE0',
                      color:
                        this.state.modal_text.status == 'wait'
                          ? '#8D421C'
                          : this.state.modal_text.status == 'agreed'
                          ? '#0C4E36'
                          : this.state.modal_text.status == 'rejected' ||
                            this.state.modal_text.status == 'rejected_agreed'
                          ? 'red'
                          : '#0C4E36',
                    }}
                  >
                    <div
                      className="r_l_top"
                      style={{
                        color:
                          this.state.modal_text.status == 'wait'
                            ? '#8D421C'
                            : this.state.modal_text.status == 'agreed'
                            ? '#0C4E36'
                            : this.state.modal_text.status == 'rejected' ||
                              this.state.modal_text.status == 'rejected_agreed'
                            ? 'red'
                            : '#0C4E36',
                      }}
                    >
                      {this.state.modal_text.status == 'wait'
                        ? 'Kutish jarayonida'
                        : this.state.modal_text.status == 'agreed' ||
                          this.state.modal_text.status == 'rejected_agreed'
                        ? 'Koʻrildi'
                        : this.state.modal_text.status == 'rejected'
                        ? 'Rad etilgan'
                        : 'Tasdiqlangan'}
                    </div>
                  </div>
                  <div className="resident_right">
                    <div className="resident_centered">
                      <h1>
                        {strings.zayavka_form.text_12} №
                        {this.state.modal_text.id}{' '}
                      </h1>
                      <h2> {this.state.modal_text.name}</h2>
                      <h3> {this.state.modal_text.service_name}</h3>
                      <h5> {this.state.modal_text.requested_date}</h5>
                    </div>
                  </div>
                </div>
                <div className="applicetion_row">
                  <div className="applicetion_box border_r_box">
                    <div className="applicetion_box_header">
                      {strings.zayavka_form.text_3}
                    </div>
                    <div className="application_box_item">
                      {this.state.modal_text.applicant_degree},{' '}
                      {this.state.modal_text.applicant_full_name} <br />
                      {this.state.modal_text.applicant_organisation_name} <br />
                      <br />
                      {this.state.modal_text.applicant_applicant_region_name}
                      {this.state.modal_text.applicant_address_line},{' '}
                      {this.state.modal_text.applicant_zip_code} <br />
                      {this.state.modal_text.applicant_phone},{' '}
                      {this.state.modal_text.applicant_email} <br />
                      <br />
                      <br />
                    </div>
                  </div>
                  <div className="applicetion_box">
                    <div className="applicetion_box_header">
                      {strings.zayavka_form.text_4}:
                    </div>
                    <div className="application_box_item">
                      {this.state.institution
                        .filter(
                          (item) =>
                            item.id == this.state.modal_text.organisation,
                        )
                        .map((item2) => (
                          <div className="application_box_item">
                            {item2.contact_name} <br />
                            {item2.name} <br /> <br />
                            {item2.region_name} {item2.address_line},{' '}
                            {item2.zip_code} <br />
                            {item2.contact_phone}, {item2.contact_email}
                            <br />
                            <br />
                          </div>
                        ))}{' '}
                      <br />
                    </div>
                  </div>
                </div>
                <div className="applicetion_puppose">
                  {strings.zayavka_form.text_5}:{' '}
                  <b>{this.state.modal_text.purpose}</b>
                </div>
                <div className="applicetion_some_inf">
                  <p>
                    {strings.zayavka_form.text_16}:{' '}
                    <b>{this.state.modal_text.required_date} </b>
                  </p>
                  <p>
                    {strings.zayavka_form.text_6}:{' '}
                    <b>
                      {this.state.modal_text.duration_days}{' '}
                      {strings.zayavka_form.text_7}
                    </b>
                  </p>
                  <p>
                    {strings.zayavka_form.text_8}:{' '}
                    <b>
                      <input
                        type={'checkbox'}
                        checked={this.state.modal_text.once_flag}
                        value={this.state.modal_text.once_flag}
                        placeholder="Pereodik tadqiqot*"
                      />
                    </b>
                  </p>
                  <p>
                    {strings.zayavka_form.text_9}{' '}
                    <b>
                      {' '}
                      <input
                        type={'checkbox'}
                        checked={this.state.modal_text.education_flag}
                        value={this.state.modal_text.education_flag}
                        placeholder="Pereodik tadqiqot*"
                      />
                    </b>
                  </p>
                </div>
                <div className="applicetion_instruction">
                  {strings.zayavka_form.text_10}:{' '}
                  <b>{this.state.modal_text.instruction}</b>
                </div>

                <div className="applicetion_instruction">
                  Qurulmalar:{' '}
                  <b>
                    {this.state.modal_text.equipment_name.map((item) => (
                      <div>
                        {item.name} <br />
                      </div>
                    ))}
                  </b>
                </div>
                <div className="applicetion_callback">
                  <div className="app_header">
                    {strings.zayavka_form.text_13}
                  </div>
                  <p>
                    {strings.zayavka_form.text_14}:{' '}
                    <b>
                      <textarea
                        maxLength="1024"
                        className={
                          this.state.error == true &&
                          this.state.close_message == ''
                            ? 'error1'
                            : null
                        }
                        placeholder={strings.zayavka_form.text_14}
                        onChange={(e) =>
                          this.handle_change('close_message', e.target.value)
                        }
                        defaultValue={this.state.modal_text.close_message}
                      ></textarea>
                    </b>
                  </p>
                  <p>
                    {strings.zayavka_form.text_15}:{' '}
                    <b>
                      {' '}
                      <input
                        placeholder={strings.zayavka_form.text_15}
                        value={this.state.closed_date}
                        defaultValue={this.state.modal_text.closed_date}
                        type="date"
                        onChange={(e) =>
                          this.handle_change('closed_date', e.target.value)
                        }
                      />
                    </b>
                  </p>
                </div>
                <div className="buttons_bot">
                  <button
                    className="closed_d"
                    onClick={() => this.setState({ deleteModal: false })}
                  >
                    Chiqish
                  </button>
                  <button className="clancel_d" onClick={() => this.cancel()}>
                    Rad Etish
                  </button>
                  <button onClick={() => this.submit()}>Qabul qilish</button>
                </div>
                <div className="block liner">
                  <div className="some_text">
                    {/* <h3>Xizmatda qo'laniladigan ilmiy uskunalar:</h3> */}

                    <div className="block_row"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
