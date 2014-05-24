/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'coin',
  'numbers',
  'view/component/List',
  'view/component/Dice',
  'scalaish/Option'
], function (_, React, PAGE, COIN, NUMBER, List, Dice, __Option__) {
  var Option = __Option__.Option;

  return React.createClass({

    onChange: function (i, e) {
      this.props.onChange(i, e.target.value);
      this.props.setDictDirty();
    },

    onKeyUp: function (e) {
      if (e.keyCode === 13) {
        this.props.onClick();
      }
    },

    render: function () {

      var textNumber = this.props.num === 2 ? ['Toss', COIN] : ['Roll', NUMBER];

      var items = _.range(1, this.props.num + 1)
        .map(function (num, j) {

          var content = this.props.num === 2 && num === 2 ?
            <span className="glyphicon glyphicon-user" /> :
            <span className="icon">{num}</span>;

          var dictText = Option(this.props.dict[num]).getOrElse('');

          var shade = Math.round((num - 1) / (this.props.num - 1) * 11);

          return (
            <div key={this.props.key + num} className="item">
              <div className={"item-btn shade-" + (shade)}>
                <div className="left">
                {content}
                </div>
                <div className="rest">
                  <input
                  type="text"
                  tabIndex={this.props.withoutTabIndex ? null : j + 1}
                  ref={'input-' + num}
                  placeholder={textNumber[1][num]}
                  value={dictText}
                  onChange={this.onChange.bind(this, num)}
                  onKeyUp={this.onKeyUp}
                  />
                </div>
              </div>
            </div>);
        }, this);

      var clearButton = (this.props.dictDirty) ?
        <div className="item">
          <a className={"item-btn shade-clear"} onClick={this.props.clear}>
            Clear
          </a>
        </div> : null;

      var header =
        <header>
          <Dice
          num={this.props.num}
          href={'#/' + PAGE.HOME}
          icon={<span className="glyphicon glyphicon-align-justify"/>}
          inv={true}
          />
        </header>;

      var footer =
        <footer className="item-btn">
          <a className={"item-btn rest inv shade-" + (this.props.num - 1)} onClick={this.props.onClick}>
          {textNumber[0]}
          </a>
        </footer>;

      return (
        <div className="page">
          {header}
          <List className="padding-bottom">
            {items}
            {clearButton}
          </List>
          {footer}
        </div>);
    }
  });
});
