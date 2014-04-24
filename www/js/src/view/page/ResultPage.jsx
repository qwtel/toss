/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'view/component/Result',
  'view/component/History',
  'mix'
], function (_, React, Result, History, mix) {
  return React.createClass({
    render: function () {

      var style = mix.bg((this.props.num / 2) / 11);
      var styleFooter = mix.mix((this.props.num) / 11);

      return (
        <div className="page padding-top" style={style}>
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

          <footer style={styleFooter}>
            <a className="item-btn" onClick={this.props.onClick}>
              { this.props.num === 2 ? 'Toss' : 'Roll' }
            </a>
          </footer>
        </div>);
    }
  });
});
