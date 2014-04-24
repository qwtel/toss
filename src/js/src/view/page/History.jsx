define([
  'react',
  'less',
  'mix'
], function (React, Less, mix) {
  return React.createClass({
    propTypes: {
      num: React.PropTypes.number,
      history: React.PropTypes.array
    },

    render: function () {
      var history;
      if (this.props.history != null) {
        history = _.tail(this.props.history).map(function (i) {

          var content = <span className="icon">{i}</span>;
          if (this.props.num === 2 && i == 2) {
            content = <span className="glyphicon glyphicon-user" />;
          }

          var style = mix.mix((i - 1) / 11);

          return (
            <div className="c c1" style={style}>
              <span className="item-btn">
              {content}
              </span>
            </div>);
        }, this);
      }

      var width = history.length * 25;

      var style = { width: width + 'vw' };
      var mq = window.matchMedia("(min-aspect-ratio: 1/1)");
      if (mq.matches) {
        style = { width: width + 'vh' };
      }

      return (
        <div id="history" className="item face">
          <div style={style}>
            {history}
          </div>
        </div>);
    }
  });
});