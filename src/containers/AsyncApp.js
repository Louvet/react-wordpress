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

import Page from './Page'
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

  buildRoutes(data){
    let slug = {}
    const getPostSlug = this.getPostSlug

    return(
      <Switch>
        {data.map(function(menuItem, i) {
          slug = getPostSlug(menuItem)
          if (menuItem.menu_item_children.length>0) {
              return (
                <div>
                  <Route key={i} path={ slug.path } component={ Page(slug.component, slug.path) } exact/>
                  {menuItem.menu_item_children.map(function(subMenu, i) {
                    slug = getPostSlug(subMenu)
                    return <Route key={i} path={ slug.path } component={ Page(slug.component, slug.path) } exact />
                  })}
                </div>
              )
          } else {          
            return (
              <Route key={i} path={ slug.path } component={ Page(slug.component, slug.path) } exact />
            )
          }
        })}
        <Route render={() => { return <Redirect to="/" /> }} />
      </Switch> 
    )   
  }

  render() {
    const { primaryNavigation } = this.props

    return (
      <div>
        {primaryNavigation.links.tree != null &&
          <Router>
            <div>
              <PrimaryNavigation links={primaryNavigation.links}/>
              {this.buildRoutes(primaryNavigation.links.tree)}
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