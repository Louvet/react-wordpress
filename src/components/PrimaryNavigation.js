import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class PrimaryNavigation extends Component {
  constructor(props) {
    super(props)
    this.handleNavigationLinkClick = this.handleNavigationLinkClick.bind(this)
  }

  handleNavigationLinkClick(e) {
    //e.preventDefault()
  }

  componentWillUpdate() {
    let links = ReactDOM.findDOMNode(this).querySelectorAll('a');
    
    links.forEach(function (link) {
      link.removeEventListener('click', this.handleNavigationLinkClick)
    }.bind(this));
  }

  componentDidUpdate() {
    let links = ReactDOM.findDOMNode(this).querySelectorAll('a');

    links.forEach(function (link) {
      link.addEventListener('click', this.handleNavigationLinkClick)
    }.bind(this));
  }

  createMarkup() {
    return {__html: this.props.links.html.replace(/http:\/\/163.172.98.183\//g, '/')}; 
  }

  render() {
    const { links } = this.props

    //<div dangerouslySetInnerHTML={this.createMarkup()}></div>

    return (
      <div>
        {links.html.length <= 0 && <h2>Loading...</h2>}
        {links.html.length > 0 &&
        <div id="primary-nav">
          { links.tree.map((link, i) => <Link key={i} to={link.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{link.title}</Link>  ) }
        </div>
        }
      </div>
    )
  }
}

PrimaryNavigation.propTypes = {
  links: PropTypes.object.isRequired
}