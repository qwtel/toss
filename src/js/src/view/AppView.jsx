define([
  'react',
  'director',
  'pages',
], function (React, Router, PAGE) {
  return React.createClass({
    getInitialState: function () {
      return {
        page: PAGE.HOME
      };
    },

    componentDidMount: function () {
      this.router = Router({
        '': this.setPage.bind(this, PAGE.HOME),
        'home': this.setPage.bind(this, PAGE.HOME),
        'login': this.setPage.bind(this, PAGE.LOGIN)
      });
      this.router.init('');

      var init = this.state.doors.length > 0 ? PAGE.HOME : PAGE.LOGIN;
      this.router.setRoute(init)
    },

    render: function () {
      console.log('AppView: render');

      return (
        <div id='app'/>
        );
    }
  });
});