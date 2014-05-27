/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'pages',
  'coin',
  'numbers',
  'view/component/List',
  'view/component/Dice',
  'scalaish/Option',
  'scalaish/Tuple'
], function (_, React, PAGE, COIN, NUMBER, List, Dice, __Option__, __T__) {
  var Option = __Option__.Option;
  var T = __T__.T;

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

      // (text, placeholders, range)
      var tuple = this.props.num === 2 ?
        T('Toss', COIN, [2, 1]) :
        T('Roll', NUMBER, _.range(1, this.props.num + 1));

      var items = tuple._3
        .map(function (num, j) {

          var content = this.props.num === 2 && num === 2 ?
            <span className="glyphicon glyphicon-user" /> :
            <span className="icon">{num}</span>;

          var dictText = Option(this.props.dict[num]).getOrElse('');

          var shade = Math.round((num - 1) / (this.props.num - 1) * 11);

          return (
            <div key={this.props.key + num} className="item">
              <div className={"item-btn shade-" + (shade)}>
                <div className="ico left">
                {content}
                </div>
                <div className="rest">
                  <input
                  type="text"
                  tabIndex={this.props.withoutTabIndex ? null : j + 1}
                  ref={'input-' + num}
                  placeholder={tuple._2[num]}
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
          {tuple._1}
          </a>
        </footer>;

      return (
        <div className="page">
          {header}
          <List className="toss padding-bottom">
            {items}
            {clearButton}
          </List>
          {footer}
        </div>);
    }
  });
});
