import React, { Component } from 'react'

class Home extends Component {
  render() {
    const { pageData } = this.props

    return (
      <div>
        {!pageData && <h2>Loading...</h2>}
        {pageData &&
        <section>
          <header>
            <h1>{pageData.title}</h1>
          </header>
          {pageData.content}
        
          <footer>
            Publié le {pageData.publication}
          </footer>  
        </section>}
      </div>
    )
  }
}

export default Home