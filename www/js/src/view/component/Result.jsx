/** @jsx React.DOM */

define([
  'react',
  'coin',
  'numbers',
  'view/component/History',
  'scalaish/Option'
], function (React, COIN, NUMBER, History, __Option__) {

  var Option = __Option__.Option;

  return React.createClass({
    propTypes: {

      /**
       * The currently selected dice (2..12)
       */
      num: React.PropTypes.number,

      /**
       * The result of the last roll
       */
      res: React.PropTypes.number,

      /**
       * A dictionary of hints for each num (2..num)
       */
      dict: React.PropTypes.object,

      /**
       * The last x results
       */
      history: React.PropTypes.array
    },

    render: function () {
      var result = Option(this.props.res)
        .map(function (res) {

          var number = this.props.num === 2 ? COIN : NUMBER;

          var content = this.props.num === 2 && this.props.res === 2 ?
            <span className="glyphicon glyphicon-user" /> :
            <span className="icon">{this.props.res}</span>;

          var resText = Option(this.props.dict[res])
            .filter(function(word) {
              return word !== ''
            })
            .map(function (word) {
              return '"' + word + '"'
            })
            .getOrElse(number[res]);

          return (
            <div className="bla">
              <div className="name center-child">
                <p>{resText}</p>
              </div>
              <div className="result">
                {content}
              </div>
              <div className="chance center-child">
                <div>
                  <p className="small-text">Based on a</p>
                  <p>1/{this.props.num}</p>
                  <p className="small-text">Chance</p>
                </div>
              </div>
            </div>);
        }, this)
        .orNull();

      var shade = Math.round((this.props.res - 1) / (this.props.num - 1) * 11);

      return (
        <div id="result" className={'shade-' + shade}>
          {result}
          <History
          num={this.props.num}
          history={this.props.history}
          />
        </div>);
    }
  });
});
