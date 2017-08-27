import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchPageIfNeeded
} from '../actions'

const Page = (PageTemplate, pageName) => {
  class PageComponent extends Component {

  constructor(props) {
      super(props)

      if('/' === pageName) 
        this.pageName = 'accueil'
      else
        this.pageName = pageName.slice(1)
  }  

  componentDidMount() {
    this.props.dispatch(fetchPageIfNeeded(this.pageName))
  }    
  
  render() {
    const { pages } = this.props

    return (
      <div>
        {!pages.isFetching && 
        <PageTemplate {...this.props} pageData={pages.items[this.pageName]} />}
      </div>
      )
    }
  }
  
  PageComponent.propTypes = {
    pages: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  
  function mapStateToProps(state) {
    const { pages } = state
  
    return {
      pages
    }
  }

  return connect(mapStateToProps)(PageComponent)
}
export default Page