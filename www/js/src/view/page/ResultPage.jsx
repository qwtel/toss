/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'view/component/Dice',
  'view/component/Result',
  'view/component/History',
  'pages'
], function (_, React, Dice, Result, History, PAGE) {
  return React.createClass({
    render: function () {

      //var style = mix.bg((this.props.num / 2) / 11);
      //var styleFooter = mix.mix((this.props.num) / 11);

      var footer = (
        <footer className="item-btn">
          <a className={"item-btn rest shade-" + (this.props.num - 1)} onClick={this.props.onClick}>
              { this.props.num === 2 ? 'Toss' : 'Roll' }
          </a>
        </footer>);

      return (
        <div className="page padding-top">
          <header>
            <Dice num={this.props.num} href={'#/' + PAGE.DICE + '/' + this.props.num} />
          </header>

          <section>
            <Result
            res={this.props.res}
            num={this.props.num}
            dict={this.props.dict}
            history={this.props.history}
            />
          </section>

          {footer}
        </div>);
    }
  });
});
