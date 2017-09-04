import React, { Component } from 'react'

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

export default BasePage