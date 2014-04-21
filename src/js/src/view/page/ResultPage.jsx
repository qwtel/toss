/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'view/page/Result',
  'view/page/History'
], function (_, React, Result, History) {
  return React.createClass({
    render: function () {
      return (
        <div id="main-page" className="page padding-top">
          <header>
            <History
            num={this.props.num}
            history={this.props.history}
            />
          </header>

          <section>
            <Result
            res={this.props.res}
            num={this.props.num}
            dict={this.props.dict}
            />
          </section>

          <footer>
            <a className="item-btn" onClick={this.props.onClick}>
              { this.props.num === 2 ? 'Toss' : 'Roll' }
            </a>
          </footer>
        </div>);
    }
  });
});
