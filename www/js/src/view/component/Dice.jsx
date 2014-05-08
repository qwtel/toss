define([
  'react',
  'polygon'
], function(React, POLYGON) {
  return React.createClass({
    propTypes: {
      num: React.PropTypes.number.isRequired,
      href: React.PropTypes.string,
      icon: React.PropTypes.component
    },

    render: function() {
      var text = 'Dice';
      if (this.props.num  == 2) {
        text = 'Coin';
      }
      
      var icon;
      if (!this.props.hasOwnProperty('icon')) {
        icon = <span className="polygon">{POLYGON[this.props.num]}</span>;
      } else {
        icon = this.props.icon;
      }

      return (
        <div className="item">
          <a className={"item-btn shade-" + (this.props.num - 1)} href={this.props.href}>
            <span className="left">{icon}</span>
            <span className="right">{this.props.num}</span>
            <span className="rest">{text}</span>
          </a>
        </div>);
    }
  })
});