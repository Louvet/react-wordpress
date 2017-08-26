import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchPage
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
    this.props.dispatch(fetchPage(this.pageName))
  }    
  
  render() {
    const { pageData } = this.props
  
    return (
      <PageTemplate {...this.props} pageData={pageData} />
      )
    }
  }
  
  PageComponent.propTypes = {
    pageData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  
  function mapStateToProps(state) {
    const { pageData } = state
  
    return {
      pageData
    }
  }

  return connect(mapStateToProps)(PageComponent)
}
export default Page