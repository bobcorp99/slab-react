import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { NavLink } from 'react-router-dom'

import {
  deleteItem,
  getAdminlabs,
  getAdminOrg,
  getAdminServive,
  getEquipment,
  getEquipmentList,
  getInstitution,
  getAdminZayaviteli,
  getAdminZayavki,
  getInstitutionByID,
  getFileList,
  getAdminObr2,
  getChartEquipment,
  getChartServise,
} from '../api'

import moment from 'moment'

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

import { strings } from '../localozation'

import { BsArrowDownUp } from 'react-icons/bs'
import PanelBreadCrumb from './Admin/PanelBreadCrumb'

import { Chart } from 'react-google-charts'

export default class AdminMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equipment: [],
      institution: [],
      equipment_list: [],
      loading: true,

      deleteModal: false,
      modal_text: '',

      labs: [],
      equipment: [],
      institution: [],
      service: [],
      zayaviteli: [],
      zayavki: [],

      service: [],
      equipment: [],
      institution_list: [],
      science: [],
      institution_info: {
        description_uz: '',
        short_name_uz: '',
        institution: 1,
        science_field: [],
        short_name_ru: '',
      },
      fileData: [],

      labs_list: [],

      fileData_lab: [],

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

      role: 'moderator',

      zayavki: [],
      zayaviteli: [],
      service: [],

      chartData: [['Uskunalar', 'Murojjatlar']],
      chartData2: [['Xizmatlar', 'Murojjatlar']],

      chartData3: [
        ['Murojjatlar', 'soni'],
        ['Text', 123],
        ['Text', 123],
        ['Text', 123],
      ],
    }
  }

  componentDidMount() {
    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })

    const user = JSON.parse(localStorage.getItem('user')).role
    this.setState({ role: user })

    getAdminOrg(this, this.state.filter)
    getChartEquipment(this, organisationID)
    getChartServise(this, organisationID)

    getAdminServive(this)
    getAdminlabs(this)
    getAdminOrg(this, this.state.filter)
    getAdminObr2(this, this.state.filter)
    getAdminZayaviteli(this)
    getAdminZayavki(this)

    getAdminServive(this)

    getInstitutionByID(this, organisationID)

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    getFileList(this, organisationID, '', '')
  }

  filter(filter) {
    this.setState({ loading: true })
    this.setState({ filter: !this.state.filter })
    this.state.filter == true
      ? getEquipment(this, filter)
      : getEquipment(this, '-' + filter)
  }

  render() {
    return (
      <div className="admin_main">
        <PanelBreadCrumb
          name={'Bosh sahifa'}
          main_name="Bosh sahifa"
          back="/dashboard/main"
        />
        {this.state.role == 'moderator' ? null : (
          <div className="resident_item_full_admin">
            <div className="resident_right_admin">
              <img
                src={
                  this.state.institution_info.logo == null
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nNU9EHr1BtZUHmEnQZXFSxcLaPARu8pCmETczEG33LlPrhFvPpKhH7H1MOcKGzRS-6Q&usqp=CAU'
                    : this.state.institution_info.logo
                }
                alt=""
              />
              <h1>{this.state.institution_info.name_uz}</h1>
            </div>
          </div>
        )}
        <div className="row">
          <div className="a_block_item">
            <h3>Laboratoriyalar</h3>
            <p> {this.state.labs.length}</p>
          </div>
          <div className="a_block_item">
            <h3>Uskunalar</h3>
            <p>{this.state.equipment.length}</p>
          </div>
          <div className="a_block_item">
            <h3>Xizmatlar</h3>
            <p>{this.state.service.length}</p>
          </div>
          <div className="a_block_item">
            <h3>Murojjatlar</h3>
            <p>{this.state.zayavki.length}</p>
          </div>
        </div>
        <div className="chart_row">
          <div className="chart_item">
            <div className="item_s_padding">
              <div className="table_header">
                <p>
                  Uskunalar bo`yicha murojjatlar soni <br />{' '}
                </p>
              </div>
              <Chart
                chartType="Bar"
                data={this.state.chartData}
                width="100%"
                height="400px"
                legendToggle
              />
            </div>
          </div>
          <div className="chart_item">
            <div className="item_s_padding">
              <div className="table_header">
                <p>
                  Murojjatlar statusi <br />{' '}
                </p>
              </div>
              <Chart
                chartType="PieChart"
                data={[
                  ['Murojjatlar', 'soni'],
                  [
                    'Tasdiqlangan',
                    this.state.zayavki.filter(
                      (item) =>
                        item.status == 'approved' || item.status == 'agreed',
                    ).length,
                  ],
                  [
                    'Rad etilgan',
                    this.state.zayavki.filter(
                      (item) =>
                        item.status == 'rejected' ||
                        item.status == 'rejected_agreed',
                    ).length,
                  ],
                  [
                    'Kutish jarayonida',
                    this.state.zayavki.filter((item) => item.status == 'wait')
                      .length,
                  ],
                ]}
                width="100%"
                height="400px"
                legendToggle
              />
            </div>
          </div>
          <div className="chart_item">
            <div className="item_s_padding">
              <div className="table_header">
                <p>
                  Xizmatlar bo`yicha murojjatlar soni <br />{' '}
                </p>
              </div>
              <Chart
                chartType="Bar"
                data={this.state.chartData2}
                width="100%"
                height="400px"
                legendToggle
              />
            </div>
          </div>
          <div className="chart_item">
            <div className="item_s_padding">
              <div className="table_header">
                <p>
                  Murojjatlar <br />{' '}
                </p>
              </div>
              <Chart
                chartType="LineChart"
                data={[
                  ['Kuni', 'soni'],

                  [
                    moment().add('day', -9).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -9).format('YYYY-MM-DD'),
                    ).length,
                  ],
                  [
                    moment().add('day', -8).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -8).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -7).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -7).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -6).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -6).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -5).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -5).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -4).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -4).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -3).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -3).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -2).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -2).format('YYYY-MM-DD'),
                    ).length,
                  ],

                  [
                    moment().add('day', -1).format('YYYY-MM-DD'),

                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date ===
                        moment().add('day', -1).format('YYYY-MM-DD'),
                    ).length,
                  ],
                  [
                    moment().format('YYYY-MM-DD'),
                    this.state.zayavki.filter(
                      (item) =>
                        item.created_date === moment().format('YYYY-MM-DD'),
                    ).length,
                  ],
                ]}
                width="100%"
                height="400px"
                legendToggle
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
