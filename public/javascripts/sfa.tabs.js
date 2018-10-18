document.addEventListener("DOMContentLoaded", function() {

    var sfa = sfa || {};

    sfa.tabs = {
        elems: {
            tabs: $('ul.js-tabs li a'),
            panels: $('.js-tab-pane')
        },

        init: function() {

            if (this.elems.tabs) {
                this.setUpEvents(this.elems.tabs);
                this.hidePanels(this.elems.panels);
            }

            this.elems.tabs.eq(0).click();

        },

        hidePanels: function(panels) {
            panels.hide();
        },

        showPanel: function(panel) {
            panel.show();
        },

        setUpEvents: function(tabs) {

            var that = this;

            tabs.on('click touchstart',
                function(e) {

                    tabs.removeClass('selected');
                    $(this).addClass('selected');

                    const target = $(this).attr('href');

                    that.hidePanels(that.elems.panels);
                    that.showPanel($(target));

                    e.preventDefault();
                });

        }
    };

    sfa.tabs.init();
    
})