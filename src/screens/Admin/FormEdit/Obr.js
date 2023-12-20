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
  getAdmimDataID,
  moderadorPutEqupment,
  moderadorCheckPutEqupment,
  moderatorDeleteFile,
  getFileList,
  moderadorPostFile,
  getAttachmentType,
  deleteItem,
  getAdminServive,
} from '../../../api'
import UI_Select from '../../../components/ui/Select'
import PanelBreadCrumb from '../PanelBreadCrumb'

export default class FormObrEdit extends React.Component {
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
      status: null,
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

      fileData: [],
      attachmetType: this.props.attachmetType,
      theInputKey: 1,

      service: [],

      serv_lenth: null,
    }
  }

  setData(disabled) {
    this.state.name == '' ||
    this.state.description == '' ||
    this.state.condition == '' ||
    this.state.status == '' ||
    this.state.organisation == '' ||
    this.state.equipment == '' ||
    this.state.lab == ''
      ? this.setState({ error: true })
      : moderadorPutEqupment(
          this,
          this.props.match.params.id,
          this.state.name,
          this.state.description,
          this.state.is_unique,
          this.state.manufacture_year == null
            ? ''
            : this.state.manufacture_year,
          this.state.purchase_year == null ? '' : this.state.purchase_year,
          this.state.expiration_year == null ? '' : this.state.expiration_year,
          this.state.condition == null ? '' : this.state.condition,
          this.state.purchase_price == null ? '' : this.state.purchase_price,
          this.state.status,
          this.state.stock_number == null ? '' : this.state.stock_number,
          this.state.organisation,
          this.state.equipment == null ? '' : this.state.equipment,
          this.state.lab,
          this.state.tnved == null ? '' : this.state.tnved,
          this.state.fin_source == null ? '' : this.state.fin_source,
          this.state.purchase_reason == null ? '' : this.state.purchase_reason,
          this.state.manufacture_country == null
            ? ''
            : this.state.manufacture_country,
          this.state.purchase_country == null
            ? ''
            : this.state.purchase_country,
          this.state.purchase_currency == null
            ? ''
            : this.state.purchase_currency,
          this.state.amount,
          disabled,
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

  deleteFile(id) {
    moderatorDeleteFile(this, id, '', '', this.props.match.params.id)
  }

  onChangeFile = (event) => {
    this.setState({
      filename: event.target.files[0],
    })
    console.log(event.target.files[0])
  }

  componentDidMount() {
    getFileList(this, '', '', this.props.match.params.id, '')

    getAdmimDataID(this, 'equipment', this.props.match.params.id)

    const organisationID = JSON.parse(localStorage.getItem('user')).organisation

    this.setState({ organisation: organisationID })

    const user = JSON.parse(localStorage.getItem('user')).role
    this.setState({ role: user })
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
          this.props.match.params.id,
          '',
        )
      : alert('Fayilni tanlang')

    this.setState({ theInputKey: this.state.theInputKey + 1, name_file: '' })
  }

  render() {
    return (
      <div className="admin_form">
        <PanelBreadCrumb
          name={"Tashkiliy jihozlarni qo'shish"}
          main_name="Uskunalar"
          back="/dashboard/ob"
        />
        <div className="form_header">
          <p>Tashkiliy jihozlarni tahrirlash</p>
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
                selected={this.state.organisation}
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
              <p>Laboratoriya</p>

              <UI_Select
                data={this.state.labs_list}
                select_title={'Laboratoriya'}
                title="Laboratoriya"
                handle_change={this.handle_change.bind(this, 'lab')}
                activeValue={this.state.lab}
                selected={this.state.lab}
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
              <p>Ilmiy jihozlar guruhi</p>

              <UI_Select
                data={this.state.equipment_list}
                select_title={'Ilmiy jihozlar guruhi'}
                title="Ilmiy jihozlar guruhi"
                handle_change={this.handle_change.bind(this, 'equipment')}
                activeValue={this.state.equipment}
                selected={this.state.equipment}
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
            <p>Nomi</p>
            <input
              onChange={(e) => this.handle_change('name', e.target.value)}
              type="text"
              placeholder="Nomi"
              defaultValue={this.state.name}
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
            <p>Tavsif</p>
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
            <label
              className={
                this.state.error == true && this.state.is_unique == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
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
                defaultValue={this.state.amount}
                min="1"
                type="number"
                placeholder="Soni"
              />
            </label>

            <label
              className={
                this.state.error == true && this.state.condition == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Uskuna holati</p>
              <input
                onChange={(e) =>
                  this.handle_change('condition', e.target.value)
                }
                type="text"
                placeholder="Uskuna holati"
                defaultValue={this.state.condition}
              />
            </label>
            <label
              className={
                this.state.error == true && this.state.status == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Status</p>
              <select
                onChange={(e) => this.setState({ status: e.target.value })}
              >
                <option
                  value="deposit"
                  selected={this.state.status == 'deposit' ? true : false}
                >
                  Ishga tushirilmagan
                </option>
                <option
                  value="maintained"
                  selected={this.state.status == 'maintained' ? true : false}
                >
                  Ishlatilayapti
                </option>
                <option
                  value="discarded"
                  selected={this.state.status == 'discarded' ? true : false}
                >
                  Spisanie kilingan
                </option>
              </select>
            </label>
          </div>

          <div className="form_top">Sotib olish ma'lumotlari</div>
          <div className="form_row_flex">
            <label
              className={
                this.state.error == true && this.state.fin_source == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
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
                {this.state.finance.map((item) => (
                  <option
                    selected={item.id == this.state.fin_source}
                    value={item.id}
                  >
                    {item.name_uz}
                  </option>
                ))}
              </select>
            </label>
            <label
              className={
                this.state.error == true && this.state.purchase_reason == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
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
                {this.state.purchase.map((item) => (
                  <option
                    selected={item.id == this.state.purchase_reason}
                    value={item.id}
                  >
                    {item.name}
                  </option>
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
              handle_change={this.handle_change.bind(this, 'tnved')}
              activeValue={this.state.tnved}
              selected={this.state.tnved}
              // parrent={true}
            />
          </label>
          <div className="form_row_flex">
            <label
              className={
                this.state.error == true && this.state.stock_number == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Islab chiqaruvchi</p>
              <input
                onChange={(e) =>
                  this.handle_change('stock_number', e.target.value)
                }
                type="text"
                placeholder="Islab chiqaruvchi"
                defaultValue={this.state.stock_number}
              />
            </label>

            <label
              className={
                this.state.error == true && this.state.manufacture_country == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Ishlab chiqaruvchi mamlakat</p>
              <select
                onChange={(e) =>
                  this.setState({ manufacture_country: e.target.value })
                }
              >
                <option>
                  {' '}
                  {this.state.country
                    .filter(
                      (item2) => item2.id == this.state.manufacture_country,
                    )
                    .map((item3) => item3.name)}
                </option>
                {this.state.country.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form_row_flex">
            <label
              className={
                this.state.error == true && this.state.purchase_country == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Sotib olish mamlakati</p>
              <select
                onChange={(e) =>
                  this.setState({ purchase_country: e.target.value })
                }
              >
                <option>
                  {' '}
                  {this.state.country
                    .filter((item2) => item2.id == this.state.purchase_country)
                    .map((item3) => item3.name)}
                </option>
                {this.state.country.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
            <label
              className={
                this.state.error == true && this.state.purchase_price == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Sotib olish qiymati</p>
              <input
                onChange={(e) =>
                  this.handle_change('purchase_price', e.target.value)
                }
                type="text"
                defaultValue={this.state.purchase_price}
                placeholder="Sotib olish qiymati"
              />
            </label>

            <label
              className={
                this.state.error == true && this.state.purchase_currency == ''
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Sotib olish valyutasi</p>
              <select
                onChange={(e) =>
                  this.setState({ purchase_currency: e.target.value })
                }
              >
                <option>
                  {' '}
                  {this.state.currency
                    .filter((item2) => item2.id == this.state.purchase_currency)
                    .map((item3) => item3.name)}
                </option>
                {this.state.currency.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form_row_flex">
            <label
              className={
                (this.state.error == true &&
                  this.state.manufacture_year == '') ||
                this.state.manufacture_year_error == false
                  ? 'error1'
                  : null
              }
              htmlFor=""
            >
              <p>Ishlab chiqarish yili</p>
              <input
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
                defaultValue={this.state.manufacture_year}
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
              <p>Sotib olingan yil</p>
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
                defaultValue={this.state.purchase_year}
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
              <p>Muddati tugagan yil</p>
              <input
                onChange={(e) =>
                  this.handle_change('expiration_year', e.target.value)
                }
                type="text"
                placeholder="Muddati tugagan yil"
                defaultValue={this.state.expiration_year}
              />
            </label>
          </div>

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
              <NavLink to={'/dashboard/ob'} href="#" className="submt">
                Bekor qilish
              </NavLink>

              {this.state.role == 'moderator' ? (
                <div>
                  {this.state.disabled == false ? (
                    <b
                      onClick={() => this.setData(true)}
                      href="#"
                      className="submt2"
                    >
                      Tasdiqlashni bekor qilish
                    </b>
                  ) : (
                    <b
                      onClick={() => this.setData(false)}
                      href="#"
                      className="submt3"
                    >
                      Tasdiqlash
                    </b>
                  )}
                </div>
              ) : null}
              <b
                onClick={() => this.setData(false)}
                type="button"
                className="submt"
              >
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
                {this.state.serv_lenth == 0 ? (
                  `Bu amal natijasida tanlangan ${this.state.name} tizimdan o'chiriladi.`
                ) : (
                  <span>
                    <b>{this.state.name}</b> biriktirilgan xizmat mavjud.
                    Qurulmani xizmatdan olib tashlang va takror urinib ko’ring.
                  </span>
                )}
              </div>
              <div className="modal_buttons">
                <button
                  className="m-cancel"
                  onClick={() => this.setState({ deleteModal: false })}
                >
                  Bekor qilish{' '}
                </button>
                {this.state.serv_lenth == 0 ? (
                  <button
                    onClick={() => (
                      this.setState({ deleteModal: false }),
                      deleteItem(
                        this,
                        'equipment',
                        this.props.match.params.id,
                        '/dashboard/ob',
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
