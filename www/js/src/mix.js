define([
  'less',
  'colors'
], function (Less, COLOR) {
  var color1 = new Less.tree.Color(COLOR.color1);
  var color2 = new Less.tree.Color(COLOR.color2);

  var cache = {};
  var cache2 = {};

  return {
    mix: function (num) {
      var key = Math.round(100 * num);
      if (!cache.hasOwnProperty(key)) {
        var weight = new (Less.tree.Dimension)(key);
        var c = Less.tree.functions.mix(color2, color1, weight);
        cache[key] = {
          backgroundColor: c.toRGB()
        };
      }
      return cache[key];
    },
    bg: function (num) {
      var key = Math.round(100 * num);
      if (!cache2.hasOwnProperty(key)) {
        var weight = new (Less.tree.Dimension)(key);
        var c = Less.tree.functions.mix(color2, color1, weight);
        weight = new (Less.tree.Dimension)(20);
        var bg = Less.tree.functions.lighten(c, weight);
        cache2[key] = {
          backgroundColor: bg.toRGB()
        };
      }
      return cache2[key];
    }
  };
});