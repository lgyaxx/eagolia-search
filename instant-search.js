$(document).ready( function() {
    var client = algoliasearch('YOUR-APP-ID', 'YOUR-SEARCH-ONLY-API-KEY');
    var customer_index = client.initIndex('customers');
    var tea_index = client.initIndex('teas');

    var search_input = $('input[name="search"]');

    var body_content = $('nav').next('div');

    var search_input_string = '';

    search_input.on('input', (function() {
        if ( $( window ).width() <= 768 ) {
            $('.search-card').css({
                left: '0',
                minWidth: ( $( window ).width() - 50 ) + 'px'
            });
        }
        else {
            $('.search-card').css({
                left: 'initial',
                right: '40px',
                minWidth: '500px'
            });
        }

        showSearch();

        if ( $(this).val() != '' ) {
            search_input_string = $(this).val();
            var old_input = search_input_string;
            setTimeout(function() {
                if ( search_input_string == old_input ) {
                    $('ul.results').empty();
                    customer_index.search(search_input_string, function (err, customers) {
                        for (var i = 0; i < customers.hits.length; i++) {
                            var customer = '<a href="/customers/' + customers.hits[i].id + '" class="list-group-item border-left-0 border-right-0 rounded-0">' +
                                customers.hits[i].last_name + ' ' + customers.hits[i].first_name +
                                '</a>';
                            $('ul.results').append(customer);
                        }
                        addHover();
                    });

                    tea_index.search(search_input_string, function (err, teas) {
                        for (var i = 0; i < teas.hits.length; i++) {
                            var tea = '<a href="/teas/' + teas.hits[i].id + '" class="list-group-item border-left-0 border-right-0 rounded-0">' +
                                teas.hits[i].long_name +
                                '</a>';
                            $('ul.results').append(tea);
                        }
                        addHover();
                    });
                }
            }, 1500);
        }
        else {
            hideSearch();
        }
    }));

    $( window ).resize(function() {
        hideSearch();
    });

    $('nav').nextAll().on('click' ,function(){
        hideSearch();
    });

    function hideSearch() {
        $('.search-card').css({
            display: 'none'
        });
        body_content.css({
            opacity: 1.0
        });

    }

    function showSearch() {
        $('.search-card').css({
            display: 'block'
        });
        if (body_content.css('opacity') == 1.0) {
            body_content.css({
                opacity: 0.3
            });
        }
    }

    function addHover() {
        $('a.list-group-item').hover(function () {
            if ( !$(this).hasClass('active') ) {
                $(this).addClass('active');
            }

        }, function () {
            $(this).removeClass('active');
        });
    }
});

