/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'mix',
  'pages'
], function (_, React, mix, PAGE) {
  return React.createClass({
    render: function () {
      var items = _.range(3, 13).map(function (i, j) {
        var style = mix.mix((j + 1) / 10);
        return (
          <div className="item" style={style}>
            <a className="item-btn" href={'#/' + PAGE.DICE + '/' + i}>
              <span>Dice</span>
              {' '}
              <span>{i}</span>
            </a>
          </div>);
      });

      var style = mix.mix(0);
      return (
        <div id="main-page" className="page">
          <div className="list">
            <div className="item" style={style}>
              <a className="item-btn" href={'#/' + PAGE.DICE + '/2'}>
              Coin
              </a>
            </div>
            {items}
          </div>
        </div>);
    }
  });
});
