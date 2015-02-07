var Time = (function(window, document, undefined) {
    "use strict";

      function _toMinutes(seconds) {
        var minutes = seconds / 60
        return Math.round(minutes * 100) / 100;
      }
                    
      return {
        toMinutes: _toMinutes
      }
}(window, document));
