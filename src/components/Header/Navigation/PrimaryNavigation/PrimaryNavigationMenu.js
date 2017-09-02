import React, { Component } from 'react'

import PrimaryNavigationMenuLink from './PrimaryNavigationMenuLink'

class PrimaryNavigationMenu extends Component {
  render() {
    return (
      <ul>
        {this.props.tree.map(function(menuItem, i) {
          if (menuItem.menu_item_children.length>0) {
              return (
                <li key={i}><PrimaryNavigationMenuLink to={menuItem.url} label={menuItem.title}/>
                  <ul>
                      {menuItem.menu_item_children.map(function(subMenu, i) {
                          return <li key={i}><PrimaryNavigationMenuLink to={menuItem.url} label={menuItem.title}/></li>;
                      })}
                  </ul>
                </li>
              )
          } else {
            return (
              <li key={i}><PrimaryNavigationMenuLink to={menuItem.url} label={menuItem.title}/></li>
            )
          }
        })}
      </ul> 
    )
  }
}

export default PrimaryNavigationMenu