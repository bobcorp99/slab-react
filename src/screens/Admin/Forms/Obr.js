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
  moderadorPostEqupment,
  moderatorDeleteFile,
  moderadorPostFile,
  getAttachmentType,
  moderadorPutEqupment,
} from '../../../api'
import UI_Select from '../../../components/ui/Select'
import PanelBreadCrumb from '../PanelBreadCrumb'

export default class FormObr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 2,
      name: '',
      description: '',
      is_unique: false,
      manufacture_year: '',
      purchase_year: '',
      expiration_year: '',
      condition: '',
      purchase_price: '',
      status: '',
      stock_number: '',
      organisation: '',
      equipment: '',
      lab: '',
      tnved_active: '',
      fin_source: '',
      purchase_reason: '',
      manufacture_country: '',
      purchase_country: '',
      purchase_currency: '',
      amount: 1,

      institution: this.props.institution,
      region: this.props.region,
      science: this.props.science,
      tnved_list: this.props.tnved_list,
      finance: this.props.finance,
      institution_list: this.props.institution_list,
      institution_list2: this.props.institution_list2,
      org_type: this.props.org_type,
      equipment_list: this.props.equipment_list,
      labs_list: this.props.labs_list,
      purchase: this.props.purchase,
      country: this.props.country,
      currency: this.props.currency,

      error: false,

      disabled: false,

      attachment_type: '',
      attachmetType: this.props.attachmetType,
      fileData: [],
      equ_id: null,

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
    moderatorDeleteFile(this, id, '', '', this.state.equ_id)
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
          this.state.equ_id,
          '',
        )
      : alert('Fayilni tanlang')

    this.setState({ theInputKey: this.state.theInputKey + 1, name_file: '' })
  }

  setData() {
    this.setState({ buttonActive: false })

    this.state.name == '' ||
    this.state.description == '' ||
    this.state.status == '' ||
    this.state.organisation == '' ||
    this.state.equipment == '' ||
    this.state.condition == '' ||
    this.state.lab == ''
      ? this.setState({ error: true, buttonActive: true })
      : this.state.equ_id == null
      ? moderadorPostEqupment(
          this,
          this.state.name,
          this.state.description,
          this.state.is_unique,
          this.state.manufacture_year,
          this.state.purchase_year,
          this.state.expiration_year,
          this.state.condition,
          this.state.purchase_price,
          this.state.status,
          this.state.stock_number,
          this.state.organisation,
          this.state.equipment,
          this.state.lab,
          this.state.tnved_active,
          this.state.fin_source,
          this.state.purchase_reason,
          this.state.manufacture_country,
          this.state.purchase_country,
          this.state.purchase_currency,
          this.state.amount,
          this.state.disabled,
        )
      : moderadorPutEqupment(
          this,
          this.state.equ_id,
          this.state.name,
          this.state.description,
          this.state.is_unique,
          this.state.manufacture_year,
          this.state.purchase_year,
          this.state.expiration_year,
          this.state.condition,
          this.state.purchase_price,
          this.state.status,
          this.state.stock_number,
          this.state.organisation,
          this.state.equipment,
          this.state.lab,
          this.state.tnved_active,
          this.state.fin_source,
          this.state.purchase_reason,
          this.state.manufacture_country,
          this.state.purchase_country,
          this.state.purchase_currency,
          this.state.amount,
          this.state.disabled,
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

  componentDidMount() {
    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })

    const user = JSON.parse(localStorage.getItem('user')).role
    this.setState({ role: user })
  }

  render() {
    return (
      <div className="admin_form">
        <PanelBreadCrumb
          name={'Yangi qurulma kiritish'}
          main_name="Uskunalar"
          back="/dashboard/ob"
        />
        <div className="form_header">
          <p>Yangi qurulma kiritish</p>
        </div>

        <form action="">
          {this.state.role !== 'moderator' ? (
            <h3>
              {this.state.institution_list2
                .filter((item2) => item2.id == this.state.organisation)
                .map((item3) => item3.name_uz)}
            </h3>
          ) : null}
          <div className="form_top">Asosiy</div>

          {this.state.role !== 'moderator' ? null : (
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
                selected={''}
              />
            </label>
          )}
          <div className="form_row_flex">
            <label
              className={
                this.state.error == true && this.state.lab == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Laboratoriya*</p>

              <UI_Select
                data={this.state.labs_list}
                select_title={'Laboratoriya'}
                title="Laboratoriya"
                handle_change={this.handle_change.bind(this, 'lab')}
                activeValue={this.state.organisation}
                selected={''}
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.equipment == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Ilmiy jihozlar guruhi*</p>

              <UI_Select
                data={this.state.equipment_list}
                select_title={'Ilmiy jihozlar guruhi'}
                title="Ilmiy jihozlar guruhi"
                handle_change={this.handle_change.bind(this, 'equipment')}
                activeValue={this.state.organisation}
                selected={''}
                parrent={true}
              />
            </label>
          </div>
          <label
            className={
              this.state.error == true && this.state.name == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Nomi*</p>
            <input
              onChange={(e) => this.handle_change('name', e.target.value)}
              type="text"
              placeholder="Nomi"
            />
          </label>
          <label
            className={
              this.state.error == true && this.state.description == ''
                ? 'error1'
                : null
            }
            htmlFor=""
          >
            <p>Tavsif*</p>
            <textarea
              onChange={(e) =>
                this.handle_change('description', e.target.value)
              }
              type="text"
              value={this.state.description}
              placeholder="Tavsif"
              maxLength={'1024'}
            />
          </label>
          <div className="form_row_flex">
            <label htmlFor="">
              <div className="skrito">
                <p>Noyob qurulma</p>
                <input
                  onClick={() =>
                    this.setState({ is_unique: !this.state.is_unique })
                  }
                  style={{ width: 15 }}
                  className="check_box"
                  type="checkbox"
                  placeholder="Скрыто"
                  value={this.state.is_unique}
                  checked={this.state.is_unique}
                />
              </div>
            </label>
            <label htmlFor="">
              <p>Soni</p>
              <input
                onChange={(e) => this.handle_change('amount', e.target.value)}
                value="1"
                min="1"
                type="number"
                placeholder="Soni"
              />
            </label>
            <label
              htmlFor=""
              className={
                this.state.error == true && this.state.condition == ''
                  ? 'error1'
                  : null
              }
            >
              <p>Uskuna holati*</p>
              <select
                onChange={(e) => this.setState({ condition: e.target.value })}
              >
                <option value="">----</option>
                <option value="Yangi">Yangi</option>
                <option value="Eski">Eski</option>
                <option value="discarded">Yaroqsiz</option>
              </select>
            </label>
            <label
              className={
                this.state.error == true && this.state.status == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Status*</p>
              <select
                onChange={(e) => this.setState({ status: e.target.value })}
              >
                <option>----</option>
                <option value="deposit">Ishga tushirilmagan</option>
                <option value="maintained">Ishlatilayapti</option>
                <option value="discarded">Spisanie kilingan</option>
              </select>
            </label>
          </div>
          <div className="form_top">Sotib olish ma'lumotlari</div>
          <div className="form_row_flex">
            <label htmlFor="">
              <p>Moliyaviy manba</p>

              <select
                type="text"
                list="programmingLanguages7"
                placeholder="Moliyaviy manba"
                onChange={(event) =>
                  this.setState({
                    fin_source: event.target.value,
                  })
                }
              >
                <option value="">---</option>
                {this.state.finance.map((item) => (
                  <option value={item.id}>{item.name_uz}</option>
                ))}
              </select>
            </label>
            <label htmlFor="">
              <p>Sotib olish uchun asos</p>

              <select
                type="text"
                list="programmingLanguages8"
                placeholder="Sotib olish uchun asos"
                onChange={(event) =>
                  this.setState({
                    purchase_reason: event.target.value,
                  })
                }
              >
                <option value="">---</option>
                {this.state.purchase.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label htmlFor="">
            <p>TNVED</p>
            <UI_Select
              data={this.state.tnved_list}
              select_title={'TNVED'}
              title="TNVED"
              handle_change={this.handle_change.bind(this, 'tnved_active')}
              activeValue={this.state.organisation}
              selected={''}
              // parrent={true}
            />
          </label>
          <div className="form_row_flex">
            <label htmlFor="">
              <p>Islab chiqaruvchi</p>
              <input
                onChange={(e) =>
                  this.handle_change('stock_number', e.target.value)
                }
                type="text"
                placeholder="Islab chiqaruvchi"
              />
            </label>
            <label htmlFor="">
              <p>Ishlab chiqaruvchi mamlakat</p>
              <select
                onChange={(e) =>
                  this.setState({ manufacture_country: e.target.value })
                }
              >
                <option>----</option>
                {this.state.country.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form_row_flex">
            <label htmlFor="">
              <p>Sotib olish mamlakati</p>
              <select
                onChange={(e) =>
                  this.setState({ purchase_country: e.target.value })
                }
              >
                <option>----</option>
                {this.state.country.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
            <label htmlFor="">
              <p>Sotib olish qiymati</p>
              <input
                onChange={(e) =>
                  this.handle_change('purchase_price', e.target.value)
                }
                type="text"
                placeholder="Sotib olish qiymati"
              />
            </label>

            <label htmlFor="">
              <p>Sotib olish valyutasi</p>
              <select
                onChange={(e) =>
                  this.setState({ purchase_currency: e.target.value })
                }
              >
                <option>----</option>
                {this.state.currency.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form_row_flex">
            <label htmlFor="">
              <p>Ishlab chiqarish yili</p>
              <input
                className={
                  (this.state.error == true &&
                    this.state.manufacture_year == '') ||
                  this.state.manufacture_year_error == false
                    ? 'error1'
                    : null
                }
                onChange={(e) =>
                  this.handle_change('manufacture_year', e.target.value)
                }
                onBlur={() =>
                  this.setState({
                    manufacture_year_error:
                      this.state.manufacture_year > 1800 &&
                      this.state.manufacture_year < 2023,
                  })
                }
                type="text"
                placeholder="Ishlab chiqarish yili"
              />
            </label>
            <label
              className={
                (this.state.error == true && this.state.purchase_year == '') ||
                this.state.purchase_year_error == false
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Sotib olingan yil*</p>
              <input
                onChange={(e) =>
                  this.handle_change('purchase_year', e.target.value)
                }
                onBlur={() =>
                  this.setState({
                    purchase_year_error:
                      this.state.purchase_year > 1800 &&
                      this.state.purchase_year < 2023,
                  })
                }
                type="text"
                placeholder="Sotib olingan yil"
              />
            </label>
            <label
              className={
                (this.state.error == true &&
                  this.state.expiration_year == '') ||
                this.state.expiration_year_error == false
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Muddati tugagan yil*</p>
              <input
                onChange={(e) =>
                  this.handle_change('expiration_year', e.target.value)
                }
                type="text"
                placeholder="Muddati tugagan yil"
              />
            </label>
          </div>

          {this.state.equ_id !== null ? (
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
              <NavLink to={'/dashboard/ob'} href="#" className="submt">
                Bekor qilish
              </NavLink>
              {this.state.equ_id == null ? (
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
