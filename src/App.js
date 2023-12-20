import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import About from './screens/About'
import Admin from './screens/Admin'
import Contact from './screens/Contact'
import Equipment from './screens/Equipment'
import Home from './screens/Home'
import Institution from './screens/Institution'
import InstitutionPage from './screens/InstitutionPage'
import Login from './screens/Login'
import News from './screens/News'
import NewsPage from './screens/NewsPage'
import Order from './screens/Order'
import Registration from './screens/Registration'
import OneIdRegistration from './screens/OneIdRegistration'
import Servise from './screens/Servise'
import { strings } from './localozation'
import ServisePage from './screens/ServisePage'
import EquipmentPage from './screens/EquipmentPage'
import MyApplication from './screens/MyApplication'
import InstitutionFilter from './screens/InstetutionFilter'
import Application from './screens/Application'
import InstitutionF from './screens/InstetutionF'
import Reference from './components/Reference'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobmenu: false,
      lang: 'uz',
    }
  }

  componentWillMount() {
    strings.setLanguage('uz')
  }

  setLanguage(lang) {
    this.setState({ lang: lang })
  }

  render() {
    return (
      <div>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact render={(match) => <Home />} />
            <Route
              path="/reference/"
              exact
              render={(match) => <Reference {...match} />}
            />
            <Route
              path="/reference/:id"
              exact
              render={(match) => <Reference {...match} />}
            />
            <Route
              path="/reference/:id"
              exact
              render={(match) => <Reference {...match} />}
            />
            <Route
              path="/institution/"
              exact
              render={(match) => <Institution {...match} />}
            />
            <Route
              path="/institutionf/:f_id/"
              exact
              render={(match) => <InstitutionF {...match} />}
            />
            <Route
              path="/institutionfilter/:typeid/"
              exact
              render={(match) => <InstitutionFilter {...match} />}
            />
            <Route
              path="/institutionpage/:id/:item_id/"
              render={(match) => <InstitutionPage {...match} />}
            />
            <Route
              path="/servisepage/:id/:item_id/"
              render={(match) => <ServisePage {...match} />}
            />
            <Route
              path="/application/:item_id/"
              render={(match) => <Application {...match} />}
            />
            <Route
              path="/equipmentpage/:id/:item_id/"
              render={(match) => <EquipmentPage {...match} />}
            />
            <Route path="/servise" exact render={(match) => <Servise />} />
            {/* <Route
              path="/registration"
              exact
              render={(match) => <Registration />}
            /> */}
            <Route
              path="/oneid_registration"
              exact
              render={(match) => <OneIdRegistration />}
            />
            <Route path="/equipment" exact render={(match) => <Equipment />} />
            <Route path="/news" exact render={(match) => <News />} />
            <Route path="/about" exact render={(match) => <About />} />
            <Route path="/contact" exact render={(match) => <Contact />} />
            <Route path="/contact" exact render={(match) => <Contact />} />
            <Route path="/order" exact render={(match) => <Order />} />
            <Route
              path="/newspage/:id/"
              exact
              render={(match) => <NewsPage {...match} />}
            />
            <Route path="/login" exact render={(match) => <Login />} />
            <Route path="/dashboard" render={(match) => <Admin />} />
            <Route
              path="/my_application"
              render={(match) => <MyApplication />}
            />
          </Switch>
        </ScrollToTop>
      </div>
    )
  }
}
