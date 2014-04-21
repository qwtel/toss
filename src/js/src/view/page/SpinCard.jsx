/** @jsx React.DOM */

define([
  'underscore',
  'react',
  'view/page/ResultPage',
  'pages',
  'coin',
  'numbers'
], function (_, React, ResultPage, PAGE, COIN, NUMBER) {
  var animationDuration = 500;

  return React.createClass({
    getInitialState: function () {
      return {
        count: 0,
        frontStack: [],
        backStack: [],
        frontStackPointer: 0,
        backStackPointer: 0
      };
    },

    componentDidMount: function () {
      setTimeout(function () {

        var allThis = function () {
          console.log('tick');

          var current = (this.state.count + 1) % this.props.num;

          var swap = function(prev, next) {
            // hide prev
            //console.log('hide', prev);
            this.refs['face-' + prev].getDOMNode().style.opacity = "0";

            // show next
            //console.log('show', next);
            this.refs['face-' + next].getDOMNode().style.opacity = "1";
          }.bind(this);

          // TODO: Make this better
          var prev, next;
          if (current % 2 !== 0) {
            prev = this.state.frontStackPointer;
            next = ((this.state.frontStackPointer + 1) % this.state.frontStack.length);
            this.state.frontStackPointer = next;
            swap(this.state.frontStack[prev], this.state.frontStack[next]);
          }
          else {
            prev = this.state.backStackPointer;
            next = ((this.state.backStackPointer + 1) % this.state.backStack.length);
            this.state.backStackPointer = next;
            swap(this.state.backStack[prev], this.state.backStack[next]);
          }

          this.setState({
            count: current
          });

        }.bind(this);

        allThis();
        this.interval = setInterval(allThis, animationDuration / 2);

      }.bind(this), animationDuration / 4);
    },

    componentWillUnmount: function () {
      console.log("clear interval");
      clearInterval(this.interval);
    },

    render: function () {
      var faces = _.range(0, this.props.num).map(function (i) {
        var classes;

        if (i % 2 === 0) {
          classes = 'front';
          this.state.frontStack.push(i);
        } else {
          classes = 'back';
          this.state.backStack.push(i);
        }

        var style = {opacity: 0};
        if (i === 0 || i === 1) {
          style = {opacity: 1};
        }

        return (
          <div key={'face-' + i} className={classes} ref={'face-' + i} style={style}>
            <ResultPage
            num={this.props.num}
            res={i + 1}
            history={this.props.history}
            dict={this.props.dict}
            />
          </div>);
      }, this);


      return (
        <div id="card" className="spin">
          {faces}
        </div>);
    }
  });
});
