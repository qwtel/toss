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
        page: PAGE.DICE,
        spin: 0,
        num: 2,
        res: null,
        history: [],
        dict: {},
        anim: false
      };
    },

    setPage: function (page) {
      if (this.state.page !== page) {
        var pagePrev = this.state.page; 
        var obj = {
          pagePrev: pagePrev,
          page: page,
          spin: this.state.spin + 1
        };
        
        obj.anim = false;
        if (page === PAGE.HOME && pagePrev === PAGE.DICE) {
          obj.anim = 'backward';
        }
        else if (page === PAGE.DICE && pagePrev === PAGE.HOME) {
          obj.anim = 'forward';
        } 
        else if (page === PAGE.DICE && pagePrev === PAGE.RESULT) {
          obj.anim = 'backward';
        }
        
        this.setState(obj);

        if (obj.anim !== false) {
          setTimeout(function () {
            this.setState({anim: false});
          }.bind(this), 499);
        }
      }
    },

    configRoutes: function () {
      var routes = {};

      routes[PAGE.HOME] = function () {
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

    componentDidMount: function () {
      this.configRoutes();
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

    firstToss: function () {
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

    renderPage: function (name, key) {
      var page;
      switch (name) {

        case PAGE.HOME:
          page = <MainPage 
            key={key}
          />;
          break;

        case PAGE.DICE:
          page =
            <TossPage
            key={key}
            num={this.state.num}
            dict={this.state.dict}
            onClick={this.firstToss}
            onChange={this.onChange}
            />;
          break;

        case PAGE.RESULT:
          page =
            <ResultPage
            key={key}
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

    componentDidUpdate: function () {
      if (this.state.anim) {
        var el = this.refs.cardOff.getDOMNode();
        var className = this.state.anim === 'forward' ? 'flipped' : 'flipped-back';
        if (el.classList)
          el.classList.add(className);
        else
          el.className += ' ' + className;
      }
    },

    render: function () {
      //console.log('AppView: render');

      var card, cardOff, onClick;

      if (this.state.page !== PAGE.TOSS) {
        var page = this.renderPage(this.state.page, '');
        
        var pagePrev = '';
        if (this.state.pagePrev !== null) {
          pagePrev = this.renderPage(this.state.pagePrev, 'prev');
        }

        var classes1 = "card off";
        var classes2 = "card";
        if (this.state.anim) {
          // switch cards
          classes1 = "card";
          classes2 = "card off";
        }

        cardOff =
          <div className={classes1} ref="cardOff">
            <div className="front">
            {page}
            </div>
            <div className="back">
            {pagePrev}
            </div>
          </div>;

        page = this.renderPage(this.state.page, 'off');
        card =
          <div className={classes2} ref="card">
            <div className="back">
              {page}
            </div>
          </div>;
      }
      else {
        onClick = this.rand;
        cardOff = '';
        card =
          <div className='card spin' ref="cardOff">
            <SpinCard
            history={this.state.history}
            dict={this.state.dict}
            num={this.state.num}
            dict={this.state.dict}
            />
          </div>;
      }

      return (
        <div id="app" onClick={onClick}>
          {cardOff}
          {card}
        </div>);
    }
  });
});