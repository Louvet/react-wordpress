import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import 'gsap'
import { TimelineMax } from 'gsap' 
import GSAP from 'react-gsap-enhancer'

function createRevealAnim({target}) {
  var items = target.find({id: 'primary-nav'}).findAllInChildren()

  return new TimelineMax()
  	.staggerFrom(items, 1, {opacity: 0, scale: .3}, .12)
}

class PrimaryNavigation extends Component {
  componentDidMount() {
      //this.addAnimation(createRevealAnim)
  }

  render() {
    const { links } = this.props

    return (
      <div>
        <ul id="primry-nav">
        {links.tree.map(function(menuItem, i) {
          if (menuItem.menu_item_children.length>0) {
              return (
                <li key={i}><NavLink to={menuItem.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{menuItem.title}</NavLink>
                  <ul>
                      {menuItem.menu_item_children.map(function(subMenu, i) {
                          return <li key={i}><NavLink to={subMenu.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{subMenu.title}</NavLink></li>;
                      })}
                  </ul>
                </li>
              )
          } else {
            return (
              <li key={i}><NavLink to={menuItem.url.replace(/http:\/\/163.172.98.183\//g, '/')}>{menuItem.title}</NavLink></li>
            )
          }
        })}
        </ul>
      </div>
    )
  }
}

PrimaryNavigation.propTypes = {
  links: PropTypes.object.isRequired
}

export default GSAP()(PrimaryNavigation)