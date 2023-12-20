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
  moderadorChangePassword,
  moderadorPostFile,
  moderadorPostLabs,
  moderadorPostOrg,
  moderadorPutLabs,
  moderatorDeleteFile,
} from '../../../api'
import UI_Select from '../../../components/ui/Select'
import PanelBreadCrumb from '../PanelBreadCrumb'

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      institution: [],
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
      since_year: '',
      organisation: '',
      institution_list: [],
      error: false,
      organisationID: '',
      institution_list2: [],
      attachmetType: [],
      filename: [],
      attachment_type: [],
      lab_id: null,
      name_file: '',

      fileData: [],
      attachmetType: [],

      since_year_error: true,

      theInputKey: 1,

      serv_lenth: 0,

      countB: null,
    }
  }

  componentDidMount() {
    getInstitutionList(this, '', 'uz')
    getAdminOrg(this, this.state.filter)
    getInstitution(this, 'uz')

    getAttachmentType(this)
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
    this.state.password == '' ||
    this.state.new_password == '' ||
    this.state.new_password !== this.state.new_password2
      ? this.setState({ error: true, buttonActive: true })
      : moderadorChangePassword(
          this,
          this.state.password,
          this.state.new_password,
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
          name={'Parolni o`zgartirish'}
          main_name="Bosh sahifa"
          back="/dashboard/"
        />
        <div className="form_header">
          <p>Parolni o`zgartirish</p>
        </div>
        <form action="">
          <label
            className={
              this.state.error == true && this.state.name_ru == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Joriy parol*</p>

            <input
              onChange={(e) => this.handle_change('password', e.target.value)}
              type="text"
              value={this.state.password}
              placeholder="Joriy parol"
            />
          </label>
          <label
            className={
              this.state.error == true && this.state.name_ru == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Yangi parol*</p>

            <input
              onChange={(e) =>
                this.handle_change('new_password', e.target.value)
              }
              type="text"
              value={this.state.new_password}
              placeholder="Yangi parol"
            />
          </label>
          <label
            className={
              this.state.error == true && this.state.name_ru == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Yana bir bor kiriting yangi parolni*</p>

            <input
              onChange={(e) =>
                this.handle_change('new_password2', e.target.value)
              }
              type="text"
              value={this.state.new_password2}
              placeholder="Yana bir bor kiriting yangi parolni"
            />
          </label>

          <div className="form_bottm">
            <div className="f_m_ss">
              <NavLink to={'/dashboard/'} href="#" className="submt">
                Bekor qilish
              </NavLink>

              <b onClick={() => this.setData()} type="button" className="submt">
                Saqlash
              </b>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
