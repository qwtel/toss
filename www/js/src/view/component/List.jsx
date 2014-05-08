define([
  'react'
], function (React) {
  return React.createClass({
    ots: function (e) {
      if (!(e.touches && e.touches.length > 1)) {
        var touch = e.targetTouches[0];
        this.startY = touch.pageY;
        this.hack = true;
      }
    },

    hasCorrectBounds: function (e) {
      var y = e.touches[0].pageY;
      var list = this.refs.list.getDOMNode();

      // Prevents scrolling of content to top
      if (list.scrollTop === 0 && this.startY <= y) {
        return false;
      }
      else if (list.scrollHeight - list.offsetHeight === list.scrollTop && this.startY >= y) {
        return false;
      }

      return true;
    },

    otm: function (e) {
      if (!(e.touches && e.touches.length > 1)) {
        // Prevents scrolling of nonbounce element if bound conditions are met

        if (this.hack) {
          this.hack = false;
          
          // HACK
          var list = this.refs.list.getDOMNode();
          if (list.scrollTop === 0) {
            list.scrollTop = list.scrollTop + 1;
          }
          else if (list.scrollHeight - list.offsetHeight === list.scrollTop) {
            list.scrollTop  = list.scrollTop - 1;
          }
        }
        
        if (this.hasCorrectBounds(e)) {
          e.stopPropagation();
        }
      }
    },

    ote: function (e) {
      this.startY = null;
      this.hack = false;
    },

    render: function () {
      return (
        <div
        ref='list'
        className={'list ' + this.props.className}
        onTouchStart={this.ots}
        onTouchMove={this.otm}
        onTouchEnd={this.ote}
        onTouchCancel={this.ote}
        >
          {this.props.children}
        </div>
        );
    }
  });
});