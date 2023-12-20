import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  getOrgType,
  moderadorPostOrg,
  getEquipment,
  getFinance,
  getInstitution,
  getInstitutionList,
  getRegion,
  getScienceField,
  getTnved,
  moderatorDeleteFile,
  moderadorPostFile,
  moderadorPutOrg,
  getAttachmentType,
} from '../../../api'
import UI_MultySelect from '../../../components/ui/MultySelect'
import UI_Select from '../../../components/ui/Select'

import MapPicker from 'react-google-map-picker'
import PanelBreadCrumb from '../PanelBreadCrumb'

const DefaultLocation = { lat: 10, lng: 106 }

export default class FormOrg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 1,

      short_name: '',
      short_name_ru: '',
      short_name_uz: '',
      name: '',
      name_ru: '',
      name_uz: '',
      description: '',
      description_ru: '',
      description_uz: '',
      zip_code: '',
      address_line: '',
      web: '',
      logo: '',
      photo: '',
      since_year: '',
      purpose: '',
      purpose_ru: '',
      purpose_uz: '',
      tasks_description: '',
      tasks_description_ru: '',
      tasks_description_uz: '',
      geolocation: '',
      chief_name: '',
      chief_phone: '',
      chief_email: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      disabled: false,
      institution_active: '',
      organization_type: '',
      region_active: '',
      parent: '',
      science_field: '',

      region_list: this.props.region_list,
      science_list: this.props.science_list,
      finance: this.props.finance,
      equipment_list: this.props.equipment_list,
      institution_list: this.props.institution_list,
      institution_list2: this.props.institution_list2,
      org_type_list: this.props.org_type_list,
      institution: this.props.institution,

      error: false,

      attachment_type: '',
      attachmetType: this.props.attachmetType,
      fileData: [],
      org_id: null,

      theInputKey: 1,
    }
  }

  //send File

  onChangeFile = (event) => {
    this.setState({
      filename: event.target.files[0],
    })
    console.log(event.target.files[0])
  }

  deleteFile(id) {
    moderatorDeleteFile(this, id, this.state.org_id, '', '')
  }

  sendFile() {
    this.state.name_file !== ''
      ? moderadorPostFile(
          this,
          this.state.name_file,
          this.state.filename,
          false,
          this.state.attachment_type,
          this.state.org_id,
          '',
          '',
          '',
        )
      : alert('Fayilni tanlang')

    this.setState({ theInputKey: this.state.theInputKey + 1, name_file: '' })
  }

  setData() {
    this.setState({ buttonActive: false })
    this.state.short_name_ru == '' ||
    this.state.name_ru == '' ||
    this.state.description_ru == '' ||
    this.state.zip_code == '' ||
    this.state.address_line == '' ||
    this.state.since_year == '' ||
    this.state.purpose_ru == '' ||
    this.state.tasks_description_ru == '' ||
    this.state.geolocation == '' ||
    this.state.chief_name == '' ||
    this.state.chief_phone == '' ||
    this.state.chief_email == '' ||
    this.state.contact_name == '' ||
    this.state.contact_email == '' ||
    this.state.contact_phone == '' ||
    this.state.institution_active == '' ||
    this.state.organization_type == '' ||
    this.state.region_active == '' ||
    this.state.science_field == ''
      ? this.setState({ error: true, buttonActive: true })
      : this.state.org_id == null
      ? moderadorPostOrg(
          this,
          this.state.short_name,
          this.state.short_name_ru,
          this.state.short_name_uz,
          this.state.name,
          this.state.name_ru,
          this.state.name_uz,
          this.state.description,
          this.state.description_ru,
          this.state.description_uz,
          this.state.zip_code,
          this.state.address_line,
          this.state.web,
          this.state.logo,
          this.state.photo,
          this.state.since_year,
          this.state.purpose,
          this.state.purpose_ru,
          this.state.purpose_uz,
          this.state.tasks_description,
          this.state.tasks_description_ru,
          this.state.tasks_description_uz,
          this.state.geolocation,
          this.state.chief_name,
          this.state.chief_phone,
          this.state.chief_email,
          this.state.contact_name,
          this.state.contact_email,
          this.state.contact_phone,
          this.state.disabled,
          this.state.institution_active,
          this.state.organization_type,
          this.state.region_active,
          this.state.parent,
          this.state.science_field,
        )
      : moderadorPutOrg(
          this,
          this.state.org_id,
          this.state.short_name,
          this.state.short_name_ru,
          this.state.short_name_uz,
          this.state.name,
          this.state.name_ru,
          this.state.name_uz,
          this.state.description,
          this.state.description_ru,
          this.state.description_uz,
          this.state.zip_code,
          this.state.address_line,
          this.state.web,
          this.state.logo,
          this.state.photo,
          this.state.since_year,
          this.state.purpose,
          this.state.purpose_ru,
          this.state.purpose_uz,
          this.state.tasks_description,
          this.state.tasks_description_ru,
          this.state.tasks_description_uz,
          this.state.geolocation,
          this.state.chief_name,
          this.state.chief_phone,
          this.state.chief_email,
          this.state.contact_name,
          this.state.contact_email,
          this.state.contact_phone,
          this.state.disabled,
          this.state.institution_active,
          this.state.organization_type,
          this.state.region_active,
          this.state.parent,
          this.state.science_field,
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

  onChangeLogo = (event) => {
    this.setState({ logo: event.target.files[0] })
    console.log(event.target.files[0])
  }

  onChangePhoto = (event) => {
    this.setState({ photo: event.target.files[0] })
    console.log(event.target.files[0])
  }

  handleSelectedMultiple = (evt) => {
    // const values = Array.from(
    //   evt.target.selectedOptions,
    //   (option) => option.value,
    // )
    // Or this way
    const values = [...evt.target.selectedOptions].map((opt) => opt.value)
    console.log('values', values)
    this.setState({ science_field: [values] })
  }

  componentDidMount() {
    getAttachmentType(this)
    getInstitution(this, 'uz')
    getRegion(this, 'uz')
    getScienceField(this)
    getTnved(this, 'uz')
    getFinance(this, 'uz')
    getEquipment(this, '', '', '', 'uz')
    getInstitutionList(this, 'uz')
    getOrgType(this, 'uz')
  }

  handleChangeLocation(lat, lng) {
    this.setState({ lat: lat, lng: lng })
  }

  onChangeZoom() {}

  render() {
    return (
      <div className="admin_form">
        <PanelBreadCrumb
          name={"Tashkilot qo'shish"}
          main_name="Uskunalar"
          back="/dashboard/org"
        />
        <div className="form_header">
          <p>Tashkilot qo'shish</p>
        </div>
        <form action="">
          <div className="blocke_item">
            <div className="form_top">Asosiy</div>
            <label
              className={
                this.state.error == true && this.state.short_name_ru == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Qisqa sarlavha*</p>
              <div className="flext_input">
                <input
                  onChange={(e) =>
                    this.handle_change('short_name_uz', e.target.value)
                  }
                  type="text"
                  value={this.state.short_name_uz}
                  placeholder="Qisqa sarlavha"
                />

                <input
                  onChange={(e) =>
                    this.handle_change('short_name_ru', e.target.value)
                  }
                  type="text"
                  value={this.state.short_name_ru}
                  placeholder="Qisqa sarlavha (Ruscha)"
                />
              </div>
              <ul className="input_text">
                <li>
                  <a
                    className={this.state.lang == 1 ? 'active' : null}
                    onClick={() => this.setState({ lang: 1 })}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/uzbekistan/flag-400.png" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.setState({ lang: 2 })}
                    className={this.state.lang == 2 ? 'active' : null}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/russia/flag-400.png" />
                  </a>
                </li>
              </ul>
            </label>
            <label
              className={
                this.state.error == true && this.state.name_ru == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Nomi*</p>
              <div className="flext_input">
                <input
                  onChange={(e) =>
                    this.handle_change('name_uz', e.target.value)
                  }
                  type="text"
                  value={this.state.name_uz}
                  placeholder="Nomi"
                />

                <input
                  onChange={(e) =>
                    this.handle_change('name_ru', e.target.value)
                  }
                  type="text"
                  value={this.state.name_ru}
                  placeholder="Nomi (Ruscha)"
                />
              </div>
              <ul className="input_text">
                <li>
                  <a
                    className={this.state.lang == 1 ? 'active' : null}
                    onClick={() => this.setState({ lang: 1 })}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/uzbekistan/flag-400.png" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.setState({ lang: 2 })}
                    className={this.state.lang == 2 ? 'active' : null}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/russia/flag-400.png" />
                  </a>
                </li>
              </ul>
            </label>
            <label
              className={
                this.state.error == true && this.state.organization_type == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Tashkilot turi*</p>
              <UI_Select
                data={this.state.org_type_list}
                select_title={'Tashkilot turi'}
                title="Tashkilot turi"
                handle_change={this.handle_change.bind(
                  this,
                  'organization_type',
                )}
                selected={''}
                activeValue={this.state.org_type_list}
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.institution_active == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Idora*</p>
              <UI_Select
                data={this.state.institution_list}
                select_title={'Idora'}
                title="Idora"
                handle_change={this.handle_change.bind(
                  this,
                  'institution_active',
                )}
                selected={''}
                activeValue={this.state.org_type_list}
              />
            </label>

            <label
              className={
                (this.state.error == true && this.state.since_year == '') ||
                this.state.since_year_error == false
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Yaratilgan yili*</p>

              <input
                onChange={(e) =>
                  this.handle_change('since_year', e.target.value)
                }
                onBlur={() =>
                  this.setState({
                    since_year_error:
                      this.state.since_year > 1800 &&
                      this.state.since_year < 2023,
                  })
                }
                type="number"
                placeholder="Yaratilgan yili"
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.science_field == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Fan sohasi*</p>

              <UI_MultySelect
                handle_change={this.handle_change.bind(this, 'science_field')}
                title={'Fan sohasi'}
                api={getScienceField.bind(this)}
                activeValue={[]}
              />
            </label>
            <label htmlFor="">
              <p>Logotip</p>
              <input
                className="file"
                type="file"
                name={'logo'}
                onChange={this.onChangeLogo}
                placeholder="Logotip"
              />
            </label>
            <label htmlFor="">
              <p>Rasm</p>
              <input
                className="file"
                type="file"
                name={'photo'}
                onChange={this.onChangePhoto}
                placeholder="Rasm"
              />
            </label>

            <label
              className={
                this.state.error == true && this.state.description_ru == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Tavsif*</p>
              <div className="flext_input">
                <textarea
                  onChange={(e) =>
                    this.handle_change('description_uz', e.target.value)
                  }
                  type="text"
                  value={this.state.description_uz}
                  placeholder="Tavsif"
                />

                <textarea
                  onChange={(e) =>
                    this.handle_change('description_ru', e.target.value)
                  }
                  type="text"
                  value={'' + this.state.description_ru + ''}
                  placeholder="Tavsif (Ruscha)"
                />
              </div>

              <ul className="input_text">
                <li>
                  <a
                    className={this.state.lang == 1 ? 'active' : null}
                    onClick={() => this.setState({ lang: 1 })}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/uzbekistan/flag-400.png" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.setState({ lang: 2 })}
                    className={this.state.lang == 2 ? 'active' : null}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/russia/flag-400.png" />
                  </a>
                </li>
              </ul>
            </label>
            <label
              className={
                this.state.error == true && this.state.purpose_ru == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Faoliyat/maqsadlar*</p>
              <div className="flext_input">
                <textarea
                  onChange={(e) =>
                    this.handle_change('purpose_uz', e.target.value)
                  }
                  type="text"
                  value={this.state.purpose_uz}
                  placeholder="Faoliyat/maqsadlar"
                />

                <textarea
                  onChange={(e) =>
                    this.handle_change('purpose_ru', e.target.value)
                  }
                  type="text"
                  value={'' + this.state.purpose_ru + ''}
                  placeholder="Faoliyat/maqsadlar (Ruscha)"
                />
              </div>

              <ul className="input_text">
                <li>
                  <a
                    className={this.state.lang == 1 ? 'active' : null}
                    onClick={() => this.setState({ lang: 1 })}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/uzbekistan/flag-400.png" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.setState({ lang: 2 })}
                    className={this.state.lang == 2 ? 'active' : null}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/russia/flag-400.png" />
                  </a>
                </li>
              </ul>
            </label>
            <label
              className={
                this.state.error == true &&
                this.state.tasks_description_ru == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Vazifalar/funksiyalar*</p>
              <div className="flext_input">
                <textarea
                  onChange={(e) =>
                    this.handle_change('tasks_description_uz', e.target.value)
                  }
                  type="text"
                  value={this.state.tasks_description_uz}
                  placeholder="Vazifalar/funksiyalar"
                />

                <textarea
                  onChange={(e) =>
                    this.handle_change('tasks_description_ru', e.target.value)
                  }
                  type="text"
                  value={'' + this.state.tasks_description_ru + ''}
                  placeholder="Vazifalar/funksiyalar (Ruscha)"
                />
              </div>

              <ul className="input_text">
                <li>
                  <a
                    className={this.state.lang == 1 ? 'active' : null}
                    onClick={() => this.setState({ lang: 1 })}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/uzbekistan/flag-400.png" />
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => this.setState({ lang: 2 })}
                    className={this.state.lang == 2 ? 'active' : null}
                    href="#"
                  >
                    <img src="https://cdn.countryflags.com/thumbs/russia/flag-400.png" />
                  </a>
                </li>
              </ul>
            </label>
            <label htmlFor="">
              <p>Web-sayt</p>
              <input
                onChange={(e) => this.handle_change('web', e.target.value)}
                type="text"
                placeholder="Web-sayt"
              />
            </label>
          </div>
          <div className="blocke_item">
            <div className="form_top">Manzil</div>
            <label
              className={
                this.state.error == true && this.state.region_active == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Hudud*</p>
              <select
                type="text"
                list="programmingLanguages3"
                placeholder="Hudud"
                onChange={(event) =>
                  this.setState({
                    region_active: event.target.value,
                  })
                }
              >
                <option value="">---</option>
                {this.state.region_list.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
            <label
              className={
                this.state.error == true && this.state.address_line == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Manzil*</p>
              <input
                onChange={(e) =>
                  this.handle_change('address_line', e.target.value)
                }
                type="text"
                placeholder="Manzil"
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.zip_code == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Pochta indeksi*</p>
              <input
                onChange={(e) => this.handle_change('zip_code', e.target.value)}
                type="text"
                placeholder="Pochta indeksi"
              />
            </label>

            <label
              className={
                this.state.error == true && this.state.geolocation == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Geolokatsiya*</p>
              <div className="mapp">
                <div className="mapDiv">
                  <MapPicker
                    defaultLocation={DefaultLocation}
                    zoom={10}
                    onChangeLocation={() => this.handleChangeLocation()}
                    onChangeZoom={() => this.onChangeZoom()}
                    style={{
                      height: '200px',
                      width: '100%',
                      background: '#f1f1f1',
                    }}
                    apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
                  />
                </div>
                <input
                  onChange={(e) =>
                    this.handle_change('geolocation', e.target.value)
                  }
                  type="text"
                  placeholder="Geolokatsiya"
                />
              </div>
            </label>

            {/* Change this moment */}
          </div>

          <div className="blocke_item">
            <div className="form_top">Rahbar</div>

            <label
              className={
                this.state.error == true && this.state.chief_name == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Rahbarning to'liq ismi*</p>
              <input
                onChange={(e) =>
                  this.handle_change('chief_name', e.target.value)
                }
                type="text"
                placeholder="Rahbarning to'liq ismi"
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.chief_phone == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Rahbarning telefon raqami*</p>
              <input
                onChange={(e) =>
                  this.handle_change('chief_phone', e.target.value)
                }
                type="text"
                value={this.state.chief_phone}
                placeholder="Тел.номер руководителя"
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.chief_email == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Rahbarning email pochtasi*</p>
              <input
                onChange={(e) =>
                  this.handle_change('chief_email', e.target.value)
                }
                type="email"
                pattern=".+@"
                title="Please provide only a Best Startup Ever corporate e-mail address"
                placeholder="Rahbarning email pochtasi"
              />
            </label>
          </div>
          <div className="blocke_item">
            <div className="form_top">Aloqa qiluvchi shaxs</div>

            <label
              className={
                this.state.error == true && this.state.contact_name == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Aloqa ma'lumotlarini*</p>
              <input
                onChange={(e) =>
                  this.handle_change('contact_name', e.target.value)
                }
                type="text"
                placeholder="Aloqa ma'lumotlarini"
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.contact_phone == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Aloqa telefon raqami*</p>
              <input
                onChange={(e) =>
                  this.handle_change('contact_phone', e.target.value)
                }
                value={this.state.contact_phone}
                placeholder="Aloqa telefon raqami"
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.contact_email == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Aloqa elektron pochta*</p>
              <input
                onChange={(e) =>
                  this.handle_change('contact_email', e.target.value)
                }
                type="email"
                pattern=".+@"
                title="Please provide only a Best Startup Ever corporate e-mail address"
                placeholder="Aloqa elektron pochta"
              />
            </label>
            {this.state.org_id !== null ? (
              <div className="file_upload_box">
                <div className="file_upload_header">Faylni yuklash</div>
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Nomi</th>
                      <th>Fayl</th>
                      <th>Turi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.fileData.map((item) => (
                      <tr>
                        <td>{item.name}</td>
                        <td>
                          <a href={item.filename} target="_blank">
                            {item.filename.slice(44)}
                          </a>
                        </td>
                        <td>
                          {' '}
                          {this.state.attachmetType
                            .filter((id) => id.id == item.attachment_type)
                            .map((item2) => item2.name)}
                        </td>
                        <td>
                          <a href="#" onClick={() => this.deleteFile(item.id)}>
                            O`chirish
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="file_form">
                  <input
                    key={this.state.theInputKey || ''}
                    type={'file'}
                    onChange={this.onChangeFile}
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ name_file: e.target.value })
                    }
                    placeholder="Faylning nomi"
                    value={this.state.name_file}
                  />
                  <select
                    name=""
                    id=""
                    onChange={(e) =>
                      this.setState({ attachment_type: e.target.value })
                    }
                  >
                    <option value={''}>----</option>
                    {this.state.attachmetType.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  <a onClick={() => this.sendFile()}>Yuklash</a>
                </div>
              </div>
            ) : null}
            <div className="form_bottm">
              <div className="f_m_ss">
                <NavLink to={'/dashboard/org'} href="#" className="submt">
                  Bekor qilish
                </NavLink>
                {this.state.org_id == null ? (
                  <b
                    onClick={() =>
                      this.state.buttonActive == false ? null : this.setData()
                    }
                    type="button"
                    className="submt"
                  >
                    Saqlash
                  </b>
                ) : (
                  <b
                    onClick={() => this.setData()}
                    type="button"
                    className="submt"
                  >
                    Saqlash
                  </b>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
