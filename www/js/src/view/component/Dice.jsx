define([
  'react',
  'pages',
  'mix'
], function(React, PAGE, mix) {
  return React.createClass({
    propTypes: {
      num: React.PropTypes.number.isRequired,
      href: React.PropTypes.string
    },

    render: function() {
      //var style = mix.mix((this.props.num - 2) / 7);

      var text = 'Dice';
      if (this.props.num  == 2) {
        text = 'Coin';
      }

      return (
        <div className="item">
          <a className={"item-btn shade-" + (this.props.num - 1)} href={this.props.href}>
            <span className="left">
              <img src={'img/polygon-' + this.props.num + '.svg'}/>
            </span>
            <span className="right">{this.props.num}</span>
            <span className="rest">{text}</span>
          </a>
        </div>);
    }
  })
});