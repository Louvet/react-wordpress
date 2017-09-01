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
import { RouteTransition } from 'react-router-transition'
import spring from 'react-motion/lib/spring';

import Page from './Page'
import PrimaryNavigation from '../components/PrimaryNavigation'
import HomePage from '../components/HomePage'
import BasePage from '../components/BasePage'

class AsyncApp extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPrimaryNavigation())
  }

  getPostSlug(post) {
    const templates = {
      '/': HomePage
    }
    let url = post.url.replace('http://163.172.98.183/', '/')

    if(1 < url.length) {
      url = url.slice(0, -1)
    }

    return { component: templates[url]? templates[url]:BasePage, path: url }
  }

  buildRoutes(data, location){
    let slug = {}
    const getPostSlug = this.getPostSlug

    return(
      <Switch location={location}>
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
    const fadeConfig = { stiffness: 200, damping: 22 }
    const slideConfig = { stiffness: 330, damping: 30 }

    return (
      <div>
      {primaryNavigation.links.tree != null &&         
        <Router>
          <div>
          <PrimaryNavigation links={primaryNavigation.links}/>
          <Route render={({ location }) => (
            <RouteTransition className="transition-wrapper"
              pathname={location.pathname}
              atEnter={{ opacity: 0, offset: 100 }} 
              atLeave={{ opacity: spring(0, fadeConfig), offset: spring(-100, slideConfig) }} 
              atActive={{ opacity: spring(1, slideConfig), offset: spring(0, slideConfig) }} 
              mapStyles={styles => ({ opacity: styles.opacity, transform: `translateX(${styles.offset}%)` })}
              >
              {this.buildRoutes(primaryNavigation.links.tree, location)}
            </RouteTransition>
          )}/>
          </div>
        </Router>}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { primaryNavigation } = state

  return {
    primaryNavigation
  }
}

export default connect(mapStateToProps)(AsyncApp)