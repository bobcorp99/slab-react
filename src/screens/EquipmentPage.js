import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { NavLink } from 'react-router-dom'

import { strings } from '../localozation'
import {
  getCountry,
  getCurrency,
  getEquipmentByID,
  getFileList,
  getFinance,
  getInstitution,
  getInstitutionByID,
  getPurchaseReason,
  getServiseByID,
  getTnved,
} from '../api'
import BreadCrumb from '../components/BreadCrumb'

export default class EquipmentPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution_info: {
        description: '',
        name: '',
        organisation_name: '',
        organisation: '',
      },
      tnved_list: [],
      finance: [],
      purchase: [],
      country: [],
      currency: [],
      fileData: [],
      institution_list2: [],
    }
  }

  componentDidMount() {
    getFileList(this, '', '', this.props.match.params.item_id, '')

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })
    getTnved(this, lang)

    getFinance(this, lang)
    getPurchaseReason(this, lang)
    getCountry(this, lang)
    getCurrency(this, lang)

    getEquipmentByID(this, this.props.match.params.item_id, lang)

    getInstitution(this, lang)
  }

  setLanguage(lang) {
    this.setState({ lang: lang })

    getTnved(this, lang)

    getEquipmentByID(this, this.props.match.params.item_id, lang)

    getFinance(this, lang)
    getPurchaseReason(this, lang)
    getCountry(this, lang)
    getCurrency(this, lang)

    getInstitution(this, lang)
  }

  render() {
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />
          <BreadCrumb
            home_name={this.state.lang == 'uz' ? 'Asosiy' : 'Главная'}
            lang={this.state.lang}
            back={'/servise'}
            main_name={this.state.lang == 'uz' ? 'Qurilmalar' : 'Оборудование'}
            name={this.state.institution_info.name}
          />

          <div className="block liner">
            <div className="block_row">
              <div className="top_styles">
                <h2>
                  {this.state.institution_list2
                    .filter(
                      (item) =>
                        item.id == this.state.institution_info.organisation,
                    )
                    .map((item) => (
                      <p
                        style={{
                          borderBottom: '1px solid #eaeaea',
                          paddingBottom: 10,
                          marginBottom: 10,
                          display: 'block',
                          fontSize: 24,
                        }}
                      >
                        {this.state.lang == 'uz'
                          ? item.short_name_uz
                          : item.short_name_ru}
                      </p>
                    ))}
                </h2>
                <h1 style={{ marginBottom: 12, display: 'block' }}>
                  {this.state.institution_info.name}
                </h1>
                <p className="more_big_text" style={{ fontSize: 18 }}>
                  {this.state.institution_info.description}
                </p>
              </div>
              <div className="file_block">
                <div className="file_title">{strings.servisepage.text_1}</div>
                <div className="files_data_3">
                  {this.state.fileData.map((item) => (
                    <a
                      href={item.filename}
                      target="_blank"
                      className="files_item"
                    >
                      <img
                        src={
                          item.attachment_type == 3
                            ? 'https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png'
                            : item.attachment_type == 2
                            ? 'https://aux.iconspalace.com/uploads/file-document-icon-256.png'
                            : item.attachment_type == 1
                            ? 'https://cdn-icons-png.flaticon.com/512/2875/2875411.png'
                            : 'https://cdn-icons-png.flaticon.com/512/2875/2875411.png'
                        }
                        alt=""
                      />
                      <div className="file_item_right">
                        <p>{item.name}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {this.props.match.params.id == 1 ? (
                <div className="resident_item_full">
                  <div className="resident_top">
                    <div className="r_l_top">
                      {this.state.institution_info.description.substring(0, 30)}
                    </div>
                    <div
                      className="r_l_bottom"
                      style={{ backgroundColor: '#CB2F1E' }}
                    >
                      1
                    </div>
                  </div>
                  <div className="resident_right">
                    <img
                      src={
                        this.state.institution_info.logo == null
                          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nNU9EHr1BtZUHmEnQZXFSxcLaPARu8pCmETczEG33LlPrhFvPpKhH7H1MOcKGzRS-6Q&usqp=CAU'
                          : this.state.institution_info.logo
                      }
                      alt=""
                    />
                    <h1>{this.state.institution_info.name}</h1>
                    <p>
                      {this.state.institution_info.description.substring(
                        0,
                        350,
                      )}
                    </p>
                  </div>
                  <div className="more_info">
                    <h3>{strings.institutionpage.text_1}</h3>
                    <ul>
                      <li>{this.state.institution_info.chief_name}</li>
                    </ul>
                    <h3>{strings.institutionpage.text_2}</h3>
                    <p>
                      <li>{this.state.institution_info.contact_phone}</li>
                      <li>{this.state.institution_info.contact_email}</li>
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="some_text">
              <p className="teb_s">{strings.equipmentpage.text_1}</p>
              <table className="table_ss">
                <tbody>
                  <tr className="tr_styles">
                    <td>{strings.equipmentpage.text_3}</td>
                    <td>{strings.equipmentpage.text_4}</td>
                    <td>{strings.equipmentpage.text_5}</td>
                    <td>{strings.equipmentpage.text_6}</td>
                    <td>{strings.equipmentpage.text_7}</td>
                    <td>{strings.equipmentpage.count}</td>
                  </tr>
                  <tr className="dd_4">
                    <td> {this.state.institution_info.lab_name}</td>
                    <td> {this.state.institution_info.equipment_name}</td>
                    <td>
                      {' '}
                      {this.state.institution_info.status == 'deposit'
                        ? this.state.lang == 'uz'
                          ? 'Ishga tushirilmagan'
                          : 'Не запущен'
                        : this.state.institution_info.status == 'maintained'
                        ? this.state.lang == 'uz'
                          ? 'Ishlatilayapti'
                          : 'Не используется'
                        : this.state.institution_info.status == 'discarded'
                        ? this.state.lang == 'uz'
                          ? 'Spisanie kilingan'
                          : 'Списан '
                        : null}
                    </td>
                    <td> {this.state.institution_info.condition}</td>
                    <td>
                      <input
                        style={{ width: 15, marginTop: -8 }}
                        className="check_box"
                        type="checkbox"
                        placeholder="Скрыто"
                        value={this.state.institution_info.is_unique}
                        checked={this.state.institution_info.is_unique}
                      />
                    </td>
                    <td>{ this.state.institution_info.quantity }</td>
                  </tr>
                </tbody>
              </table>
              <p className="teb_s">{strings.equipmentpage.text_8}</p>
              <table className="table_ss">
                <tbody>
                  <tr className="tr_styles">
                    <td>{strings.equipmentpage.text_9}</td>
                    <td>{strings.equipmentpage.text_10}</td>
                    <td>{strings.equipmentpage.text_11}</td>
                    <td>{strings.equipmentpage.text_12}</td>
                    <td>{strings.equipmentpage.text_13}</td>
                    <td>{strings.equipmentpage.text_14}</td>
                    <td>{strings.equipmentpage.text_15}</td>
                    <td>{strings.equipmentpage.text_16}</td>
                    <td>{strings.equipmentpage.text_17}</td>
                    <td>{strings.equipmentpage.text_18}</td>
                    <td>{strings.equipmentpage.text_19}</td>
                  </tr>
                  <tr className="dd_4">
                    <td> {this.state.institution_info.fin_source_name}</td>
                    <td>{this.state.institution_info.manufacture_year}</td>
                    <td>{this.state.institution_info.purchase_year}</td>

                    <td>
                      {this.state.tnved_list
                        .filter(
                          (item3) =>
                            item3.id ==
                            parseInt(this.state.institution_info.tnved),
                        )
                        .map((item) => item.code + ' - ' + item.name)}
                    </td>
                    <td>{this.state.institution_info.purchase_reason}</td>
                    <td>{this.state.institution_info.expiration_year}</td>
                    <td>
                      {this.state.country
                        .filter(
                          (item) =>
                            item.id ==
                            this.state.institution_info.manufacture_country,
                        )
                        .map((item3) => item3.name)}
                    </td>
                    <td>
                      {this.state.country
                        .filter(
                          (item) =>
                            item.id ==
                            this.state.institution_info.purchase_country,
                        )
                        .map((item3) => item3.name)}
                    </td>
                    <td>{this.state.institution_info.purchase_price}</td>
                    <td>
                      {this.state.currency
                        .filter(
                          (item) =>
                            item.id ==
                            this.state.institution_info.purchase_currency,
                        )
                        .map((item3) => item3.name)}
                    </td>

                    <td>{this.state.institution_info.stock_number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
