import React, {Component} from 'react';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Tabs">
        <div className="tabs-header">
          <div className="tab-name">Tab 1</div>
          <div className="tab-name">Tab 2</div>
          <div className="tab-name">Tab 3</div>
        </div>
        <div ref="tab-content-1">Content of tab 1</div>
        <div ref="tab-content-2">Content of tab 2</div>
        <div ref="tab-content-3">Content of tab 3</div>
      </div>
    )
  }
}
