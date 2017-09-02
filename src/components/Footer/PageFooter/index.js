import React, { Component } from 'react'

class PageFooter extends Component {
  render() {
    return (
      <div>
        &copy; {(new Date()).getFullYear()} Vincent Louvet, tous droits réservés.
      </div>    
    )
  }
}

export default PageFooter