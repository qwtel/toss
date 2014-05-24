/** @jsx React.DOM */

define([
  'react',
  'polygon',
  'scalaish/Option'
], function (React, POLYGON, __Option__) {

  var Option = __Option__.Option;
  var Some = __Option__.Some;

  return React.createClass({
    propTypes: {
      num: React.PropTypes.number.isRequired,
      href: React.PropTypes.string,
      icon: React.PropTypes.component,
      shade: React.PropTypes.number,
      inv: React.PropTypes.bool
    },

    render: function () {
      var text = this.props.num === 2 ? 'Coin' : 'Dice';

      var icon = Option(this.props.icon)
        .getOrElse(<span className="polygon">{POLYGON[this.props.num]}</span>);

      var shade = Option(this.props.shade)
        .orElse(Some(this.props.num - 1))
        .map(function (s) {
          return 'shade-' + s
        })
        .get();

      var inv = Option(this.props.inv)
        .map(function(shouldInv) {
          return shouldInv ? 'inv' : ''
        })
        .getOrElse('');

      return (
        <div className="item">
          <a className={"item-btn " + shade + " " + inv} href={this.props.href}>
            <span className="left">{icon}</span>
            <span className="right">{this.props.num}</span>
            <span className="rest">{text}</span>
          </a>
        </div>);
    }
  })
});