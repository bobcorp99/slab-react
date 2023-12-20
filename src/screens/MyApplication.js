import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { strings } from '../localozation'

import { NavLink } from 'react-router-dom'
import {
  getAplicantDataID,
  getAplicantions,
  getEquipment,
  getFinance,
  getInstitution,
  getInstitutionList,
  getRegion,
  getScienceField,
  getTnved,
} from '../api'

export default class MyApplication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: [],
      science: [],
      tnved: [],
      finance: [],
      equipment: [],
      institution_list: [],
      science: [],
      institution: [],
      aplications: [],

      loader: true,
    }
  }

  componentDidMount() {
    getAplicantions(this)
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header />
          <div className="component_top">{strings.zayavka} </div>
          <div className="search">
            <input type="text" placeholder={strings.filter.search} />
          </div>

          <div className="block liner">
            {this.state.loader == true ? (
              <div className="loader">
                <img
                  src={
                    'https://m-files.cdnvideo.ru/lpfile/7/d/d/7dde4abc28d869acae0d349319fdd7a9.gif'
                  }
                />
              </div>
            ) : null}
            <div className="block_row">
              {this.state.aplications.map((item) => (
                <NavLink
                  to={`/application/${item.id}/`}
                  className="resident_item_2_a"
                >
                  <div className="resident_left">
                    <div className="r_l_top">
                      {/* {this.state.institution_list} */}
                    </div>
                    <div
                      className="r_l_bottom"
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
                      }}
                    >
                      {item.name.substring(0, 1)}
                    </div>
                  </div>
                  <div className="resident_right">
                    <h1>{item.purpose}</h1>

                    <p>{item.requested_date}</p>

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
                          ? strings.status_name.text_2
                          : item.status == 'agreed' ||
                            item.status == 'rejected_agreed'
                          ? strings.status_name.text_1
                          : item.status == 'rejected'
                          ? strings.status_name.text_3
                          : strings.status_name.text_4}
                      </div>
                    </p>
                  </div>
                  {item.close_message == null ? null : (
                    <div
                      className={
                        item.status == 'rejected' ||
                        item.status == 'rejected_agreed'
                          ? 'message_box_l_2'
                          : 'message_box_l'
                      }
                    >
                      <h3>{strings.message} </h3>
                      <p>{item.close_message}</p>
                      <p className="m_c_d">{item.closed_date}</p>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
