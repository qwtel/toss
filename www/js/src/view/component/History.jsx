define([
  'react'
], function (React) {
  return React.createClass({
    propTypes: {
      num: React.PropTypes.number,
      history: React.PropTypes.array
    },
    
    render: function () {
      var history, style;

      if (this.props.history != null) {
        history = this.props.history.map(function (i, j) {

          var content = <span className="icon">{i}</span>;
          if (this.props.num === 2 && i == 2) {
            content = <span className="glyphicon glyphicon-user" />;
          }

          return (
            <div key={'history-' + j} className={"left shade-" + (i - 1)}>
              {content}
            </div>);
        }, this);
      }

      var width = (history.length) * 20;
      style = { width: width + 'vw' };
      var mq = window.matchMedia("(min-aspect-ratio: 1/1)");
      if (mq.matches) {
        style = { width: width + 'vh' };
      }

      return (
        <div id="history" className="item-btn">
          <div style={style} onTouchMove={function(e) {e.stopPropagation()}}>
            {history}
          </div>
        </div>);
    }
  });
});