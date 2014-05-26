/** @jsx React.DOM */

define([
  'react',
  'scalaish/Option'
], function (React, __Option__) {
  var Option = __Option__.Option;

  return React.createClass({
    propTypes: {
      num: React.PropTypes.number.isRequired,
      history: React.PropTypes.array
    },

    render: function () {
      var history =
        Option(this.props.history)
          .map(function (history) {
            return history.map(function (num, j) {

              var content = this.props.num === 2 && num === 2 ?
                <span className="glyphicon glyphicon-user" /> :
                <span className="icon">{num}</span>;

              var shade = Math.round((num - 1) / (this.props.num - 1) * 11);

              return (
                <div key={'history-' + j} className={"left shade-" + shade}>
                  {content}
                </div>);

            }, this)
          }, this)
          .orNull();

      var width = (history.length) * 20;
      var mq = window.matchMedia("(min-aspect-ratio: 1/1)");
      var style = mq.matches ?
      { width: width + 'vh' } :
      { width: width + 'vw' };

      return (
        <div id="history" className="item-btn">
          <div style={style} onTouchMove={function (e) {
            e.stopPropagation()
          }}>
            {history}
          </div>
        </div>);
    }
  });
});