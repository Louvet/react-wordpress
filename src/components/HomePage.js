import React, { Component } from 'react'

import PageFooter from '../components/PageFooter'
import GSAP from 'react-gsap-enhancer';
import TweenMax from 'gsap/TweenMax';
import TransitionGroup from 'react-addons-transition-group'

class Box extends Component {
  componentWillEnter (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 1, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  }

  render () {
    return <div className="box" ref={c => this.container = c}/>;
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.onPageClickHandler = this.onPageClickHandler.bind(this)

    this.state = {
      shouldShowBox: true
    }
  }

  onPageClickHandler(e) {
    this.setState({
      shouldShowBox: !this.state.shouldShowBox
    })
  }

  render() {
    const { pageData } = this.props

    return (
      
        <div className="page" onClick={this.onPageClickHandler}>
          <TransitionGroup component="div">
          { this.state.shouldShowBox && pageData &&
          <Box>
            { pageData.thumbnail &&  
            <div dangerouslySetInnerHTML={{ __html: pageData.thumbnail }}></div>}

            <header>
            <h1>{pageData.title}</h1>
            </header>
            
            <div dangerouslySetInnerHTML={{ __html: pageData.content }}></div>
        
            <footer>
              Publié le {pageData.publication}
            </footer>  
          </Box>}
      </TransitionGroup>
          <PageFooter/>
        </div>
    )
  }
}

export default GSAP()(HomePage)