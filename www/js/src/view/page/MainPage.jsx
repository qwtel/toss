/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'view/component/Dice'
], function (_, React, PAGE, Dice) {
  return React.createClass({
    render: function () {
      var items = _.range(2, 13).map(function (i) {
        return <Dice num={i} href={'#/' + PAGE.DICE + '/' + i} />;
      });

      return (
        <div className="page">
          <div className="list">
            {items}
          </div>
        </div>);
    }
  });
});
