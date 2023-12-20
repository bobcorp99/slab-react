import moment from 'moment'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  getAdminObr2,
  getAdminOrg,
  getAdminServive,
  getAttachmentType,
  getFileList,
  getInstitution,
  getInstitutionList,
  moderadorPostFile,
  moderadorPostLabs,
  moderadorPostOrg,
  moderadorPutLabs,
  moderatorDeleteFile,
} from '../../../api'
import UI_Select from '../../../components/ui/Select'
import PanelBreadCrumb from '../PanelBreadCrumb'

export default class FormLab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution: this.props.institution,
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
      disabled: false,
      since_year: moment().format('YYYY'),
      organisation: '',
      institution_list: this.props.institution_list,
      error: false,
      organisationID: '',
      institution_list2: this.props.institution_list2,
      attachmetType: this.props.attachmetType,
      filename: [],
      attachment_type: [],
      lab_id: null,
      name_file: '',

      fileData: [],
      attachmetType: this.props.attachmetType,

      since_year_error: true,

      theInputKey: 1,

      serv_lenth: 0,

      countB: null,
    }
  }

  componentDidMount() {
    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })

    const user = JSON.parse(localStorage.getItem('user')).role
    this.setState({ role: user })
  }

  onChangeFile = (event) => {
    this.setState({
      filename: event.target.files[0],
    })
    console.log(event.target.files[0])
  }

  deleteFile(id) {
    moderatorDeleteFile(this, id, '', this.state.lab_id, '')
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
          this.state.lab_id,
          '',
          '',
        )
      : alert('Fayilni tanlang')

    this.setState({ theInputKey: this.state.theInputKey + 1, name_file: '' })
  }

  setData() {
    this.setState({ buttonActive: false })
    this.state.name_ru == '' ||
    this.state.description_ru == '' ||
    this.state.organisation == '' ||
    this.state.since_year == '' ||
    this.state.since_year_error == false
      ? this.setState({ error: true, buttonActive: true })
      : this.state.lab_id == null
      ? moderadorPostLabs(
          this,
          this.state.name,
          this.state.name_ru,
          this.state.name_uz,
          this.state.description,
          this.state.description_ru,
          this.state.description_uz,
          this.state.disabled,
          this.state.since_year,
          this.state.organisation,
        )
      : moderadorPutLabs(
          this,
          this.state.lab_id,
          this.state.name,
          this.state.name_ru,
          this.state.name_uz,
          this.state.description,
          this.state.description_ru,
          this.state.description_uz,
          this.state.disabled,
          this.state.since_year,
          this.state.organisation,
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
      <div className="admin_form">
        <PanelBreadCrumb
          name={"Laboratoriya qo'shish"}
          main_name="Laboratoriyalar"
          back="/dashboard/lab"
        />
        <div className="form_header">
          <p>Laboratoriya qo'shish</p>
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
                this.state.error == true && this.state.organisation == null
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Tashkilot*</p>
              <UI_Select
                data={this.state.institution_list}
                select_title={'Tashkilot'}
                title="Tashkilot"
                handle_change={this.handle_change.bind(this, 'organisation')}
                activeValue={this.state.organisation}
                selected={''}
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
              (this.state.error == true && this.state.since_year == '') ||
              this.state.since_year_error == false
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Yaratilgan yili </p>
            <input
              onChange={(e) => this.handle_change('since_year', e.target.value)}
              type="number"
              onBlur={() =>
                this.setState({
                  since_year_error:
                    this.state.since_year > 1800 &&
                    this.state.since_year < 2023,
                })
              }
              placeholder="Yaratilgan yili"
            />
          </label>
          {/* {this.state.role !== 'moderator' ? null : (
            <label htmlFor="">
              <div className="skrito">
                <p>Faol</p>
                <input
                  onClick={() =>
                    this.setState({ disabled: !this.state.disabled })
                  }
                  style={{ width: 15 }}
                  className="check_box"
                  type="checkbox"
                  placeholder="Скрыто"
                  value={this.state.disabled}
                  checked={this.state.disabled == false ? true : false}
                />
              </div>
            </label>
          )} */}
          {this.state.lab_id !== null ? (
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
            <div className="f_m_ss">
              <NavLink to={'/dashboard/lab'} href="#" className="submt">
                Bekor qilish
              </NavLink>
              {this.state.lab_id == null ? (
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
        </form>
      </div>
    )
  }
}
