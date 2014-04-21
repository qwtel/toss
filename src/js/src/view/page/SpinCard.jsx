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
        fCount: 0,
        bCount: 1
      };
    },

    componentDidMount: function () {
      setTimeout(function () {

        var swap = function(front, prev, next) {
          this.refs[front + '-' + prev].getDOMNode().style.opacity = "0";
          this.refs[front + '-' + next].getDOMNode().style.opacity = "1";
        }.bind(this);

        var allThis = function () {
          var current = this.state.count + 1;

          var next;
          if (current % 2 !== 0) {
            next = (this.state.fCount + 2) % this.props.num;
            swap('front', this.state.fCount, next);

            //this.setState({
            this.state.count = current;
            this.state.fCount = next;
            //});
          }

          else {
            next = (this.state.bCount + 2) % this.props.num;
            swap('back', this.state.bCount, next);

            //this.setState({
            this.state.count = current;
            this.state.bCount = next;
            //});
          }

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
      /*
       var faces = _.range(0, this.props.num).map(function (i) {

       var classes = '';
       var style = { opacity: 0 };

       if (i === this.state.fCount) {
       //classes = 'front';
       style = {
       webkitTransform: '',
       opacity: 1
       };
       } else if (i === this.state.bCount) {
       style = {
       webkitTransform: rotateY(180deg)'',
       opacity: 1
       };
       }
       */

      var fuckFun = function (front) {
        return _.range(0, this.props.num).map(function (i) {

          var style = {opacity: 0};
          if ((front == 'front' && i === 0) || (front == 'back' && i === 1)) {
            style = {opacity: 1};
          }

          return (
            <div className={front} style={style} ref={front + '-' + i} >
              <ResultPage
              num={this.props.num}
              res={i + 1}
              history={this.props.history}
              dict={this.props.dict}
              />
            </div>);
        }, this);
      }.bind(this);

      var faces = _.union(fuckFun('front'), fuckFun('back'));

      return (
        <div id="card" className="spin">
          {faces}
        </div>);
    }
  });
});
