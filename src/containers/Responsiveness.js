import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import media from '../medias'

import {
  swapMode
} from '../actions'

class Responsiveness extends Component {
  constructor(...args){
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    
    console.log(media)
    const xxs = window.matchMedia('all and (max-width: 479px)');
    const xs = window.matchMedia('all and (min-width: 480px) and (max-width: 767px)');
    const sm = window.matchMedia('all and (min-width: 768px) and (max-width: 1023px)');
    const md = window.matchMedia('all and (min-width: 1024px) and (max-width: 1199px)');
    const lg = window.matchMedia('all and (min-width: 1200px)');

    this.onXXSResponsiveBreakpoint(xxs);
    xxs.addListener(this.onXXSResponsiveBreakpoint.bind(this));

    this.onXSResponsiveBreakpoint(xs);
    xs.addListener(this.onXSResponsiveBreakpoint.bind(this));

    this.onSMResponsiveBreakpoint(sm);
    sm.addListener(this.onSMResponsiveBreakpoint.bind(this));

    this.onMDResponsiveBreakpoint(md);
    md.addListener(this.onMDResponsiveBreakpoint.bind(this));

    this.onLGResponsiveBreakpoint(lg);
    lg.addListener(this.onLGResponsiveBreakpoint.bind(this));
  }

  componentWillUnmount() {
    const xxs = window.matchMedia('all and (max-width: 479px)');
    const xs = window.matchMedia('all and (min-width: 480px) and (max-width: 767px)');
    const sm = window.matchMedia('all and (min-width: 768px) and (max-width: 1023px)');
    const md = window.matchMedia('all and (min-width: 1024px) and (max-width: 1199px)');
    const lg = window.matchMedia('all and (min-width: 1200px)');

    this.onXXSResponsiveBreakpoint(xxs);
    xxs.removeListener(this.onXXSResponsiveBreakpoint.bind(this));

    this.onXSResponsiveBreakpoint(xs);
    xs.removeListener(this.onXSResponsiveBreakpoint.bind(this));

    this.onSMResponsiveBreakpoint(sm);
    sm.removeListener(this.onSMResponsiveBreakpoint.bind(this));

    this.onMDResponsiveBreakpoint(md);
    md.removeListener(this.onMDResponsiveBreakpoint.bind(this));

    this.onLGResponsiveBreakpoint(lg);
    lg.removeListener(this.onLGResponsiveBreakpoint.bind(this));
  }

  onXXSResponsiveBreakpoint(mediaQuery) {
        if (mediaQuery.matches) {
          this.setState({ mode: 'xxs', mobile: true});
          this.props.dispatch(swapMode('xxs'))
        }
   }

   onXSResponsiveBreakpoint(mediaQuery) {
        if (mediaQuery.matches) {
            this.setState({ mode: 'xs', mobile: true});
        }
   }

   onSMResponsiveBreakpoint(mediaQuery) {
        if (mediaQuery.matches) {
            this.setState({ mode: 'sm', mobile: true});
        }
   }

   onMDResponsiveBreakpoint(mediaQuery) {
        if (mediaQuery.matches) {
            if(null != navigator.userAgent.match(/iPad/i)) {
                this.setState({ mode: 'md', mobile: true});
            } else {
                this.setState({ mode: 'md', mobile: false});
            }
        }
   }

   onLGResponsiveBreakpoint(mediaQuery) {
        if (mediaQuery.matches) {
            this.setState({ mode: 'lg', mobile: false});
        }
   }

  render() {
    const { responsiveMode } = this.props
    console.log('ici', responsiveMode)
    return (
      <div className={this.state.mobile ? ('mobile ' + responsiveMode.mode) : (responsiveMode.mode)}>
        {this.props.children}
      </div>
    );
  }
}

Responsiveness.propTypes = {
  responsiveMode: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { responsiveMode } = state

  return {
    responsiveMode
  }
}

export default connect(mapStateToProps)(Responsiveness)