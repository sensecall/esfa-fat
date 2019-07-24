/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// $(window).load(function(){
//      $('#cookieModal').modal('show');
// });
//// MODAL CODE
$(document).ready(function () {
     $('#acceptCookies').on('click',function(e) {

     });
     $('#cookieSetting').on('click',function(e) {

     });
})
