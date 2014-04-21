/** @jsx React.DOM */

define([
  'react',
  'view/page/History'
], function (React, History) {
  return React.createClass({
    render: function () {
      return (
        <div id="card" className="spin">
          <div className="front">
            <div className="page">
              <header>
                <History
                num={this.props.num}
                history={this.props.history}
                />
              </header>
              <footer>
                <a className="item-btn" onClick={this.props.onClick}>
                Stop
                </a>
              </footer>
            </div>
          </div>
          <div className="back">
            <div className="page">
              <header>
                <History
                num={this.props.num}
                history={this.props.history}
                />
              </header>
              <footer>
                <a className="item-btn" onClick={this.props.onClick}>
                Stop
                </a>
              </footer>
            </div>
          </div>
        </div>);
    }
  });
});
