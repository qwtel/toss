/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'coin',
  'numbers'
], function (_, React, PAGE, COIN, NUMBER) {
  return React.createClass({
    render: function () {

      var text = 'Roll';
      var number = NUMBER;
      if (this.props.num === 2) {
        text = 'Toss';
        number = COIN;
      }

      var header;
      if (this.props.history != null) {
        var history = _.tail(_.take(this.props.history, 101)).map(function (i) {
          var content = <span className="icon">{i}</span>;
          if (this.props.num === 2 && i == 2) {
            content = <span className="glyphicon glyphicon-user" />;
          }
          return (
            <div className="c c1">
              <span className="item-btn">
              {content}
              </span>
            </div>);
        }, this);

        header =
          <header>
            <div id="history" className="item face item-color-2">
              <div>
                {history}
              </div>
            </div>
          </header>;
      }

      var footer =
        <footer>
          <a className="item-btn" onClick={this.props.onClick}>
          {text}
          </a>
        </footer>;

      var content = <span className="icon">{this.props.res}</span>;
      if (this.props.num === 2 && this.props.res == 2) {
        content = <span className="glyphicon glyphicon-user" />;
      }

      if (this.props.res) {

        var resText = number[this.props.res];
        if (this.props.dict[this.props.res]) {
          resText = '"'+this.props.dict[this.props.res]+'"';
        }

        var result =
          <div id="result">
            <div className="name">
            {resText}
            </div>
            <div className="result">
            {content}
            </div>
            <div className="chance">
              <p className="small-text">Based on a</p>
              <p>1/{this.props.num}</p>
              <p className="small-text">Chance</p>
            </div>
          </div>;
      }

      return (
        <div id="main-page" className="page padding-top">
          {header}
          {result}
          {footer}
        </div>);
    }
  });
});
