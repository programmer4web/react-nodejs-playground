import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ContentTabs extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, {selected: 0}, props);
  }

  selectedChanged(idx) {
    const value = idx;
    if(!value) {
      console.warn('My tabs selectedChanged without idx of tab.');
    }
    this.setState({selected: idx});
  }

  render() {
    const children = this.props.children,
     header = children && children[0],
     tabs = children.slice(1);

    return (
      <div className="content-tabs">
        {header && header}

        { tabs && tabs.map((tab, idx) => {
          let className = "content-tabs-tab";
          if(this.state.selected == idx) {
            className+= ' selected';
          }
          return (
            <div className={className}  ref={`tab-content-${idx}`} key={`tab-content-${idx}`}>
              {tab.props.children}
            </div>
        )})
        }
      </div>
    )
  }
}

class ContentTabsHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content-tabs-header">
        {this.props.children.map((tabHeaderEl, idx) => {
          return (<div className="content-tabs-name" key={`content-tabs-name-${tabHeaderEl.props.dataId}`}
            onClick={(e) => this.props.selectedChanged(idx, e) }>
            {tabHeaderEl.props.children}
            </div>
          );
        })}
      </div>
    )
  }
}

export {ContentTabs, ContentTabsHeader}

ContentTabs.propTypes = {
  children: PropTypes.array,
  selectedChanged: PropTypes.func
}

ContentTabsHeader.propTypes = {
  children: PropTypes.array,
  selectedChanged: PropTypes.func
}
