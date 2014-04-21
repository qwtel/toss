/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'coin',
  'numbers'
], function (_, React, PAGE, COIN, NUMBER) {
  return React.createClass({
    onChange: function(i, e) {
      this.props.onChange(i, e.target.value);
    },

    render: function () {

      var text = 'Roll';
      var number = NUMBER;
      if (this.props.num === 2) {
        text = 'Toss';
        number = COIN;
      }

      var items = _.range(1, this.props.num + 1).reverse().map(function (i) {
        var content = <span className="icon">{i}</span>;
        if (this.props.num === 2 && i == 2) {
          content = <span className="glyphicon glyphicon-user" />;
        }

        var dictText = '';
        if (this.props.dict.hasOwnProperty(i)) {
          dictText = this.props.dict[i];
        }

        return (
          <div key={i} className="item face item-color-2">
            <div className="c c1">
              <span className="item-btn">
              {content}
              </span>
             </div>
            <input
            type="text"
            ref={'input-'+i}
            className="c c2 pull-left"
            placeholder={number[i]}
            value={dictText}
            onChange={this.onChange.bind(this, i)} />
          </div>);
      }, this);

      var header = (
        <header>
          <a className="item-btn" onClick={this.props.onClick}>
          {text}
          </a>
        </header>);

      return (
        <div id="main-page" className="page">
          {header}
          <div className="list padding-top">
            {items}
          </div>
        </div>);
    }
  });
});
