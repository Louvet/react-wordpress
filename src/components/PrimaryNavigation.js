import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class PrimaryNavigation extends Component {
  constructor(props) {
    super(props)
    this.handleNavigationLinkClick = this.handleNavigationLinkClick.bind(this)
  }

  handleNavigationLinkClick(e) {
    e.preventDefault()
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
    return {__html: this.props.links.html}; 
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()}></div>
    )
  }
}

PrimaryNavigation.propTypes = {
  links: PropTypes.object.isRequired
}