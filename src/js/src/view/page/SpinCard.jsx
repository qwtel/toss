/** @jsx React.DOM */

define([
  'react',
  'mix',
  'view/page/History'
], function (React, mix, History) {
  return React.createClass({
    render: function () {
      var style = mix.bg((this.props.num / 2) / 11);
      var styleFooter = mix.mix((this.props.num) / 11);
      return (
        <div id="card" className="spin">
          <div className="front">
            <div className="page" style={style}>
              <header>
                <History
                num={this.props.num}
                history={this.props.history}
                />
              </header>
              <footer style={styleFooter}>
                <a className="item-btn" onClick={this.props.onClick}>
                Stop
                </a>
              </footer>
            </div>
          </div>
          <div className="back">
            <div className="page" style={style}>
              <header>
                <History
                num={this.props.num}
                history={this.props.history}
                />
              </header>
              <footer style={styleFooter}>
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
