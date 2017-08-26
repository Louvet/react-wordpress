import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchPrimaryNavigation
} from '../actions'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Home from '../components/Home'
import Competences from '../components/Competences'

import PrimaryNavigation from '../components/PrimaryNavigation'

class AsyncApp extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPrimaryNavigation())
  }

  getPostSlug(post) {
    const templates = {
      'home'       : Home,
      'competences': Competences
    }
    const url = post.url.replace('http://163.172.98.183/', '').replace(/\//g, '');

    return url.length > 0 ? { component: templates[url], path: url } : { component: templates['home'], path: '' }
  }

  buildRoutes(data){
      return data.map((page, i) => {
        const slug = this.getPostSlug(page)

          return(
              <Route key={i} path={`/${slug.path}`} component={ slug.component } exact />
          )
      })     
  }

  render() {
    const { primaryNavigation } = this.props

    return (
      <div>
      {primaryNavigation.links.html.length > 0 &&
        <Router>
          <div>
            <PrimaryNavigation links={primaryNavigation.links}/>
            <Switch>
              {this.buildRoutes(primaryNavigation.links.tree)}
              <Route render={() => { return <Redirect to="/" /> }} />
            </Switch> 
          </div>
        </Router>
      }
    </div>
    )
  }
}

AsyncApp.propTypes = {
  primaryNavigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { primaryNavigation } = state

  return {
    primaryNavigation
  }
}

export default connect(mapStateToProps)(AsyncApp)