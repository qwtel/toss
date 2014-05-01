/** @jsx React.DOM */

define([
  'react',
  'director',
  'pages',
  'view/page/MainPage',
  'view/page/TossPage',
  'view/page/ResultPage',
  'view/SpinCard'
], function (React, Router, PAGE, MainPage, TossPage, ResultPage, SpinCard) {
  return React.createClass({
    getInitialState: function () {
      return {
        pagePrev: null,
        page: PAGE.HOME,
        spin: 0,
        num: null,
        res: null,
        history: [],
        dict: {}
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

    configRoutes: function() {
      var routes = {};

      routes[PAGE.HOME] = function() {
        this.setPage(PAGE.HOME);
      }.bind(this);

      routes[''] = routes[PAGE.HOME];

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

      this.router = Router(routes);
      this.router.init('/' + PAGE.DICE + '/2');
    },

    setRem: function() {
      var docEl = document.documentElement;
      var recalc = function () {

        var mq = window.matchMedia("(min-aspect-ratio: 1/1)");
        var reference;

        if (!mq.matches) {
          reference = docEl.clientWidth;
        } else {
          reference = docEl.clientHeight;
        }

        docEl.style.fontSize = (reference/100) + 'px';
        docEl.style.display = "none";
        docEl.clientWidth; // Force relayout - important to new Androids
        docEl.style.display = "";
      };

      if (!window.matchMedia) return;
      var hasSupportFor = function (unit) {
        var div = document.createElement('div');
        div.setAttribute('style', 'font-size: 1' + unit);
        return (div.style.fontSize == '1' + unit);
      };

      //if (hasSupportFor("vw") && hasSupportFor("vh")) return;
      if (!hasSupportFor("rem")) return;

      window.addEventListener('resize', recalc, false);
      recalc(); // make sure the DOM is loaded at this point.
    },

    componentDidMount: function () {
      this.configRoutes();
      this.setRem();
    },

    getHistory: function () {
      this.state.history = [];
    },

    setHistory: function (res) {
      this.state.history.unshift(res);
    },

    rand: function () {
      // calc
      var min = 1;
      var max = this.state.num;
      var res = Math.floor(Math.random() * (max - min + 1) + min);

      this.setHistory(res);

      // change ui
      this.setState({
        res: res
      });
      this.router.setRoute([PAGE.DICE, this.state.num, PAGE.RESULT].join('/'));
      this.setPage(PAGE.RESULT); // HACK
    },

    firstToss: function() {
      this.getHistory();
      this.toss();
    },

    toss: function () {
      this.setState({
        page: PAGE.TOSS
      });
      return true;
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
            dict={this.state.dict}
            onClick={this.firstToss}
            onChange={this.onChange}
            />;
          break;

        case PAGE.RESULT:
          page =
            <ResultPage
            num={this.state.num}
            res={this.state.res}
            dict={this.state.dict}
            history={this.state.history}
            onClick={this.toss}
            />;
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

        card = page;

        /*
        card =
          <div id="card" className={classes}>
            <div className="front">
              {pageFront}
            </div>
            <div className="back">
              {pageBack}
            </div>
          </div>;
          */
      }
      else {
        onClick = this.rand;
        card =
          <SpinCard
          history={this.state.history}
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