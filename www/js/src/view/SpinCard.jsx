/** @jsx React.DOM */

define([
  'react',
  'view/component/Dice'
], function (React, Dice) {
  return React.createClass({
    render: function () {
      
      var text = 'Roll';
      if (this.props.num === 2) {
        text = 'Toss';
      }
      
      var footer1 = (
        <footer className="item-btn">
          <span className={"item-btn rest shade-" + (this.props.num - 1)}>
          {text}
          </span>
        </footer>);

      var footer2 = (
        <footer className="item-btn">
          <span className={"item-btn rest shade-" + (this.props.num - 1)}>
          {text}
          </span>
        </footer>);

      return (
        <div>
          <div className="front">
            <div className="page">
              <header>
                <Dice num={this.props.num} />
              </header>
              {footer1}
            </div>
          </div>
          <div className="back">
            <div className="page">
              <header>
                <Dice num={this.props.num} />
              </header>
              {footer2}
            </div>
          </div>
        </div>);
    }
  });
});
