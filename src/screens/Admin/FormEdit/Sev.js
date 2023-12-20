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
  moderadorPostServise,
  getEquipmentList,
  getLabsList,
  getPurchaseReason,
  getCountry,
  getCurrency,
  getEquipment2,
  getAdmimDataID,
  moderadorPutServise,
  moderadorCheckPutServise,
  moderatorDeleteFile,
  moderadorPostFile,
  getAttachmentType,
  getFileList,
  deleteItem,
  getAdminZayavki,
} from '../../../api'
import UI_MultySelect from '../../../components/ui/MultySelect'
import UI_Select from '../../../components/ui/Select'
import PanelBreadCrumb from '../PanelBreadCrumb'

export default class FormSevEdit extends React.Component {
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
      disabled: false,
      since_year: '',
      organisation: '',
      equipment: '',

      region: [],
      science: [],
      tnved: [],
      finance: [],
      equipment: [],
      institution: this.props.institution,
      institution_list: this.props.institution_list,
      institution_list2: this.props.institution_list2,
      org_type: [],
      equipment_list: this.props.equipment_list,
      labs_list: [],
      purchase: [],
      country: [],
      currency: [],
      error: false,

      fileData: [],
      attachmetType: this.props.attachmetType,

      theInputKey: 1,

      countE: null,
    }
  }

  setData() {
    this.state.name_ru == '' ||
    this.state.description_ru == '' ||
    this.state.organisation == '' ||
    this.state.equipment == ''
      ? this.setState({ error: true })
      : moderadorPutServise(
          this,
          this.props.match.params.id,
          this.state.name,
          this.state.name_ru,
          this.state.name_uz,
          this.state.description,
          this.state.description_ru,
          this.state.description_uz,
          this.state.disabled,
          this.state.organisation,
          this.state.equipment,
        )
  }

  handleSelectedMultiple = (evt) => {
    // const values = Array.from(
    //   evt.target.selectedOptions,
    //   (option) => option.value,
    // )
    // Or this way
    const values = [...evt.target.selectedOptions].map((opt) => opt.value)
    console.log('values', values)
    this.setState({ equipment: [values] })
  }

  componentDidMount() {
    getAdminZayavki(this, undefined, this.props.match.params.id)

    getFileList(this, '', '', '', this.props.match.params.id)

    getAdmimDataID(this, 'service', this.props.match.params.id)

    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })

    const user = JSON.parse(localStorage.getItem('user')).role
    this.setState({ role: user })
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

  onChangeFile = (event) => {
    this.setState({
      filename: event.target.files[0],
    })
    console.log(event.target.files[0])
  }

  deleteFile(id) {
    moderatorDeleteFile(this, id, '', '', this.props.match.params.id)
  }

  sendFile() {
    this.state.name_file !== ''
      ? moderadorPostFile(
          this,
          this.state.name_file,
          this.state.filename,
          false,
          this.state.attachment_type,
          '',
          '',
          '',
          this.props.match.params.id,
        )
      : alert('Fayilni tanlang')

    this.setState({ theInputKey: this.state.theInputKey + 1, name_file: '' })
  }

  render() {
    return (
      <div className="admin_form">
        <PanelBreadCrumb
          name={"Tashkilot xizmatlarini qo'shish"}
          main_name="Xizmatlar"
          back="/dashboard/servise"
        />
        <div className="form_header">
          <p>Tashkilot xizmatlarini tahrirlash</p>
        </div>

        <form action="">
          {this.state.role !== 'moderator' ? (
            <h3>
              {this.state.institution_list2
                .filter((item2) => item2.id == this.state.organisation)
                .map((item3) => item3.name_uz)}
            </h3>
          ) : (
            <label
              className={
                this.state.error == true && this.state.organisation == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Tashkilot*</p>
              <UI_Select
                data={this.state.institution_list2}
                select_title={'Tashkilot'}
                title="Tashkilot"
                handle_change={this.handle_change.bind(this, 'organisation')}
                activeValue={this.state.organisation}
                selected={this.state.organisation}
              />
            </label>
          )}
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
                onChange={(e) => this.handle_change('name_uz', e.target.value)}
                type="text"
                value={this.state.name_uz}
                placeholder="Nomi"
              />

              <input
                onChange={(e) => this.handle_change('name_ru', e.target.value)}
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
                placeholder="Tavsif (Ruscha)"
                maxLength={1024}
              />

              <textarea
                onChange={(e) =>
                  this.handle_change('description_ru', e.target.value)
                }
                type="text"
                value={'' + this.state.description_ru + ''}
                placeholder="Tavsif"
                maxLength={1024}
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
              this.state.error == true && this.state.equipment == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Uskunani tanlash*</p>
            <UI_MultySelect
              handle_change={this.handle_change.bind(this, 'equipment')}
              title={'Uskunani tanlash'}
              api={getEquipment2.bind(this)}
              activeValue={this.state.equipment}
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
              <NavLink to={'/dashboard/servise'} href="#" className="submt">
                Bekor qilish
              </NavLink>

              {this.state.role == 'moderator' ? (
                <div>
                  {this.state.disabled == false ? (
                    <b
                      onClick={() =>
                        moderadorPutServise(
                          this,
                          this.props.match.params.id,
                          this.state.name,
                          this.state.name_ru,
                          this.state.name_uz,
                          this.state.description,
                          this.state.description_ru,
                          this.state.description_uz,
                          true,
                          this.state.organisation,
                          this.state.equipment,
                        )
                      }
                      className="submt2"
                    >
                      Tasdiqlashni bekor qilish
                    </b>
                  ) : (
                    <b
                      onClick={() =>
                        moderadorPutServise(
                          this,
                          this.props.match.params.id,
                          this.state.name,
                          this.state.name_ru,
                          this.state.name_uz,
                          this.state.description,
                          this.state.description_ru,
                          this.state.description_uz,
                          false,
                          this.state.organisation,
                          this.state.equipment,
                        )
                      }
                      className="submt3"
                    >
                      Tasdiqlash
                    </b>
                  )}
                </div>
              ) : null}
              <b onClick={() => this.setData()} type="button" className="submt">
                Saqlash
              </b>
            </div>
          </div>
        </form>

        {this.state.deleteModal == true ? (
          <div className="modal">
            <div className="modal_content">
              <div className="modal_header">O’chirish</div>
              <div className="modal_text">
                {this.state.countE == 0
                  ? `Bu amal natijasida tanlangan ${this.state.name} tizimdan o'chiriladi.`
                  : ` Xizmat bo’yicha murojaatlar mavjud. Xizmatni o’chirish uchun
                Moderatorga murojaat qiling»`}
              </div>
              <div className="modal_buttons">
                <button
                  className="m-cancel"
                  onClick={() => this.setState({ deleteModal: false })}
                >
                  Bekor qilish{' '}
                </button>
                {this.state.countE == 0 ? (
                  <button
                    onClick={() => (
                      this.setState({ deleteModal: false }),
                      deleteItem(
                        this,
                        'service',
                        this.props.match.params.id,
                        '/dashboard/servise',
                      )
                    )}
                    className="m-delete"
                  >
                    O’chirish
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
