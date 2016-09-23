"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var AI=function(a){return a.GameTools=function(){var a=function(b){for(var c=!(arguments.length<=1||void 0===arguments[1])&&arguments[1],e=["x","o"],f=0;f<2;++f)if(d(e[f],b))return!!c||e[f]+"-won";for(var g=0;g<9;++g)if("e"===b[g])return!c&&"not-end";return!!c||"draw"},b=function(b,c,d){return b===c+"-won"?10-d:"draw"===b?0:d-10},c=function(b){var c=[];return b.forEach(function(a,b){"e"===a&&c.push(b)}),c},d=function(b,c){for(var d=0;d<3;++d)if(b===c[d]&&b===c[d+3]&&b===c[d+6])return!0;for(var e=0;e<=6;e+=3)if(b===c[e]&&b===c[e+1]&&b===c[e+2])return!0;return b===c[0]&&b===c[4]&&b==c[8]||b===c[2]&&b===c[4]&&b==c[6]},e=function(b,c,d){var e=[];return b.forEach(function(a){e.push(a)}),e[c]=d,e};return{isTerminated:a,getGameScore:b,getAllMoves:c,getBoardAfterSimulatedMove:e}}(),a}(AI||{}),AI=function(a){return a.Action=function a(b){_classCallCheck(this,a),this.move=b,this.boardAfterMove=[],this.score=-1e3},a}(AI||{}),AI=function(a){return a.miniMax=function(){var b=function b(e,f,g,h){var i=arguments.length<=4||void 0===arguments[4]?0:arguments[4],j=a.GameTools.isTerminated(e);if("not-end"!==j){var k=new a.Action(-1);return k.score=a.GameTools.getGameScore(j,g,i),k}var l=a.GameTools.getAllMoves(e),m=[];return l.forEach(function(c){var d=new a.Action(c);d.board=a.GameTools.getBoardAfterSimulatedMove(e,c,f),d.score=b(d.board,"x"===f?"o":"x",g,h,h?i+1:0).score,m.push(d)}),f===g?m.sort(c):m.sort(d),m[0]},c=function(b,c){return c.score-b.score},d=function(b,c){return b.score-c.score};return{calculateValue:b}}(),a}(AI||{}),AI=function(a){return a.Validation=function(){var b=function(b){return"undefined"==typeof b?(console.log("AI ERROR: ai character is undefined!"),!1):(b=b.toLowerCase(),"x"!==b&&"o"!==b?(console.log("AI ERROR: '"+b+"' is not valid ai character!"),!1):b)},c=function(b,c){return"undefined"==typeof b?(console.log("AI ERROR: player character is undefined!"),!1):(b=b.toLowerCase(),"x"!==b&&"o"!==b?(console.log("AI ERROR: '"+b+"' is not valid player character!"),!1):b===c?(console.log("AI ERROR: Player character '"+b+"' cannot be the same as ai character '"+c+"' !"),!1):b)},d=function(b){return"undefined"==typeof b?(console.log("AI ERROR: starting character is undefined!"),!1):(b=b.toLowerCase(),"x"!==b&&"o"!==b?(console.log("AI ERROR: '"+b+"' is not valid starting character!"),!1):b)},e=function(c,d,e){if("undefined"==typeof c)return console.log("AI ERROR: board is not defined"),!1;if(!Array.isArray(c))return console.log("AI ERROR: passed board argument is not type of array"),!1;if(9!==c.length)return console.log("AI ERROR: length of board array is not valid, expected value is 9, given value is "+c.length),!1;if(c.forEach(function(a,b){c[b]=a.toLowerCase()}),f(c))return console.log("AI ERROR: board array contains invalid character !"),!1;var h=g(c,e),i=g(c,"o"===e?"x":"o");return h>i||h===i&&d!==e?(console.log("AI ERROR: It is not ai's turn!"),!1):i>h&&d===e?(console.log("AI ERROR: Given board contains too few ai' moves"),!1):i-1>h?(console.log("AI ERROR: Given board contains too few player' moves"),!1):a.GameTools.isTerminated(c,!0)?(console.log("AI ERROR: Given board represents terminated game!"),!1):c},f=function(b){var c=!1;return b.forEach(function(a){"e"!==a&&"x"!==a&&"o"!==a&&(c=!0)}),c},g=function(b,c){return b.reduce(function(a,b){return b===c?++a:a},0)};return{aiCharacter:b,playerCharacter:c,startingCharacter:d,board:e}}(),a}(AI||{}),AI=function(a){return a.initialization=function(b,c){return(c.aiCharacter=a.Validation.aiCharacter(b.aiCharacter))?(c.playerCharacter=a.Validation.playerCharacter(b.playerCharacter,b.aiCharacter))?(c.startingCharacter=a.Validation.startingCharacter(b.startingCharacter))?!!(c.board=a.Validation.board(b.board,b.startingCharacter,b.aiCharacter))||(console.log("AI: Initialization aborted: board initialization error!"),!1):(console.log("AI: Initialization aborted: Starting character initialization error!"),!1):(console.log("AI: Initialization aborted: Player character initialization error!"),!1):(console.log("AI: Initialization aborted: AI character initialization error!"),!1)},a}(AI||{}),AI=function(a){function c(c){var d=arguments.length<=1||void 0===arguments[1]||arguments[1];return a.initialization(c,b)?a.miniMax.calculateValue(b.board,b.aiCharacter,b.aiCharacter,d).move:void console.log("AI: Action cannot be returned: invalid data passed to function!")}function d(c){var d=arguments.length<=1||void 0===arguments[1]||arguments[1];return a.initialization(c,b)?a.miniMax.calculateValue(b.board,b.aiCharacter,b.aiCharacter,d).board:void console.log("AI: Board cannot be returned: invalid data passed to function!")}var b={};return{getAIAction:c,isTerminated:function(c){return a.GameTools.isTerminated(c,!0)},getStateOfGame:a.GameTools.isTerminated,getBoardAfterAIMove:d}}(AI||{});