/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'view/component/List',
  'view/component/Dice'
], function (_, React, PAGE, List, Dice) {
  return React.createClass({
    render: function () {
      var items = _.range(2, 13).map(function (i) {
        return <Dice key={this.props.key + i} num={i} href={'#/' + PAGE.DICE + '/' + i} />;
      }, this);

      return (
        <div className="page">
          <List>
            {items}
          </List>
        </div>);
    }
  });
});
