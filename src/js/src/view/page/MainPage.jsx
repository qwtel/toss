/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages'
], function (_, React, PAGE) {
  return React.createClass({
    render: function () {
      var items = _.range(3, 13).map(function (i) {
        return (
          <div className="item item-color-2">
            <a className="item-btn" href={'#/' + PAGE.DICE + '/' + i}>
              <span>Dice</span>
              {' '}
              <span>{i}</span>
            </a>
          </div>);
      });

      return (
        <div id="main-page" className="page">
          <div id="main-page" className="page">
            <div className="list">
              <div className="item item-color-1">
                <a className="item-btn" href={'#/' + PAGE.DICE + '/2'}>
                Coin
                </a>
              </div>
              {items}
            </div>
          </div>
        </div>
        );
    }
  });
});
