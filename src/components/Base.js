import React, { Component } from 'react'

class Base extends Component {
  render() {
    const { pageData } = this.props

    return (
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
      </section>
    )
  }
}

export default Base