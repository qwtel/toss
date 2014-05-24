/** @jsx React.DOM */

define([
  'react',
  'view/component/Dice'
], function (React, Dice) {
  return React.createClass({
    render: function () {

      var text = this.props.num === 2 ? 'Toss' : 'Roll';

      var footer1 =
        <footer className="item-btn">
          <span className={"item-btn rest inv shade-" + (this.props.num - 1)}>
          {text}
          </span>
        </footer>;

      var footer2 =
        <footer className="item-btn">
          <span className={"item-btn rest inv shade-" + (this.props.num - 1)}>
          {text}
          </span>
        </footer>;

      return (
        <div>
          <div className="front">
            <div className="page">
              <header>
                <Dice
                num={this.props.num}
                inv={true}
                />
              </header>
              {footer1}
            </div>
          </div>
          <div className="back">
            <div className="page">
              <header>
                <Dice
                num={this.props.num}
                inv={true}
                />
              </header>
              {footer2}
            </div>
          </div>
        </div>);
    }
  });
});
