/** @jsx React.DOM */

define([
  'react',
  'director',
  'pages',
  'view/page/MainPage',
  'view/page/TossPage',
  'view/page/ResultPage',
  'view/page/SpinCard',
], function (React, Router, PAGE, MainPage, TossPage, ResultPage, SpinCard) {
  return React.createClass({
    getInitialState: function () {
      return {
        pagePrev: null,
        page: PAGE.HOME,
        spin: 0,
        num: null,
        res: null,
        history: {},
        dict: {},
      };
    },

    setPage: function (page) {
      if (this.state.page !== page) {
        this.setState({
          pagePrev: this.state.page,
          page: page,
          spin: this.state.spin + 1
        });
      }
    },

    componentDidMount: function () {
      var routes = {};

      routes[PAGE.HOME] = this.setPage.bind(this, PAGE.HOME);

      routes[[PAGE.DICE, ':num', PAGE.RESULT].join('/')] = function (num) {
        this.setState({
          num: Number(num)
        });
        this.setPage(PAGE.RESULT);
      }.bind(this);

      routes[[PAGE.DICE, ':num'].join('/')] = function (num) {
        this.setState({
          num: Number(num)
        });
        this.setPage(PAGE.DICE);
      }.bind(this);

      routes[PAGE.HISTORY] = function () {
        this.setPage(PAGE.HISTORY);
      }.bind(this);

      this.router = Router(routes);
      this.router.init(PAGE.HOME);
    },

    rand: function () {
      // calc
      var min = 1;
      var max = this.state.num;
      var res = Math.floor(Math.random() * (max - min + 1) + min);

      // persist
      if (typeof this.state.history[max] === 'undefined') {
        var string = localStorage.getItem(max);
        if (string != null) {
          this.state.history[max] = JSON.parse(string);
        } else {
          this.state.history[max] = [];
        }
      }

      this.state.history[max].unshift(res);
      localStorage.setItem(max, JSON.stringify(this.state.history[max]));

      // change ui
      this.setState({
        res: res
      });
      this.router.setRoute([PAGE.DICE, this.state.num, PAGE.RESULT].join('/'));
      this.setPage(PAGE.RESULT); // HACK
    },

    toss: function () {
      this.setState({
        page: PAGE.TOSS
      });
    },

    onChange: function (key, value) {
      this.state.dict[key] = value;
      this.setState({
        dict: this.state.dict
      });
    },

    renderPage: function (name) {
      var page;
      switch (name) {

        case PAGE.HOME:
          page = <MainPage />;
          break;

        case PAGE.DICE:
          page =
            <TossPage
            num={this.state.num}
            onClick={this.toss}
            dict={this.state.dict}
            onChange={this.onChange}
            />;
          break;

        case PAGE.RESULT:
          page =
            <ResultPage
            num={this.state.num}
            res={this.state.res}
            onClick={this.toss}
            history={this.state.history[this.state.num]}
            dict={this.state.dict}
            />;
          break;

        case PAGE.HISTORY:
          page =
            <div />;
          break;

      }
      return page;
    },

    render: function () {
      console.log('AppView: render');

      var card, pageFront, pageBack, classes, onClick;

      if (this.state.page !== PAGE.TOSS) {
        onClick = function () {
        };
        var page = this.renderPage(this.state.page);

        var pagePrev = '';
        if (this.state.pagePrev !== null)
          pagePrev = this.renderPage(this.state.pagePrev);

        if (this.state.spin % 2 !== 0) {
          pageFront = page;
          pageBack = pagePrev;
          classes = '';
        } else {
          pageFront = pagePrev;
          pageBack = page;
          classes = 'flipped';
        }

        card =
          <div id="card" className={classes}>
            <div className="front">
              {pageFront}
            </div>
            <div className="back">
              {pageBack}
            </div>
          </div>;
      }
      else {
        onClick = this.rand;
        card =
          <SpinCard
          history={this.state.history[this.state.num]}
          dict={this.state.dict}
          num={this.state.num}
          dict={this.state.dict}
          />
      }

      return (
        <div id="app" onClick={onClick}>
          {card}
        </div>);
    }
  });
});