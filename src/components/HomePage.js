import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PrimaryNavigation from '../components/PrimaryNavigation'
import PageFooter from '../components/PageFooter'

class HomePage extends Component {
  render() {
    const { pageData, primaryNavigation } = this.props

    return (
      <div className="page"> 
        <PrimaryNavigation links={primaryNavigation.links}/> 
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

HomePage.propTypes = {
  primaryNavigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { primaryNavigation } = state

  return {
    primaryNavigation
  }
}

export default connect(mapStateToProps)(HomePage)