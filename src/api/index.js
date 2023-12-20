import axios from 'axios'
import moment from 'moment'

export const URL = process.env.REACT_APP_API_URL

export async function getNews(componet) {
  axios
    .get(`${URL}api/v1/news/post/`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ news: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ news: [] })
    })
}

export async function getNewsByID(componet, id) {
  axios
    .get(`${URL}api/v1/news/post/${id}/`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ news: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ news: [] })
    })
}

export async function getInstitution4(componet, lang) {
  axios
    .get(
      `${URL}api/v1/organisation/organisation?page_size=10000&lang=${lang}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution: [] })
    })
}

export async function getPublicScience(componet) {
  axios
    .get(`${URL}api/v1/public/science/`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ public_science: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ public_science: [] })
    })
}

export async function getPublucLabsByID(componet, id) {
  axios
    .get(`${URL}api/v1/organisation/labs/?organisation=${id}`)
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ labs_list: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ labs_list: [] })
    })
}

export async function getFilterInstetutionEquipment(
  componet,
  organization_type,
  institution,
  region,
) {
  axios
    .get(
      `${URL}api/v1/public/organisation/?page_size=10000&${
        region !== undefined && region !== 'undefined'
          ? `region=${region}&`
          : ''
      }${
        organization_type !== undefined && organization_type !== 'undefined'
          ? `organization_type=${organization_type}&`
          : ''
      }${
        institution !== undefined && institution !== 'undefined'
          ? `institution=${institution}`
          : ''
      }`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institutionEquipment: data.results })
      componet.setState({ institutionFilterAll: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institutionEquipment: [] })
    })
}

export async function getFilterInstetutionRequest(
  componet,
  organization_type,
  institution,
  region,
) {
  axios
    .get(
      `${URL}api/v1/public/organisation/request/?page_size=10000&${
        region !== undefined && region !== 'undefined'
          ? `region=${region}&`
          : ''
      }${
        organization_type !== undefined && organization_type !== 'undefined'
          ? `organization_type=${organization_type}&`
          : ''
      }${
        institution !== undefined && institution !== 'undefined'
          ? `institution=${institution}`
          : ''
      }`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institutionRequest: data.results })
      componet.setState({ institutionFilterAll: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institutionRequest: [] })
    })
}

export async function getFilterInstetutionIndicator(
  componet,
  organization_type,
  institution,
  region,
) {
  axios
    .get(
      `${URL}api/v1/public/organisation/request/?page_size=10000&${
        region !== undefined && region !== 'undefined'
          ? `region=${region}&`
          : ''
      }${
        organization_type !== undefined && organization_type !== 'undefined'
          ? `organization_type=${organization_type}&`
          : ''
      }${
        institution !== undefined && institution !== 'undefined'
          ? `institution=${institution}`
          : ''
      }`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institutionIndicator: data.results })
      componet.setState({ institutionFilterAll: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institutionIndicator: [] })
    })
}

export async function getInstitution(componet, lang) {
  axios
    .get(
      `${URL}api/v1/organisation/organisation/?page_size=10000&lang=${lang}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution_list2: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution_list2: [] })
    })
}

export async function getInstitutionByID(componet, id, lang) {
  axios
    .get(`${URL}api/v1/organisation/organisation/${id}/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution_info: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution_info: [] })
    })
}

export async function getServiseByID(componet, id) {
  axios
    .get(`${URL}api/v1/organisation/service/${id}/`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution_info3: data })

      getInstitutionByID(componet, data.organisation)
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution_info: [] })
    })
}

export async function getServiseByID2(componet, id, lang) {
  axios
    .get(`${URL}api/v1/organisation/service/${id}/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution_info2: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution_info2: [] })
    })
}

export async function getServiseFilter(componet, id) {
  axios
    .get(
      `${URL}api/v1/organisation/service/?organisation=${id}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ service: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ service: [] })
    })
}

export async function getRegionList(componet, id, lang) {
  axios
    .get(`${URL}api/v1/reference/region/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ region: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ region: [] })
    })
}

export async function getEquipmentFilter(componet, id) {
  axios
    .get(
      `${URL}api/v1/organisation/equipment/?organisation=${id}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ equipment: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ equipment: [] })
    })
}

export async function getEquipmentByID(componet, id, lang) {
  axios
    .get(`${URL}api/v1/organisation/equipment/${id}/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution_info: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution_info: [] })
    })
}

export async function getAttachmentType(componet) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/attachment/type/?lang=uz`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ attachmetType: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ attachmetType: [] })
    })
}

export async function getRegionsData(componet, id) {
  axios
    .get(`${URL}api/v1/public/region/indicator/?page=1&page_size=1000`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ mapData: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ mapData: [] })
    })
}

export async function getService(componet, organisation, lab, tnved, page) {
  const pagination = page || { page_size: 9999, page: 1 }
  componet.setState({ service: [] })
  axios
    .get(
      `${URL}api/v1/organisation/service/?ordering=${''}${
        organisation !== undefined && organisation !== 'undefined'
          ? `?organisation=&organisation__institution=${organisation}`
          : ''
      }${
        lab !== undefined && lab !== 'undefined' ? `&organisation=${lab}` : ''
      }${
        tnved !== undefined && tnved !== 'undefined'
          ? `&organisation__science_field=${tnved}`
          : ''
      }&page_size=${pagination?.page_size}&page=${pagination?.page}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ 
        service: data.results,
        loader: false,
        total: data.count
      })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ service: [], loader: false, total: 0 })
    })
}

export async function getEquipment2(componet, filter) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/organisation/` + user.role + `/equipment/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ data: data.results, loading: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ data: [] })
    })
}

export async function getEquipment(
  componet,
  filter,
  organisation,
  lab,
  tnved,
  lang,
  page
) {
  componet.setState({ equipment: [] })
  const pagination = page || { page_size: 9999, page: 1 }
  axios
    .get(
      `${URL}api/v1/organisation/equipment/?ordering=${filter}
    ${
      organisation !== undefined && organisation !== 'undefined'
        ? `&organisation=&organisation__institution=${organisation}`
        : ''
    }${lab !== undefined && lab !== 'undefined' ? `&organisation=${lab}` : ''}${
        tnved !== undefined && tnved !== 'undefined'
          ? `&organisation__science_field=${tnved}`
          : ''
      }&page_size=${pagination?.page_size}&page=${pagination?.page}&lang=${lang}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({
        equipment: data.results,
        loading: false,
        loader: false,
        total: data.count
      })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ 
        equipment: [], 
        loader: false ,
        total: 0
      })
    })
}

export async function getInstitutionList(componet, filter, lang) {
  axios
    .get(
      `${URL}api/v1/reference/institution/?ordering=${filter}&lang=${lang}`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution_list: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution_list: [] })
    })
}

export async function getScienceList(componet) {
  axios
    .get(`${URL}api/v1/reference/science-field/`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ science: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ science: [] })
    })
}

export async function getRegion(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/region/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ region_list: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ region_list: [] })
    })
}

export async function getScienceField2(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/science-field/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ science: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ science: [] })
    })
}

export async function getScienceField(componet) {
  axios
    .get(`${URL}api/v1/reference/science-field/?lang=uz`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ data: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ data: [] })
    })
}

export async function getOrgType(componet, lang) {
  axios
    .get(`${URL}api/v1/organisation/type/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ org_type_list: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ org_type_list: [] })
    })
}

export async function getEquipmentList(componet) {
  axios
    .get(
      `${URL}api/v1/reference/equipment/?lang=uz&ordering=code`,
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ equipment_list: data })
      componet.setState({ data_list: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ equipment_list: [] })
    })
}

export async function getLabsList(componet) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/organisation/` + user.role + `/labs/?lang=uz`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ labs_list: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ labs_list: [] })
    })
}

export async function getTnved(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/tnved/?lang=${lang}&ordering=code`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ tnved_list: data })
      componet.setState({ data_list: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ tnved_list: [] })
      componet.setState({ data_list: [] })
    })
}

export async function getCount(componet) {
  axios
    .get(`${URL}api/v1/organisation/count/`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ count: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ count: [] })
    })
}

export async function getFinance(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/finance-source/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ finance: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
    })
}
export async function getPurchaseReason(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/purchase-reason/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ purchase: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ purchase: [] })
    })
}

export async function getCountry(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/country/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ country: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ country: [] })
    })
}

export async function getCurrency(componet, lang) {
  axios
    .get(`${URL}api/v1/reference/currency/?lang=${lang}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ currency: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ currency: [] })
    })
}

export async function getApplicatorInfo(componet, lang) {
  const token = localStorage.getItem('token')
  axios
    .get(`${URL}api/v1/service/applicant/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ aplicator_info: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ aplicator_info: [] })
    })
}


export async function setApplicatorInfo(componet, params) {
  const token = localStorage.getItem('token')
  axios
    .patch(
      `${URL}api/v1/service/applicant/profile/`, 
      { ...params },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => response.data)
    .then(() => {
      localStorage.removeItem('continue_registration')
      localStorage.removeItem('applicant')
      window.open('/', '_self')
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function moderadorPutOrg(
  componet,
  id,
  short_name,
  short_name_ru,
  short_name_uz,
  name,
  name_ru,
  name_uz,
  description,
  description_ru,
  description_uz,
  zip_code,
  address_line,
  web,
  logo,
  photo,
  since_year,
  purpose,
  purpose_ru,
  purpose_uz,
  tasks_description,
  tasks_description_ru,
  tasks_description_uz,
  geolocation,
  chief_name,
  chief_phone,
  chief_email,
  contact_name,
  contact_email,
  contact_phone,
  disabled,
  institution,
  organization_type,
  region,
  parent,
  science_field,
) {
  const token = localStorage.getItem('token')
  const formData = new FormData()

  formData.append('id', id)

  formData.append('short_name', short_name_ru)
  formData.append('short_name_ru', short_name_ru)
  formData.append('short_name_uz', short_name_uz)
  formData.append('name', name_ru)
  formData.append('name_ru', name_ru)
  formData.append('name_uz', name_uz)
  formData.append('description', description_ru)
  formData.append('description_ru', description_ru)
  formData.append('description_uz', description_uz)
  formData.append('zip_code', zip_code)
  formData.append('address_line', address_line)
  formData.append('web', web == null ? '' : web)
  formData.append('logo', logo == null ? '' : logo)
  formData.append('photo', photo == null ? '' : photo)
  formData.append('since_year', since_year)

  formData.append('purpose', purpose_ru)
  formData.append('purpose_ru', purpose_ru)
  formData.append('purpose_uz', purpose_uz)
  formData.append('tasks_description', tasks_description_ru)
  formData.append('tasks_description_ru', tasks_description_ru)
  formData.append('tasks_description_uz', tasks_description_uz)
  formData.append('geolocation', geolocation)
  formData.append('chief_name', chief_name)
  formData.append('chief_phone', chief_phone)
  formData.append('chief_email', chief_email)
  formData.append('contact_name', contact_name)
  formData.append('contact_email', contact_email)
  formData.append('contact_phone', contact_phone)
  formData.append('disabled', disabled)
  formData.append('institution', institution)
  formData.append('organization_type', organization_type)
  formData.append('region', region)
  formData.append('parent', parent == null ? '' : parent)
  formData.append('science_field', science_field)

  axios
    .put(`${URL}api/v1/organisation/moderator/organisation/${id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ finance: data })
      window.open('/dashboard/org', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
    })
}

export async function moderadorPostOrg(
  componet,
  short_name,
  short_name_ru,
  short_name_uz,
  name,
  name_ru,
  name_uz,
  description,
  description_ru,
  description_uz,
  zip_code,
  address_line,
  web,
  logo,
  photo,
  since_year,
  purpose,
  purpose_ru,
  purpose_uz,
  tasks_description,
  tasks_description_ru,
  tasks_description_uz,
  geolocation,
  chief_name,
  chief_phone,
  chief_email,
  contact_name,
  contact_email,
  contact_phone,
  disabled,
  institution,
  organization_type,
  region,
  parent,
  science_field,
) {
  const token = localStorage.getItem('token')
  const formData = new FormData()

  formData.append('short_name', short_name_ru)
  formData.append('short_name_ru', short_name_ru)
  formData.append('short_name_uz', short_name_uz)
  formData.append('name', name_ru)
  formData.append('name_ru', name_ru)
  formData.append('name_uz', name_uz)
  formData.append('description', description_ru)
  formData.append('description_ru', description_ru)
  formData.append('description_uz', description_uz)
  formData.append('zip_code', zip_code)
  formData.append('address_line', address_line)
  formData.append('web', web)
  formData.append('logo', logo)
  formData.append('photo', photo)
  formData.append('since_year', since_year)

  formData.append('purpose', purpose_ru)
  formData.append('purpose_ru', purpose_ru)
  formData.append('purpose_uz', purpose_uz)
  formData.append('tasks_description', tasks_description_ru)
  formData.append('tasks_description_ru', tasks_description_ru)
  formData.append('tasks_description_uz', tasks_description_uz)
  formData.append('geolocation', geolocation)
  formData.append('chief_name', chief_name)
  formData.append('chief_phone', chief_phone)
  formData.append('chief_email', chief_email)
  formData.append('contact_name', contact_name)
  formData.append('contact_email', contact_email)
  formData.append('contact_phone', contact_phone)
  formData.append('disabled', disabled)
  formData.append('institution', institution)
  formData.append('organization_type', organization_type)
  formData.append('region', region)
  formData.append('parent', '')
  formData.append('science_field', science_field)

  const user = JSON.parse(localStorage.getItem('user'))

  axios
    .post(
      `${URL}api/v1/organisation/` + user.role + `/organisation/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ error: true, buttonActive: true })
      console.log(data)
      componet.setState({ org_id: data.id })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ error: true, buttonActive: true })
    })
}

export async function getAplicantDataID(componet) {
  const token = '313b74521d3598b3c169795eebeea3a552008087'
  axios
    .get(`${URL}api/v1/service/moderator/applicant/${1}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ purchase: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ purchase: [] })
    })
}

export async function getAdminlabs(componet, filter, page) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/organisation/` +
        user.role +
        `/labs/?ordering=${filter}&lang=uz${
          page ? `&page=${page}` : `&page_size=1000`
        }`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ labs: data.results })
      componet.setState({ count: data.count })
      componet.setState({ loading: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ labs: [] })
    })
}

export async function getFileList2(
  componet,
  organisation,
  laboratory,
  equipment,
  service,
) {
  let endPointName = ''

  if (organisation !== '') {
    endPointName = '?organisation='
  } else if (laboratory !== '') {
    endPointName = '?laboratory='
  } else if (service !== '') {
    endPointName = '?service='
  } else if (equipment !== '') {
    endPointName = '?equipment='
  }

  let endPointData = ''

  if (organisation !== '') {
    endPointData = organisation
  } else if (laboratory !== '') {
    endPointData = laboratory
  } else if (equipment !== '') {
    endPointData = equipment
  } else if (service !== '') {
    endPointData = service
  }

  axios
    .get(`${URL}api/v1/attachment/file/${endPointName + endPointData}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ fileData_lab: data.results })
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function getFileList(
  componet,
  organisation,
  laboratory,
  equipment,
  service,
) {
  let endPointName = ''

  if (organisation !== '') {
    endPointName = '?organisation='
  } else if (laboratory !== '') {
    endPointName = '?laboratory='
  } else if (service !== '') {
    endPointName = '?service='
  } else if (equipment !== '') {
    endPointName = '?equipment='
  }

  let endPointData = ''

  if (organisation !== '') {
    endPointData = organisation
  } else if (laboratory !== '') {
    endPointData = laboratory
  } else if (equipment !== '') {
    endPointData = equipment
  } else if (service !== '') {
    endPointData = service
  }

  axios
    .get(`${URL}api/v1/attachment/file/${endPointName + endPointData}`, {})
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ fileData: data.results })
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function getAdminServive(
  componet,
  equipment,
  filter,
  page,
  equipment__lab,
) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/organisation/` +
        user.role +
        `/service/?lang=uz&ordering=${filter}${
          equipment == undefined
            ? page
              ? `&page=${page}`
              : `&page_size=1000`
            : `&equipment=${equipment}${
                page ? `&page=${page}` : `&page_size=1000`
              }${
                equipment__lab == undefined
                  ? ''
                  : `&equipment__lab=${equipment__lab}`
              } `
        }`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ service: data.results })
      componet.setState({ countD: data.count })
      componet.setState({ serv_lenth: data.results.length })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ service: [] })
    })
}

export async function getAdminZayavki(componet, page, servise) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/service/` +
        user.role +
        `/request/${page ? `?page=${page}` : `?page_size=1000`}${
          servise == undefined ? '' : `&service=${servise}`
        }`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ zayavki: data.results })
      componet.setState({ countE: data.count })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ zayavki: [] })
    })
}

export async function getAdminZayaviteli(componet) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/service/` + user.role + `/applicant/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ zayaviteli: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ zayaviteli: [] })
    })
}

export async function getAdminObr2(componet, filter, page, lab) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/organisation/` +
        user.role +
        `/equipment?ordering=${filter}&lang=uz${
          page ? `&page=${page}` : `&page_size=1000`
        }${lab == undefined ? '' : `&lab=${lab}`}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ equipment: data.results })
      componet.setState({ countB: data.count })
      componet.setState({ loading: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ equipment: [] })
    })
}

export async function getAdminObr(componet) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/organisation/` + user.role + `/equipment/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ institution: data.results })
      componet.setState({ loading: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution: [] })
    })
}

export async function getChartEquipment(componet, organization) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/chart/organisation/equipment/requests/?organisation=${
        organization ? organization : ''
      }`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({
        chartData: componet.state.chartData.concat(
          data.results.map((item) => [item.name, item.service_count]),
        ),
      })

      componet.setState({ loading: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution: [] })
    })
}

export async function getChartServise(componet, organisation) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/chart/organisation/service/requests/?organisation=${
        organisation ? organisation : ''
      }`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({
        chartData2: componet.state.chartData2.concat(
          data.results.map((item) => [item.name, item.service_count]),
        ),
      })

      componet.setState({ loading: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution: [] })
    })
}

export async function getAdmimDataID(componet, data, id) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/organisation/` + user.role + `/${data}/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState(data)
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ institution: [] })
    })
}

export async function getAdminOrg(componet, filter, page) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  user.role == 'assistant'
    ? axios
        .get(
          `${URL}api/v1/organisation/organisation/${user.organisation}/?lang=uz&page_size=1000`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        )
        .then((response) => response.data)
        .then((data) => {
          componet.setState({ institution: [data] })
          componet.setState({ loading: false })
        })
        .catch((error) => {
          console.log(error)
          componet.setState({ institution: [] })
        })
    : axios
        .get(
          `${URL}api/v1/organisation/` +
            user.role +
            `/organisation/?ordering=${filter}&lang=uz${
              page ? `&page=${page}` : `&page_size=1000`
            }`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        )
        .then((response) => response.data)
        .then((data) => {
          componet.setState({ institution: data.results })
          componet.setState({ loading: false })
          componet.setState({ countC: data.count })
        })
        .catch((error) => {
          console.log(error)
          componet.setState({ institution: [] })
        })
}

export async function adminGetLabs(componet) {
  const token = localStorage.getItem('token')
  axios
    .get(`${URL}api/v1/service/applicant/request/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ aplications: data.results })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ aplications: [] })
    })
}

export async function aplicationAgree(componet, id, lang) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/service/applicant/request/${id}/agree/?lang=${lang}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ data: data })
      getServiseByID2(componet, data.service, lang)
      getInstitutionByID(componet, data.organisation, lang)
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function aplicationDisAgree(componet, id, lang) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(
      `${URL}api/v1/service/applicant/request/${id}/reject/agree/?lang=${lang}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ data: data })
      getServiseByID2(componet, data.service, lang)
      getInstitutionByID(componet, data.organisation, lang)
    })
    .catch((error) => {
      console.log(error)
    })
}

export async function getAplicantions(componet) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .get(`${URL}api/v1/service/applicant/request/?page_size=1000`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ aplications: data.results })
      componet.setState({ loader: false })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ aplications: [] })
      componet.setState({ loader: false })
    })
}

export async function equpmentZayavkaPost(
  componet,
  service,
  organisation,
  equipment,
  purpose,
  name,
  once_flag,
  instruction,
  duration_days,
  education_flag,
  result_flag,
  requested_date,
  required_date,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  equipment.forEach((item) => formData.append('equipment', item))

  formData.append('service', service)
  formData.append('name', name)
  formData.append('organisation', organisation)
  // formData.append('equipment', equipment)

  formData.append('purpose', purpose)
  formData.append('once_flag', once_flag)
  formData.append('duration_days', duration_days)
  formData.append('education_flag', education_flag)
  formData.append('result_flag', result_flag)
  formData.append('required_date', required_date)
  formData.append('instruction', instruction)
  formData.append('requested_date', requested_date)

  axios
    .post(`${URL}api/v1/service/applicant/request/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((data) => {
      // componet.setState({ finance: data })
      window.open('/my_application', '_self')
    })
    .catch((error) => {
      console.log(error)
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function deleteItem(componet, name, id, url) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  axios
    .delete(`${URL}api/v1/organisation/` + user.role + `/${name}/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((data) => {
      window.open(url, '_self')
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
}

export async function moderadorPutZayavka(
  componet,
  id,
  purpose,
  name,
  required_date,
  requested_date,
  duration_days,
  once_flag,
  instruction,
  education_flag,
  result_flag,
  status,
  closed_date,
  close_message,
  applicant,
  service,
  organisation,
  closed_by,
  equipment,
  applicant_full_name,
  admin_id,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('purpose', purpose)
  formData.append('name', name)
  formData.append('applicant_full_name', applicant_full_name)
  formData.append('required_date', required_date)
  formData.append('requested_date', requested_date)
  formData.append('duration_days', duration_days)
  formData.append('once_flag', once_flag)
  formData.append('instruction', instruction)
  formData.append('education_flag', education_flag)
  formData.append('result_flag', result_flag)
  formData.append('status', status)
  formData.append('closed_date', closed_date)
  formData.append('close_message', close_message)
  formData.append('applicant', applicant)
  formData.append('service', service)
  formData.append('organisation', organisation)
  formData.append('closed_by', admin_id)
  equipment.forEach((item) => formData.append('equipment', item))

  axios
    .put(`${URL}api/v1/service/` + user.role + `/request/${id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((data) => {
      window.open('/dashboard/zayavki', '_self')
    })
    .catch((error) => {
      console.log(error)
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPutLabs(
  componet,
  id,
  name,
  name_ru,
  name_uz,
  description,
  description_ru,
  description_uz,
  disabled,
  since_year,
  organisation,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('id', id)

  formData.append('name', name_ru)
  formData.append('name_ru', name_ru)
  formData.append('name_uz', name_uz)
  formData.append('description', description_ru)
  formData.append('description_ru', description_ru)
  formData.append('description_uz', description_uz)
  formData.append('disabled', user.role == 'moderator' ? false : false)
  formData.append('since_year', since_year)
  formData.append('organisation', organisation)

  axios
    .put(`${URL}api/v1/organisation/` + user.role + `/labs/${id}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((data) => {
      window.open('/dashboard/lab', '_self')
    })
    .catch((error) => {
      console.log(error)
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorCheckPutLabs(componet, item, disabled) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('id', item.id)

  formData.append('name', item.name_ru)
  formData.append('name_ru', item.name_ru)
  formData.append('name_uz', item.name_uz)
  formData.append('description', item.description_ru)
  formData.append('description_ru', item.description_ru)
  formData.append('description_uz', item.description_uz)
  formData.append('disabled', disabled)
  formData.append('since_year', item.since_year)
  formData.append('organisation', item.organisation)

  axios
    .put(
      `${URL}api/v1/organisation/` + user.role + `/labs/${item.id}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((data) => {
      componet.setState({ finance: data })
      window.open('/dashboard/lab', '_self')
    })
    .catch((error) => {
      console.log(error)
      // alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorChangePassword(
  componet,
  password,
  new_password,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('password', password)
  formData.append('new_password', new_password)

  axios
    .put(`${URL}api/v1/auth/change_password/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((data) => {
      componet.setState({ finance: data })
      window.open('/dashboard/lab', '_self')
    })
    .catch((error) => {
      console.log(error)
      // alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPostLabs(
  componet,
  name,
  name_ru,
  name_uz,
  description,
  description_ru,
  description_uz,
  disabled,
  since_year,
  organisation,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('name', name_ru)
  formData.append('name_ru', name_ru)
  formData.append('name_uz', name_uz)
  formData.append('description', description_ru)
  formData.append('description_ru', description_ru)
  formData.append('description_uz', description_uz)
  formData.append('disabled', user.role == 'moderator' ? false : false)
  formData.append('since_year', since_year)
  formData.append('organisation', organisation)

  axios
    .post(`${URL}api/v1/organisation/` + user.role + `/labs/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((data) => {
      console.log(data)
      componet.setState({ lab_id: data.data.id })
      componet.setState({ buttonActive: true })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ buttonActive: true })
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPostAplicator(
  componet,
  login,
  password,
  organisation,
  full_name,
  is_legal,
  region_active,
  address_line,
  zip_code,
  phone,
  email,
  sex,
  degree,
) {
  const token = '313b74521d3598b3c169795eebeea3a552008087'

  const formData = new FormData()

  formData.append('login', login)
  formData.append('password', password)
  formData.append('organisation', organisation)
  formData.append('full_name', full_name)
  formData.append('is_legal', is_legal)
  formData.append('region', region_active)
  formData.append('address_line', address_line)
  formData.append('zip_code', zip_code)
  formData.append('phone', phone)
  formData.append('email', email)
  formData.append('sex', sex)
  formData.append('degree', degree)

  componet.setState({ cliced: true })

  componet.setState({ regBut: false })

  axios
    .post(`${URL}api/v1/service/applicant/register/`, formData)
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ message: true })
      componet.setState({ error_code: false })

      componet.setState({ cliced: true })

      setTimeout(() => {
        auto_login(this, login, password)
      }, 2000)
    })
    .catch((error) => {
      componet.setState({ cliced: null })
      console.log(error)
      componet.setState({ error_message: error.response.data.login[0] })
      componet.setState({ error_code: true })
    })
}

export async function moderadorCheckPutServise(componet, item, disabled) {
  const token = localStorage.getItem('token')

  const user = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData()

  formData.append('name', item.name_ru)
  formData.append('name_ru', item.name_ru)
  formData.append('name_uz', item.name_uz)
  formData.append('description', item.description_ru)
  formData.append('description_ru', item.description_ru)
  formData.append('description_uz', item.description_uz)
  formData.append('disabled', disabled)
  formData.append('equipment', item.equipment)
  formData.append('organisation', item.organisation)

  axios
    .put(
      `${URL}api/v1/organisation/` + user.role + `/service/${item.id}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ finance: data })
      window.open('/dashboard/servise', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPutServise(
  componet,
  id,
  name,
  name_ru,
  name_uz,
  description,
  description_ru,
  description_uz,
  disabled,
  organisation,
  equipment,
) {
  const token = localStorage.getItem('token')

  const user = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData()

  formData.append('name', name_ru)
  formData.append('name_ru', name_ru)
  formData.append('name_uz', name_uz)
  formData.append('description', description_ru)
  formData.append('description_ru', description_ru)
  formData.append('description_uz', description_uz)
  formData.append(
    'disabled',
    disabled == true ? true : user.role == 'moderator' ? false : true,
  )
  equipment.forEach((item) => formData.append('equipment', item))
  formData.append('organisation', organisation)

  axios
    .put(
      `${URL}api/v1/organisation/` + user.role + `/service/${id}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ finance: data })
      window.open('/dashboard/servise', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderatorDeleteFile(
  componet,
  id,
  organisation,
  laboratory,
  equipment,
  service,
) {
  const token = localStorage.getItem('token')

  const user = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData()

  formData.append('id', id)

  axios
    .delete(`${URL}api/v1/attachment/` + user.role + `/file/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      getFileList(componet, organisation, laboratory, equipment, service)
    })
    .catch((error) => {
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPostFile(
  componet,
  name,
  filename,
  disabled,
  attachment_type,
  organisation,
  laboratory,
  equipment,
  service,
) {
  componet.setState({ save: true })
  const token = localStorage.getItem('token')

  const user = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData()

  formData.append('name', name)
  formData.append('filename', filename)
  formData.append('disabled', disabled)
  formData.append('attachment_type', attachment_type)
  formData.append('organisation', organisation)
  formData.append('laboratory', laboratory)
  formData.append('equipment', equipment)

  formData.append('service', service)

  axios
    .post(`${URL}api/v1/attachment/` + user.role + `/file/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ file_text: '' })

      componet.setState({ save: false })

      getFileList(componet, organisation, laboratory, equipment, service)
    })
    .catch((error) => {
      componet.setState({ save: false })
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPostServise(
  componet,
  name,
  name_ru,
  name_uz,
  description,
  description_ru,
  description_uz,
  disabled,
  organisation,
  equipment,
) {
  const token = localStorage.getItem('token')

  const user = JSON.parse(localStorage.getItem('user'))

  const formData = new FormData()

  formData.append('name', name_ru)
  formData.append('name_ru', name_ru)
  formData.append('name_uz', name_uz)
  formData.append('description', description_ru)
  formData.append('description_ru', description_ru)
  formData.append('description_uz', description_uz)
  formData.append('disabled', user.role == 'moderator' ? false : true)
  equipment.forEach((item) => formData.append('equipment', item))
  formData.append('organisation', organisation)

  axios
    .post(`${URL}api/v1/organisation/` + user.role + `/service/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ sev_id: data.id })
      componet.setState({ buttonActive: true })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
      componet.setState({ buttonActive: true })
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPostRequest(componet, data) {
  axios
    .get(`${URL}api/v1/organisation/moderator/request/`, data, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
        'Content-Type': 'text/plain',
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ finance: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
      alert('Необходимо заполнить все нужные поля')
    })
}

export async function moderadorPutEqupment(
  componet,
  id,
  name,
  description,
  is_unique,
  manufacture_year,
  purchase_year,
  expiration_year,
  condition,
  purchase_price,
  status,
  stock_number,
  organisation,
  equipment,
  lab,
  tnved,
  fin_source,
  purchase_reason,
  manufacture_country,
  purchase_country,
  purchase_currency,
  amount,
  disabled,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('name', name)
  formData.append('description', description)
  formData.append('is_unique', is_unique)
  formData.append('manufacture_year', manufacture_year)
  formData.append('purchase_year', purchase_year)
  formData.append('expiration_year', expiration_year)
  formData.append('condition', condition)
  formData.append('purchase_price', purchase_price)
  formData.append('quantity', amount)
  formData.append('status', status)

  formData.append('stock_number', stock_number)
  formData.append('organisation', organisation)
  formData.append('equipment', equipment)
  formData.append('lab', lab)
  formData.append('tnved', tnved)
  formData.append('fin_source', fin_source)
  formData.append('purchase_reason', purchase_reason)
  formData.append('manufacture_country', manufacture_country)
  formData.append('purchase_country', purchase_country)
  formData.append('purchase_currency', purchase_currency)
  formData.append(
    'disabled',
    disabled == true ? true : user.role == 'moderator' ? false : true,
  )

  axios
    .put(
      `${URL}api/v1/organisation/` + user.role + `/equipment/${id}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      window.open('/dashboard/ob', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
    })
}

export async function moderadorCheckPutEqupment(componet, item, disabled) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('id', item.id)

  formData.append('name', item.name)
  formData.append('description', item.description)
  formData.append('is_unique', item.is_unique)
  formData.append('manufacture_year', item.manufacture_year)
  formData.append('purchase_year', item.purchase_year)
  formData.append('expiration_year', item.expiration_year)
  formData.append('condition', item.condition)
  formData.append('purchase_price', item.purchase_price)
  formData.append('status', item.status)

  formData.append('stock_number', item.stock_number)
  formData.append('organisation', item.organisation)
  formData.append('equipment', item.equipment)
  formData.append('lab', item.lab)
  formData.append('tnved', item.tnved)
  formData.append('fin_source', item.fin_source)
  formData.append('purchase_reason', item.purchase_reason)
  formData.append('manufacture_country', item.manufacture_country)
  formData.append('purchase_country', item.purchase_country)
  formData.append('purchase_currency', item.purchase_currency)
  formData.append('disabled', disabled)

  axios
    .put(
      `${URL}api/v1/organisation/` + user.role + `/equipment/${item.id}/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    )
    .then((response) => response.data)
    .then((data) => {
      window.open('/dashboard/ob', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
    })
}

export async function moderadorPostEqupment(
  componet,
  name,
  description,
  is_unique,
  manufacture_year,
  purchase_year,
  expiration_year,
  condition,
  purchase_price,
  status,
  stock_number,
  organisation,
  equipment,
  lab,
  tnved,
  fin_source,
  purchase_reason,
  manufacture_country,
  purchase_country,
  purchase_currency,
  amount,
  disabled,
) {
  const token = localStorage.getItem('token')

  const formData = new FormData()

  const user = JSON.parse(localStorage.getItem('user'))

  formData.append('name', name)
  formData.append('description', description)
  formData.append('is_unique', is_unique)
  formData.append('manufacture_year', manufacture_year)
  formData.append('purchase_year', purchase_year)
  formData.append('expiration_year', expiration_year)
  formData.append('condition', condition)
  formData.append('purchase_price', purchase_price)
  formData.append('quantity', amount)
  formData.append('status', status)

  formData.append('stock_number', stock_number)
  formData.append('organisation', organisation)
  formData.append('equipment', equipment)
  formData.append('lab', lab)
  formData.append('tnved', tnved)
  formData.append('fin_source', fin_source)
  formData.append('purchase_reason', purchase_reason)
  formData.append('manufacture_country', manufacture_country)
  formData.append('purchase_country', purchase_country)
  formData.append('purchase_currency', purchase_currency)
  formData.append('disabled', user.role == 'moderator' ? false : true)

  axios
    .post(`${URL}api/v1/organisation/` + user.role + `/equipment/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      // alert('Work')
      // alert(JSON.stringify(data.id))
      componet.setState({ buttonActive: true })
      componet.setState({ equ_id: data.id })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
      componet.setState({ buttonActive: true })
    })
}

export async function moderadorPostNess(componet, data) {
  axios
    .get(`${URL}api/v1/news/moderator/type/`, data, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
        'Content-Type': 'text/plain',
      },
    })
    .then((response) => response.data)
    .then((data) => {
      componet.setState({ finance: data })
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ finance: [] })
    })
}

export async function login(componet, username, password) {
  axios
    .post(
      `${URL}api/v1/auth/login/`,
      {
        username: username,
        password: password,
      },
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data.data))
      localStorage.setItem('token', data.token)
      data.data.role == 'applicant'
        ? window.open('/', '_self')
        : window.open('/dashboard/main', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ error: true })
    })
}

export async function oneid_login(component, token) {
  axios
    .get(
      `${URL}api/v1/auth/info/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data.data))
      localStorage.setItem('applicant', JSON.stringify(data.applicant))
      localStorage.setItem('token', data.token)

      if (!data.applicant.degree) {
        localStorage.setItem('continue_registration', true)
        window.open('/oneid_registration', '_self')
      } else {
        data.data.role == 'applicant'
          ? window.open('/', '_self')
          : window.open('/dashboard/main', '_self')
      }
    })
    .catch((error) => {
      console.log(error)
      component.setState({ oneid_error: true })
    })
}

export async function auto_login(componet, username, password) {
  axios
    .post(
      `${URL}api/v1/auth/login/`,
      {
        username: username,
        password: password,
      },
      {},
    )
    .then((response) => response.data)
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data.data))
      localStorage.setItem('token', data.token)
      data.data.role == 'applicant'
        ? window.open('/', '_self')
        : window.open('/dashboard/main', '_self')
    })
    .catch((error) => {
      console.log(error)
      componet.setState({ error: true })
    })
}
