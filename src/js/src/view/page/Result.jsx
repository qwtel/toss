define([
  'react',
  'coin',
  'numbers'
], function (React, COIN, NUMBER) {
  return React.createClass({
    propTypes: {
      num: React.PropTypes.number,
      res: React.PropTypes.number,
      dict: React.PropTypes.object
    },

    render: function () {
      var number = NUMBER;
      if (this.props.num === 2) {
        number = COIN;
      }

      var content = <span className="icon">{this.props.res}</span>;
      if (this.props.num === 2 && this.props.res == 2) {
        content = <span className="glyphicon glyphicon-user" />;
      }

      var result;
      if (this.props.res) {
        var resText = number[this.props.res];
        if (this.props.dict[this.props.res]) {
          resText = '"' + this.props.dict[this.props.res] + '"';
        }

        result = [
          <div className="name center-child">
            <p>{resText}</p>
          </div>,
          <div className="result">
            {content}
          </div>,
          <div className="chance center-child">
            <div>
              <p className="small-text">Based on a</p>
              <p>1/{this.props.num}</p>
              <p className="small-text">Chance</p>
            </div>
          </div>
        ];
      }

      return (
        <div id="result">
          {result}
        </div>);
    }
  });
});
