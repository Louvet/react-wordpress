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

import Page from '../components/Page'
import Home from '../components/Home'
import Base from '../components/Base'

import PrimaryNavigation from '../components/PrimaryNavigation'

class AsyncApp extends Component {
  componentWillMount() {
    this.props.dispatch(fetchPrimaryNavigation())
  }

  getPostSlug(post) {
    const templates = {
      '/': Home
    }
    let url = post.url.replace('http://163.172.98.183/', '/')

    if(1 < url.length) {
      url = url.slice(0, -1)
    }

    return { component: templates[url]? templates[url]:Base, path: url }
  }

  buildRoutes(data){
      return data.map((page, i) => {
        const slug = this.getPostSlug(page)

          return(
              <Route key={i} path={ slug.path } component={ Page(slug.component, slug.path) } exact />
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