/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'coin',
  'numbers',
  'view/component/Dice'
], function (_, React, PAGE, COIN, NUMBER, Dice) {
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

      var items = _.range(1, this.props.num + 1).map(function (i, j) {
        var content = <span className="icon">{i}</span>;
        if (this.props.num === 2 && i == 2) {
          content = <span className="glyphicon glyphicon-user" />;
        }

        var dictText = '';
        if (this.props.dict.hasOwnProperty(i)) {
          dictText = this.props.dict[i];
        }

        return (
          <div key={this.props.key + i} className="item">
            <div className={"item-btn shade-" + (j)}>
              <div className="left">
                {content}
              </div>
              <div className="rest">
                <input
                type="text"
                tabIndex={j + 1}
                ref={'input-' + i}
                placeholder={number[i]}
                value={dictText}
                onChange={this.onChange.bind(this, i)}
                />
              </div>
            </div>
          </div>);
      }, this);

      var footer = (
        <footer className="item-btn">
          <a className={"item-btn rest shade-" + (this.props.num - 1)} onClick={this.props.onClick}>
          {text}
          </a>
        </footer>);

      return (
        <div className="page">
          <header>
            <Dice num={this.props.num} href={'#/' + PAGE.HOME} />
          </header>
          <div className="list padding-bottom">
            {items}
          </div>
          {footer}
        </div>);
    }
  });
});
