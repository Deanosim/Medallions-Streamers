var chan = $('#channels'),
    streamerArr = ["automateallthethings", "beohoff", "dotamajor", "drunk_blahhhhhh", "freecodecamp", "habathcx", "joshog", "l3loodreign", "mightymouseufc125", "moltenink", "nightblue3", "noobs2ninjas", "rampageishuman", "robotcaleb", "rp_dev", "saaitv", "storbeck", "terakilobyte", "thomasballinger", "trumpsc", "tsm_dyrus", "valkrin", "yogscast"];
//console.log(streamerArr);
streamerArr.map(function (streamer) {
    let _img = '//www.baristasbeans.com/portfolio/img/generic_user_image.jpg',
        streaming = 'offline',
        status = '',
        name = '',
        cid1 = 'f20qltbl1911z88lo7da0n9o3v8sv6l',
        cid2 = 'kvihogfj1hyvf38otxiuj8pkffd699a',
        geturl = (section) => 'https://api.twitch.tv/kraken/' + section + '/' + streamer + '?client_id=' + cid2;

    function _html() {
        return "<li class='" + streaming + "'><a class='center' target='_blank' href='https://secure.twitch.tv/" + streamer + "'><img class='' src='" + _img + "'><div class='div-txt center'><h3 class='name'>" + name + "</h3>" + status + "</div></a></li>";
    }

    ////////   online/offline ajax   //////////
    $.ajax({
        url: geturl('streams'),
        dataType: 'json',
        success: function (obj) {
            if (obj.stream !== null) streaming = 'online';
        }
    });
    ///////// Ajax Build Row   //////////
    $.ajax({
        url: geturl('channels'),
        dataType: 'json',
        success: function (obj) {
            if (Boolean(obj.logo)) {
                _img = obj.logo
            }
            if (Boolean(obj.status)) {
                status = obj.status;
            }
            name = obj.display_name;
            chan.append(_html());
        }
    });
    //console.log(geturl('users'));
});

$('#on-t').click(() => {
    $('.online').slideDown('slow', 'swing');
    $('.offline').slideUp('slow', 'swing')
});
$('#off-t').click(() => {
    $('.offline').slideDown('slow', 'swing');
    $('.online').slideUp('slow', 'swing')
});
$('#all-t').click(() => {
    $('.online').slideDown('slow', 'swing');
    $('.offline').slideDown('slow', 'swing')
});
//////////////////search////////////////////////

(function ($) {

    jQuery.expr[':'].Contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    }; // this is used to make search case INsensitive

    function listFilter(search, list) { // search is where txt input will be inserted, $list is what gets sorted
        var form = $("<form>").attr({
                "class": "filterform",
                "action": "#"
            }),
            input = $("<input>").attr({
                "class": "filterinput",
                "type": "text",
                "placeholder": "search"
            });
        $(form).append(input).appendTo(search); // create and add the filter form to search
        $(input).change(function () {
            var filter = $(this).val();
            if (filter) {
                // this finds all links in a list that contain the input,
                // and hide the ones not containing the input while showing the ones that do
                $(list).find(".name:not(:Contains(" + filter + "))").parent().parent().parent().slideUp('slow', 'swing');
                $(list).find(".name:Contains(" + filter + ")").parent().parent().parent().slideDown('slow', 'swing');
            } else {
                $(list).find("li").slideDown('slow', 'swing');
            }
            return false;
        }).keyup(function () {
            // fire the above change event after every letter
            $(this).change();
        });
    }

    //ondomready
    $(function () {
        listFilter($("#search"), $("#channels"));
    });
}(jQuery));