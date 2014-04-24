/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'mix',
  'pages',
  'coin',
  'numbers'
], function (_, React, mix, PAGE, COIN, NUMBER) {
  return React.createClass({
    onChange: function (i, e) {
      this.props.onChange(i, e.target.value);
    },

    render: function () {

      var text = 'Roll';
      var number = NUMBER;
      if (this.props.num === 2) {
        text = 'Toss';
        number = COIN;
      }

      var items = _.range(1, this.props.num + 1).reverse().map(function (i, j) {
        var content = <span className="icon">{i}</span>;
        if (this.props.num === 2 && i == 2) {
          content = <span className="glyphicon glyphicon-user" />;
        }

        var dictText = '';
        if (this.props.dict.hasOwnProperty(i)) {
          dictText = this.props.dict[i];
        }

        var style = mix.mix((this.props.num - 1 - j) / 11);

        return (
          <div key={i} className="item face" style={style}>
            <div className="c1">
              <span className="item-btn">
              {content}
              </span>
            </div>
            <div className="c2">
              <input
              type="text"
              tabIndex={j + 1}
              ref={'input-' + i}
              placeholder={number[i]}
              value={dictText}
              onChange={this.onChange.bind(this, i)} />
            </div>
          </div>);
      }, this);

      var styleFooter = mix.mix((this.props.num) / 11);
      var footer = (
        <footer style={styleFooter}>
          <a className="item-btn" onClick={this.props.onClick}>
          {text}
          </a>
        </footer>);

      var style = mix.bg((this.props.num) / 11);

      return (
        <div className="page" style={style}>
          <div className="list padding-bottom">
            {items}
          </div>
          {footer}
        </div>);
    }
  });
});
