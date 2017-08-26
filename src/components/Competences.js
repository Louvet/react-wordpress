import React, { Component } from 'react'

class Competences extends Component {
  render() {
    const { pageData } = this.props

    return (
      <section>
        <header>
          <h1>{pageData.title}</h1>
        </header>
        {pageData.content}
      
        <footer>
          Publié le {pageData.publication}
        </footer>  
      </section>
    )
  }
}

export default Competences