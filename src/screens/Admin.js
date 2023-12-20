import React, { Component } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminMenu from '../components/AdminMenu'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Table from '../components/Table'
import AdminMain from './AdminMain'
import { Route, Switch } from 'react-router-dom'
import Lab from './Admin/Lab'
import Org from './Admin/Org'
import Obr from './Admin/Obr'
import Serv from './Admin/Serv'
import FormLab from './Admin/Forms/Labs'
import FormOrg from './Admin/Forms/Org'
import FormObr from './Admin/Forms/Obr'
import FormSev from './Admin/Forms/Sev'
import Zayaviteli from './Admin/Zayaviteli'
import Zayavki from './Admin/Zayavki'
import FormZayavki from './Admin/Forms/Zayavki'
import FormZayaviteli from './Admin/Forms/Zayaviteli'
import FormOrgEdit from './Admin/FormEdit/Org'
import FormObrEdit from './Admin/FormEdit/Obr'
import FormSevEdit from './Admin/FormEdit/Sev'
import FormLabEdit from './Admin/FormEdit/Labs'
import {
  getAdminOrg,
  getAdminZayaviteli,
  getAdminZayavki,
  getAttachmentType,
  getCountry,
  getCurrency,
  getEquipmentList,
  getFinance,
  getInstitution,
  getInstitutionList,
  getLabsList,
  getOrgType,
  getPurchaseReason,
  getRegion,
  getScienceField,
  getTnved,
} from '../api'
import PanelBreadCrumb from './Admin/PanelBreadCrumb'
import ChangePassword from './Admin/Forms/ChangePassword'

export default class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      notificationStatus: false,
      zayavki: [],
      zayaviteli: [],

      institution: [],
      institution_list: [],
      institution_list2: [],

      attachmetType: [],

      org_type: [],
      equipment_list: [],
      labs_list: [],
      purchase: [],
      country: [],
      currency: [],

      region: [],
      science: [],
      tnved_list: [],
      finance: [],

      region_list: [],
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.setState({ user: user })

    getAdminZayavki(this)
    getAdminZayaviteli(this)

    getInstitutionList(this, '', 'uz')
    getAdminOrg(this, this.state.filter)
    getInstitution(this, 'uz')
    getAttachmentType(this)
    getRegion(this, 'uz')
    getScienceField(this)
    getTnved(this, 'uz')
    getFinance(this, 'uz')
    getOrgType(this, 'uz')
    getEquipmentList(this)
    getLabsList(this)
    getPurchaseReason(this, 'uz')
    getCountry(this, 'uz')
    getCurrency(this, 'uz')
  }

  notificationStatus() {
    this.setState({ notificationStatus: !this.state.notificationStatus })
  }

  render() {
    return (
      <div className="admin">
        <div className="admin_container_row">
          <AdminMenu user={this.state.user} />
          <div
            className={
              this.state.notificationStatus == true
                ? 'admin_container'
                : 'admin_container_full'
            }
          >
            <AdminHeader
              zayavki={this.state.zayavki}
              notificationStatus={this.notificationStatus.bind(this)}
              user={this.state.user}
            />
            <div className="a_container">
              <Route
                path="/dashboard/main"
                exact
                render={(match) => <AdminMain />}
              />
              <Route path="/dashboard/lab" exact render={(match) => <Lab />} />
              <Route
                path="/dashboard/lab/form"
                exact
                render={(match) => (
                  <FormLab
                    institution_list={this.state.institution_list}
                    institution={this.state.institution}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                  />
                )}
              />
              <Route
                path="/dashboard/changepassword/"
                exact
                render={(match) => <ChangePassword />}
              />
              <Route
                path="/dashboard/org/form"
                exact
                render={(match) => (
                  <FormOrg
                    institution={this.state.institution}
                    institution_list={this.state.institution_list}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                    region={this.state.region}
                    science={this.state.science}
                    tnved_list={this.state.tnved_list}
                    finance={this.state.finance}
                    org_type={this.state.org_type}
                    equipment_list={this.state.equipment_list}
                    labs_list={this.state.labs_list}
                    purchase={this.state.purchase}
                    country={this.state.country}
                    org_type_list={this.state.org_type_list}
                    region_list={this.state.region_list}
                    currency={this.state.currency}
                  />
                )}
              />
              <Route
                path="/dashboard/ob/form"
                exact
                render={(match) => (
                  <FormObr
                    institution={this.state.institution}
                    institution_list={this.state.institution_list}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                    region={this.state.region}
                    science={this.state.science}
                    tnved_list={this.state.tnved_list}
                    finance={this.state.finance}
                    org_type={this.state.org_type}
                    equipment_list={this.state.equipment_list}
                    labs_list={this.state.labs_list}
                    purchase={this.state.purchase}
                    country={this.state.country}
                    currency={this.state.currency}
                  />
                )}
              />

              <Route
                path="/dashboard/servise/form"
                exact
                render={(match) => (
                  <FormSev
                    institution={this.state.institution}
                    institution_list={this.state.institution_list}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                    region={this.state.region}
                    science={this.state.science}
                    tnved_list={this.state.tnved_list}
                    finance={this.state.finance}
                    org_type={this.state.org_type}
                    equipment_list={this.state.equipment_list}
                    labs_list={this.state.labs_list}
                    purchase={this.state.purchase}
                    country={this.state.country}
                    org_type_list={this.state.org_type_list}
                    region_list={this.state.region_list}
                    currency={this.state.currency}
                  />
                )}
              />

              {/* Edit */}

              <Route
                path="/dashboard/lab/formedit/:id/"
                exact
                render={(match) => (
                  <FormLabEdit
                    {...match}
                    institution_list={this.state.institution_list}
                    institution={this.state.institution}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                  />
                )}
              />
              <Route
                path="/dashboard/org/formedit/:id/"
                exact
                render={(match) => (
                  <FormOrgEdit
                    {...match}
                    institution={this.state.institution}
                    institution_list={this.state.institution_list}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                    region={this.state.region}
                    science={this.state.science}
                    tnved_list={this.state.tnved_list}
                    finance={this.state.finance}
                    org_type={this.state.org_type}
                    equipment_list={this.state.equipment_list}
                    labs_list={this.state.labs_list}
                    purchase={this.state.purchase}
                    country={this.state.country}
                    org_type_list={this.state.org_type_list}
                    region_list={this.state.region_list}
                    currency={this.state.currency}
                  />
                )}
              />
              <Route
                path="/dashboard/ob/formedit/:id/"
                exact
                render={(match) => (
                  <FormObrEdit
                    {...match}
                    institution={this.state.institution}
                    institution_list={this.state.institution_list}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                    region={this.state.region}
                    science={this.state.science}
                    tnved_list={this.state.tnved_list}
                    finance={this.state.finance}
                    org_type={this.state.org_type}
                    equipment_list={this.state.equipment_list}
                    labs_list={this.state.labs_list}
                    purchase={this.state.purchase}
                    country={this.state.country}
                    currency={this.state.currency}
                  />
                )}
              />

              <Route
                path="/dashboard/servise/formedit/:id/"
                exact
                render={(match) => (
                  <FormSevEdit
                    {...match}
                    institution={this.state.institution}
                    institution_list={this.state.institution_list}
                    institution_list2={this.state.institution_list2}
                    attachmetType={this.state.attachmetType}
                    region={this.state.region}
                    science={this.state.science}
                    tnved_list={this.state.tnved_list}
                    finance={this.state.finance}
                    org_type={this.state.org_type}
                    equipment_list={this.state.equipment_list}
                    labs_list={this.state.labs_list}
                    purchase={this.state.purchase}
                    country={this.state.country}
                    org_type_list={this.state.org_type_list}
                    region_list={this.state.region_list}
                    currency={this.state.currency}
                  />
                )}
              />

              <Route
                path="/dashboard/zayavki/form"
                exact
                render={(match) => <FormZayavki {...match} />}
              />

              <Route
                path="/dashboard/zayaviteli/form"
                exact
                render={(match) => <FormZayaviteli />}
              />

              <Route path="/dashboard/org" exact render={(match) => <Org />} />
              <Route path="/dashboard/ob" exact render={(match) => <Obr />} />
              <Route
                path="/dashboard/servise"
                exact
                render={(match) => <Serv />}
              />
              <Route
                path="/dashboard/zayaviteli"
                exact
                render={(match) => <Zayaviteli />}
              />
              <Route
                path="/dashboard/zayavki"
                exact
                render={(match) => (
                  <Zayavki institution={this.state.institution} />
                )}
              />
            </div>
          </div>
          {this.state.notificationStatus == true ? (
            <div className="notification_block">
              <div className="notification_header">
                <p>Уведомления</p>
                <a onClick={() => this.setState({ notificationStatus: false })}>
                  x
                </a>
              </div>

              <div className="table_ss_2">
                {this.state.zayavki
                  .filter(
                    (item2) =>
                      item2.status == 'wait' || item2.status == 'agreed',
                  )
                  .map((item) => (
                    <div className="comp_name_row">
                      <tr>
                        <td>{item.applicant_full_name}</td>
                        <td>{item.purpose}</td>

                        <td>
                          {' '}
                          <p>
                            <div
                              className="table_status"
                              style={{
                                backgroundColor:
                                  item.status == 'wait'
                                    ? '#FEF3BB'
                                    : item.status == 'agreed'
                                    ? '#C4F1FB'
                                    : '#C8FCE0',
                                color:
                                  item.status == 'wait'
                                    ? '#8D421C'
                                    : item.status == 'agreed'
                                    ? '#1B4D4C'
                                    : '#0C4E36',
                              }}
                            >
                              {item.status == 'wait'
                                ? 'Kutish jarayonida'
                                : item.status == 'agreed'
                                ? 'Koʻrildi'
                                : 'Tasdiqlangan'}
                            </div>
                          </p>
                        </td>
                      </tr>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
