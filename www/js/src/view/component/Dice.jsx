define([
  'react',
  'polygon'
], function(React, POLYGON) {
  return React.createClass({
    propTypes: {
      num: React.PropTypes.number.isRequired,
      href: React.PropTypes.string
    },

    render: function() {
      var text = 'Dice';
      if (this.props.num  == 2) {
        text = 'Coin';
      }

      return (
        <div className="item">
          <a className={"item-btn shade-" + (this.props.num - 1)} href={this.props.href}>
            <span className="polygon left">{POLYGON[this.props.num]}</span>
            <span className="right">{this.props.num}</span>
            <span className="rest">{text}</span>
          </a>
        </div>);
    }
  })
});