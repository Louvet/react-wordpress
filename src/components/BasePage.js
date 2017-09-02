import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageFooter from '../components/Footer/PageFooter/index'

class BasePage extends Component {
  render() {
    const { pageData } = this.props

    return (
      <div className="page"> 
        {pageData &&
        <section>
          { pageData.thumbnail &&  
          <div dangerouslySetInnerHTML={{ __html: pageData.thumbnail }}></div>}

          <header>
          <h1>{pageData.title}</h1>
          </header>
          
          <div dangerouslySetInnerHTML={{ __html: pageData.content }}></div>
      
          <footer>
            Publié le {pageData.publication}
          </footer>  
        </section>}

        <PageFooter/>
      </div>
    )
  }
}

BasePage.propTypes = {
  primaryNavigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { primaryNavigation } = state

  return {
    primaryNavigation
  }
}

export default connect(mapStateToProps)(BasePage)