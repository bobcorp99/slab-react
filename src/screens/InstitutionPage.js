import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { NavLink } from 'react-router-dom'

import { strings } from '../localozation'
import {
  getEquipmentFilter,
  getFileList,
  getFileList2,
  getInstitutionByID,
  getInstitutionList,
  getPublucLabsByID,
  getScienceField,
  getServiseFilter,
} from '../api'
import LabListItem from '../components/LabListItem'
import ServiseListItem from '../components/ServiceListItem'
import EquipmentListItem from '../components/EquipmentListItem'
import BreadCrumb from '../components/BreadCrumb'

export default class InstitutionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        science_field_name: [],
      },
      fileData: [],

      labs_list: [],

      fileData_lab: [],

      colors: [],

      lab_id: null,
    }
  }

  generateColor() {
    return '#' + Math.random().toString(16).substr(-6)
  }

  updateColor(index) {
    let colors = this.state.colors.slice()
    const currentColor = this.generateColor()
    colors[index].hexCode = currentColor
    this.setState({
      colors: colors,
    })
  }

  async componentDidMount() {
    getServiseFilter(this, this.props.match.params.item_id)
    getEquipmentFilter(this, this.props.match.params.item_id)

    getScienceField(this)

    getPublucLabsByID(this, this.props.match.params.item_id)

    let lang = localStorage.getItem('lang')

    this.setState({ lang: lang })

    getInstitutionByID(this, this.props.match.params.item_id, lang)

    getFileList(this, this.props.match.params.item_id, '', '')
    getInstitutionList(this, this.props.match.params.item_id, lang)
  }

  setLanguage(lang) {
    this.setState({ lang: lang })
    getInstitutionByID(this, this.props.match.params.item_id, lang)
    getInstitutionList(this, this.props.match.params.item_id, lang)
  }

  selectLab(id) {
    if (id == this.state.lab_id) {
      this.setState({ lab_id: null })
      this.setState({ fileData_lab: [] })
    } else {
      this.setState({ lab_id: id })
      getFileList2(this, '', id, '', '')
    }
  }

  render() {
    for (let i = 0; i < this.state.labs_list.length; i += 1) {
      this.state.colors.push({
        id: this.state.labs_list[i].id,
        hexCode: this.generateColor(),
      })
    }
    return (
      <div>
        <div className="wrapper container">
          <Header setLanguage={this.setLanguage.bind(this)} />

          <BreadCrumb
            home_name={this.state.lang == 'uz' ? 'Asosiy' : 'Главная'}
            lang={this.state.lang}
            back={'/institution'}
            main_name={this.state.lang == 'uz' ? 'Tashkilotlar' : 'Учреждения'}
            name={
              this.state.lang == 'uz'
                ? this.state.institution_info.short_name_uz
                : this.state.institution_info.short_name_ru
            }
          />
          <div className="block liner">
            <div className="block_row">
              <h1 style={{ marginBottom: 30 }}>
                {this.state.lang == 'uz'
                  ? this.state.institution_info.short_name_uz
                  : this.state.institution_info.short_name_ru}
              </h1>
              {this.props.match.params.id == 1 ? (
                <div className="resident_item_full">
                  {/* <div className="resident_top">
                    <div className="r_l_top">
                      {this.state.institution_info.organization_type_name}
                    </div>
                    <div
                      className="r_l_bottom"
                      style={{ backgroundColor: '#CB2F1E' }}
                    >
                      1
                    </div>
                  </div> */}
                  <div className="resident_right">
                    {/* <img
                      src={
                        this.state.institution_info.logo == null
                          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nNU9EHr1BtZUHmEnQZXFSxcLaPARu8pCmETczEG33LlPrhFvPpKhH7H1MOcKGzRS-6Q&usqp=CAU'
                          : this.state.institution_info.logo
                      }
                      alt=""
                    /> */}
                    <h1>
                      {this.state.lang == 'uz'
                        ? this.state.institution_info.short_name_uz
                        : this.state.institution_info.short_name_ru}
                      , {strings.institutionpage.text_15}
                      {': '}
                      {this.state.institution_info.since_year}{' '}
                    </h1>
                    <p>
                      {this.state.lang == 'ru'
                        ? this.state.institution_info.description_ru
                        : this.state.institution_info.description_uz}
                    </p>
                    <div className="files_data">
                      {this.state.fileData.map((item) => (
                        <a
                          href={item.filename}
                          target="_blank"
                          className="files_item"
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg2lbnPuloURbYE_UKSKoA0nmBjerPRHhnrPYWGRYsn-45XLJOY1u5p3MFs-xODCbuFEs&usqp=CAU"
                            alt=""
                          />
                          <div className="file_item_right">
                            <p>{item.name}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="more_info" style={{ paddingBottom: 20 }}>
                    <h3>{strings.institutionpage.text_1}</h3>
                    <ul>
                      <li>{this.state.institution_info.chief_name}</li>
                    </ul>
                    <h3>{strings.institutionpage.text_2}</h3>
                    <p>
                      <li>
                        <a
                          href={
                            'tel:' + this.state.institution_info.contact_phone
                          }
                        >
                          {this.state.institution_info.contact_phone}
                        </a>
                      </li>
                      <li>
                        <a
                          href={
                            'mailto:' +
                            this.state.institution_info.contact_email
                          }
                        >
                          {this.state.institution_info.contact_email}
                        </a>
                      </li>
                    </p>
                    <h3>{strings.institutionpage.text_8}</h3>
                    <p>
                      <li>{this.state.institution_info.zip_code}</li>
                    </p>
                    <h3>{strings.institutionpage.text_9}</h3>
                    <p>
                      <li>
                        <a href={this.state.institution_info.web}>
                          {this.state.institution_info.web}
                        </a>
                      </li>
                    </p>
                    <h3>{strings.institutionpage.text_10}</h3>
                    <p>
                      <li>
                        <a href={this.state.institution_info.geolocation}>
                          {this.state.institution_info.address_line}
                        </a>
                      </li>
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="some_text">
              <h2>{strings.institutionpage.text_11} </h2>
              <p>
                {this.state.lang == 'ru'
                  ? this.state.institution_info.purpose_ru
                  : this.state.institution_info.purpose_uz}
              </p>
              <h2>{strings.institutionpage.text_20} </h2>
              <p>
                {this.state.lang == 'ru'
                  ? this.state.institution_info.tasks_description_ru
                  : this.state.institution_info.tasks_description_uz}
              </p>
              {/* <h2>Idora</h2>
              <p>
                {this.state.science
                  .filter(
                    (item) =>
                      item.id == this.state.institution_info.institution,
                  )
                  .map((item2) => (
                    <li>{item2.name}</li>
                  ))}
              </p>
              <h2>Tashkilot turi</h2>
              <p>
                <li>{this.state.institution_info.address_line}</li>
              </p>
              <h2>Mintaqa</h2>
              <p>
                <li>{this.state.institution_info.address_line}</li>
              </p> */}
              <h2>{strings.institutionpage.text_12} </h2>
              <p>
                {this.state.institution_info.science_field_name.map((item2) => (
                  <li>{item2.name}</li>
                ))}
              </p>

              {/* <h2>{strings.institutionpage.text_3} </h2>
              <p>{this.state.institution_info.tasks_description_uz}</p> */}
              <h2>{strings.institutionpage.text_14} </h2>
              <div className="file_list">
                <div className="block_row_tags">
                  {this.state.labs_list.map((item) => (
                    <LabListItem
                      selectLab={this.selectLab.bind(this)}
                      activeID={this.state.lab_id}
                      colors={this.state.colors}
                      item={item}
                    />
                  ))}
                </div>
              </div>

              {this.state.fileData_lab.length == 0 ? null : (
                <div className="file_block_3">
                  <div className="file_title">{strings.servisepage.text_1}</div>
                  <div className="files_data_3">
                    {this.state.fileData_lab.map((item) => (
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
              )}

              <div className="row_row">
                <div className="row_i_i">
                  <h2>{strings.institutionpage.text_13} </h2>

                  <div className="block_row">
                    {this.state.service.map((item) => (
                      <ServiseListItem item={item} />
                    ))}
                  </div>
                </div>
                <div className="row_i_i">
                  <h2>{strings.institutionpage.text_4} </h2>
                  <div className="block_row">
                    {this.state.lab_id == null
                      ? this.state.equipment.map((item) => (
                          <EquipmentListItem
                            lang={this.state.lang}
                            colors={this.state.colors}
                            item={item}
                          />
                        ))
                      : this.state.equipment
                          .filter((item2) => item2.lab == this.state.lab_id)
                          .map((item) => (
                            <EquipmentListItem
                              colors={this.state.colors}
                              item={item}
                              lang={this.state.lang}
                            />
                          ))}
                  </div>
                </div>
              </div>

              <h2>{strings.institutionpage.text_5}</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12328007.616424778!2d55.58579999253259!3d41.03034264571161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b20a5d676b1%3A0xca0a6dad7e841e20!2z0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1648380862993!5m2!1sru!2s"
                width="100%"
                height="450"
                frameBorder={0}
              ></iframe>
              {/* <div className="buttons">
                  <NavLink to="/order" className="phone" href="">
                    {strings.institutionpage.text_7}
                  </NavLink>
                </div> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
