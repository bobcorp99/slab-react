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
  getAdmimDataID,
  moderadorPutOrg,
  moderatorDeleteFile,
  moderadorPostFile,
  getFileList,
  getAttachmentType,
  deleteItem,
} from '../../../api'
import UI_MultySelect from '../../../components/ui/MultySelect'
import UI_Select from '../../../components/ui/Select'

import MapPicker from 'react-google-map-picker'
import PanelBreadCrumb from '../PanelBreadCrumb'

export default class FormOrgEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 2,

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
      disabled: true,
      institution_active: '',
      organization_type: '',
      region_active: '',
      parent: '',
      science_field: [],

      region_list: this.props.region_list,
      science_list: this.props.science_list,
      finance: this.props.finance,
      equipment_list: this.props.equipment_list,
      institution_list: this.props.institution_list,
      institution_list2: this.props.institution_list2,
      org_type_list: this.props.org_type_list,
      institution: this.props.institution,

      error: false,

      fileData: [],
      attachmetType: this.props.attachmetType,

      theInputKey: 1,
    }
  }

  setData() {
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
    this.state.institution == '' ||
    this.state.organization_type == '' ||
    this.state.region == '' ||
    this.state.science_field == ''
      ? this.setState({ error: true })
      : moderadorPutOrg(
          this,
          this.props.match.params.id,
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
          this.state.institution,
          this.state.organization_type,
          this.state.region,
          this.state.parent,
          this.state.science_field,
        )
  }

  deleteFile(id) {
    moderatorDeleteFile(this, id, this.props.match.params.id, '', '')
  }

  onChangeFile = (event) => {
    this.setState({
      filename: event.target.files[0],
    })
    console.log(event.target.files[0])
  }

  sendFile() {
    this.state.name_file !== ''
      ? moderadorPostFile(
          this,
          this.state.name_file,
          this.state.filename,
          false,
          this.state.attachment_type,
          this.props.match.params.id,
          '',
          '',
          '',
        )
      : alert('Fayilni tanlang')

    this.setState({ theInputKey: this.state.theInputKey + 1, name_file: '' })
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
    getFileList(this, this.props.match.params.id, '', '', '')
    getAdmimDataID(this, 'organisation', this.props.match.params.id)
  }

  handleChangeLocation(lat, lng) {
    this.setState({ lat: lat, lng: lng })
  }

  onChangeZoom() {}

  render() {
    return (
      <div className="admin_form">
        <PanelBreadCrumb
          name={"Tashkilotni o'zgartirish"}
          main_name="Uskunalar"
          back="/dashboard/org"
        />
        <div className="form_header">
          <p>Tashkilotni o'zgartirish</p>
        </div>
        <form action="">
          <div className="form_top">Asosiy</div>
          <label
            className={
              this.state.error == true && this.state.short_name_ru == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Qisqa sarlavha</p>
            <div className="flext_input">
              <input
                onChange={(e) =>
                  this.handle_change('short_name_uz', e.target.value)
                }
                type="text"
                defaultValue={this.state.short_name_uz}
                placeholder="Qisqa sarlavha"
              />

              <input
                onChange={(e) =>
                  this.handle_change('short_name_ru', e.target.value)
                }
                type="text"
                defaultValue={this.state.short_name_ru}
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
            <p>Nomi</p>
            <div className="flext_input">
              <input
                onChange={(e) => this.handle_change('name_uz', e.target.value)}
                type="text"
                defaultValue={this.state.name_uz}
                placeholder="Nomi"
              />

              <input
                onChange={(e) => this.handle_change('name_ru', e.target.value)}
                type="text"
                defaultValue={this.state.name_ru}
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
            <p>Tashkilot turi</p>

            <UI_Select
              data={this.state.org_type_list}
              select_title={'Tashkilot turi'}
              title="Tashkilot turi"
              handle_change={this.handle_change.bind(this, 'organization_type')}
              activeValue={this.state.organization_type}
              selected={this.state.organization_type}
            />
          </label>
          <label
            className={
              this.state.error == true && this.state.institution == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Idora</p>

            <UI_Select
              data={this.state.institution_list}
              select_title={'Idora'}
              title="Idora"
              handle_change={this.handle_change.bind(
                this,
                'institution_active',
              )}
              activeValue={this.state.institution_active}
              selected={this.state.institution_active}
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
            <p>Yaratilgan yili</p>
            <input
              onBlur={() =>
                this.setState({
                  since_year_error:
                    this.state.since_year > 1800 &&
                    this.state.since_year < 2023,
                })
              }
              onChange={(e) => this.handle_change('since_year', e.target.value)}
              type="number"
              placeholder="Yaratilgan yili"
              defaultValue={this.state.since_year}
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
            <p>Fan sohasi</p>

            <UI_MultySelect
              handle_change={this.handle_change.bind(this, 'science_field')}
              title={'Fan sohasi'}
              api={getScienceField.bind(this)}
              activeValue={this.state.science_field}
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
            <p>Tavsif</p>
            <div className="flext_input">
              <textarea
                onChange={(e) =>
                  this.handle_change('description_uz', e.target.value)
                }
                type="text"
                defaultValue={this.state.description_uz}
                placeholder="Tavsif"
              />

              <textarea
                onChange={(e) =>
                  this.handle_change('description_ru', e.target.value)
                }
                type="text"
                defaultValue={'' + this.state.description_ru + ''}
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
            <p>Faoliyat/maqsadlar</p>
            <div className="flext_input">
              <textarea
                onChange={(e) =>
                  this.handle_change('purpose_uz', e.target.value)
                }
                type="text"
                defaultValue={this.state.purpose_uz}
                placeholder="Faoliyat/maqsadlar"
              />

              <textarea
                onChange={(e) =>
                  this.handle_change('purpose_ru', e.target.value)
                }
                type="text"
                defaultValue={'' + this.state.purpose_ru + ''}
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
              this.state.error == true && this.state.tasks_description_ru == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Vazifalar/funksiyalar</p>
            <div className="flext_input">
              <textarea
                onChange={(e) =>
                  this.handle_change('tasks_description_uz', e.target.value)
                }
                type="text"
                defaultValue={this.state.tasks_description_uz}
                placeholder="Vazifalar/funksiyalar"
              />

              <textarea
                onChange={(e) =>
                  this.handle_change('tasks_description_ru', e.target.value)
                }
                type="text"
                defaultValue={'' + this.state.tasks_description_ru + ''}
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
              defaultValue={this.state.web}
            />
          </label>

          <div className="form_top">Manzil</div>
          <label
            className={
              this.state.error == true && this.state.region == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Hudud</p>
            <select
              type="text"
              list="programmingLanguages3"
              placeholder="Hudud"
              onChange={(event) =>
                this.setState({
                  region: event.target.value,
                })
              }
            >
              {this.state.region_list.map((item) => (
                <option value={item.id} selected={item.id == this.state.region}>
                  {item.name}
                </option>
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
            <p>Manzil</p>
            <input
              onChange={(e) =>
                this.handle_change('address_line', e.target.value)
              }
              type="text"
              placeholder="Manzil"
              defaultValue={this.state.address_line}
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
            <p>Pochta indeksi</p>
            <input
              onChange={(e) => this.handle_change('zip_code', e.target.value)}
              type="text"
              placeholder="Pochta indeksi"
              defaultValue={this.state.zip_code}
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
            <p>Geolokatsiya</p>
            <div className="mapp">
              <MapPicker
                defaultLocation={{ lat: '41.311081', lng: '69.240562' }}
                zoom={10}
                mapTypeId="roadmap"
                onChangeLocation={this.handleChangeLocation}
                onChangeZoom={() => this.onChangeZoom()}
                style={{
                  height: '200px',
                  width: '100%',
                  background: '#eaeaea',
                }}
                apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
              />
              <input
                onChange={(e) =>
                  this.handle_change('geolocation', e.target.value)
                }
                type="text"
                placeholder="Geolokatsiya"
                defaultValue={this.state.geolocation}
              />
            </div>
          </label>

          {/* Change this moment */}

          <div className="form_top">Rahbar</div>

          <label
            className={
              this.state.error == true && this.state.chief_name == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Rahbarning to'liq ismi</p>
            <input
              onChange={(e) => this.handle_change('chief_name', e.target.value)}
              type="text"
              placeholder="Rahbarning to'liq ismi"
              defaultValue={this.state.chief_name}
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
            <p>Rahbarning telefon raqami</p>
            <input
              onChange={(e) =>
                this.handle_change('chief_phone', e.target.value)
              }
              type="text"
              defaultValue={this.state.chief_phone}
              placeholder="Rahbarning telefon raqami"
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
            <p>Rahbarning email pochtasi</p>
            <input
              onChange={(e) =>
                this.handle_change('chief_email', e.target.value)
              }
              defaultValue={this.state.chief_email}
              type="email"
              pattern=".+@"
              title="Please provide only a Best Startup Ever corporate e-mail address"
              placeholder="Rahbarning email pochtasi"
            />
          </label>

          <div className="form_top">Aloqa qiluvchi shaxs</div>

          <label
            className={
              this.state.error == true && this.state.contact_name == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Контактные данные</p>
            <input
              onChange={(e) =>
                this.handle_change('contact_name', e.target.value)
              }
              type="text"
              placeholder="Контактные данные"
              defaultValue={this.state.contact_name}
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
            <p>aloqa telefon raqami</p>
            <input
              onChange={(e) =>
                this.handle_change('contact_phone', e.target.value)
              }
              defaultValue={this.state.contact_phone}
              placeholder="aloqa telefon raqami"
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
            <p>Aloqa elektron pochta</p>
            <input
              onChange={(e) =>
                this.handle_change('contact_email', e.target.value)
              }
              defaultValue={this.state.contact_email}
              type="email"
              pattern=".+@"
              title="Please provide only a Best Startup Ever corporate e-mail address"
              placeholder="Aloqa elektron pochta"
            />
          </label>

          {this.props.match.params.id !== null ? (
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
                  onChange={(e) => this.setState({ name_file: e.target.value })}
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
            <div>
              <b
                onClick={() => this.setState({ deleteModal: true })}
                type="button"
                className="submt2"
              >
                O’chirish
              </b>
            </div>
            <div>
              <NavLink to={'/dashboard/org'} href="#" className="submt">
                Bekor qilish
              </NavLink>

              <b onClick={() => this.setData()} type="button" className="submt">
                Saqlash
              </b>
            </div>
          </div>
        </form>
        {this.state.deleteModal == true ? (
          <div className="modal">
            <div className="modal_content">
              <div className="modal_header">{`Bu amal natijasida tanlangan ${this.state.name_uz} tizimdan o'chiriladi.`}</div>
              <div className="modal_text">
                Tashkilotga biriktirilgan laboratoriya mavjud. Tashkilotni
                tizimdan o’chirish uchun biriktrilgan laboratoriyadan olib
                tashlang
              </div>
              <div className="modal_buttons">
                <button
                  className="m-cancel"
                  onClick={() => this.setState({ deleteModal: false })}
                >
                  Bekor qilish{' '}
                </button>
                <button
                  onClick={() => (
                    this.setState({ deleteModal: false }),
                    deleteItem(
                      this,
                      'organisation',
                      this.props.match.params.id,
                      '/dashboard/org',
                    )
                  )}
                  className="m-delete"
                >
                  O’chirish
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
