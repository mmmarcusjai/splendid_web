AOS.init();
var home_top = (document.querySelector('.home') != null) ? document.querySelector('.home').offsetTop : '';
var design_top = (document.querySelector('.production-design') != null) ? document.querySelector('.production-design').offsetTop : '';
var facilities_top = (document.querySelector('.facilities') != null) ? document.querySelector('.facilities').offsetTop : '';
var quality_top = (document.querySelector('.quality-content') != null) ? document.querySelector('.quality-content').offsetTop : '';
var sustainability_top = (document.querySelector('.sustainability') != null) ? document.querySelector('.sustainability').offsetTop : '';
var news_top = (document.querySelector('.news') != null) ? document.querySelector('.news').offsetTop : '';
var contactus_top = (document.querySelector('.contact-us') != null) ? document.querySelector('.contact-us').offsetTop : '';
var group_desc_top = (document.querySelector('.group-description') != null) ? document.querySelector('.group-description').offsetTop : '';
// facilities video
var vid = (document.querySelector('.facilities video') != null) ? document.querySelector('.facilities video') : '';
var vid_start = false;
// Detect user agent
var detector = new MobileDetect(window.navigator.userAgent);
// Home pin Content
const pin_info = {
    'pro': {
        'title': 'COME TOGETHER',
        'content': 'Splendid Solutions works closely with their customers to meet their individual needs. With our in-house design studio, our own packaging production facility and a global supplier portfolio we have the ability to innovate, create, source and manufacture most of our customer’s products under the Splendid Solutions ‘roof’. Of course quality and industry standards are important in this process so with our own and 3rd party quality control checks we guarantee the highest standards. With our warehouse & logistics network we are able to deliver your products to every required delivery point in the world.'
    },
    'du': {
        'title': 'DESIGN & INNOVATE',
        'content': 'Splendid Solutions works closely with their customers to meet their individual needs. With our in-house design studio, our own packaging production facility and a global supplier portfolio we have the ability to innovate, create, source and manufacture most of our customer’s products under the Splendid Solutions ‘roof’. Of course quality and industry standards are important in this process so with our own and 3rd party quality control checks we guarantee the highest standards. With our warehouse & logistics network we are able to deliver your products to every required delivery point in the world.'
    },
    'ct': {
        'title': 'PRODUCE',
        'content': 'Splendid Solutions works closely with their customers to meet their individual needs. With our in-house design studio, our own packaging production facility and a global supplier portfolio we have the ability to innovate, create, source and manufacture most of our customer’s products under the Splendid Solutions ‘roof’. Of course quality and industry standards are important in this process so with our own and 3rd party quality control checks we guarantee the highest standards. With our warehouse & logistics network we are able to deliver your products to every required delivery point in the world.'
    },
    'io': {
        'title': 'OVERSEA',
        'content': 'Splendid Solutions works closely with their customers to meet their individual needs. With our in-house design studio, our own packaging production facility and a global supplier portfolio we have the ability to innovate, create, source and manufacture most of our customer’s products under the Splendid Solutions ‘roof’. Of course quality and industry standards are important in this process so with our own and 3rd party quality control checks we guarantee the highest standards. With our warehouse & logistics network we are able to deliver your products to every required delivery point in the world.'
    },
    'ns': {
        'title': 'DELIVER',
        'content': 'Splendid Solutions works closely with their customers to meet their individual needs. With our in-house design studio, our own packaging production facility and a global supplier portfolio we have the ability to innovate, create, source and manufacture most of our customer’s products under the Splendid Solutions ‘roof’. Of course quality and industry standards are important in this process so with our own and 3rd party quality control checks we guarantee the highest standards. With our warehouse & logistics network we are able to deliver your products to every required delivery point in the world.'
    }
};
//
// Design pin info
const design_pin_info = {
    'Branding': {
        'title': 'Branding',
        'content': 'Branding is undoubtedly an essential aspect of your business, whether it is a logo or a complete brand identity. We will take your brand and set you apart from the competition.'
    },
    'MarketResearch': {
        'title': 'Market Research',
        'content': 'With our team of innovators, trend watchers and market researchers we study the global markets giving you the tools and advice on what will be the \'next thing\'.'
    },
    'Designdevelopmentgroup': {
        'title': 'Design & development',
        'content': 'Our experienced teams can design and develop everything in-house. Additionally, as we are part of Splendid Group, we can manufacture your products in our own production facilities.'
    },
    'Marketing': {
        'title': 'Marketing',
        'content': 'We do not only create products, we create the complete marketing campaigns. If it is below the line, above the line or activation, we have the ability and experience to make it happen. We create the hype!'
    },
    'AnimationVideoProduction': {
        'title': 'Animation & Video Production',
        'content': 'Consumers do not have much patience to read these days. Videos are a great way to present your services and the products in front of customers. Our video and animation production team makes sure we get your message across to your target audience while keeping them engaged and entertained.'
    },
    'DigitalSolutions': {
        'title': 'Digital Solutions',
        'content': 'With our creative- and online development teams in Europe and Asia we are always looking to create new innovate ideas or campaigns where East meets West. “WeCreate” is our in-house digital agency for the development of all online and mobile solutions.'
    }
};
//
//  Group description video
var descVid = document.querySelector('#desc-video');
//

var curr_popup_index = 0;
var total_home_popup = $('.home-pin').length;
var home_popup_arr = {
    1: 'pro',
    2: 'du',
    3: 'ct',
    4: 'io',
    5: 'ns',
};

// Quality & Safety
var quality_safety_replay = false;
//

window.onload = () => {
    // Design SVG event
    const designSvg = document.querySelector('#design-svg');
    const svgDoc = designSvg.contentDocument;
    const signTag = svgDoc.querySelectorAll('.sign');
    const mainObj = svgDoc.querySelectorAll('.mainObj');
   
    if (detector.mobile() != null) {
        // console.log(mainObj);
        const closeBtn = document.querySelector('.svg-popup-container .close-btn');
        const svgpopup = document.querySelector('.svg-popup-bg');

        mainObj.forEach((obj) => {
            obj.addEventListener('click', () => {
                alert('clicked');
                svgpopup.querySelector('#design-desc-content').innerHTML = design_pin_info[obj.id].content;
                svgpopup.querySelector('.design-svg-container').dataset.active = obj.id;
                svgpopup.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => {
            svgpopup.classList.remove('active');
        });
    } else {
        signTag.forEach(function (sign) {
            sign.addEventListener('mouseover', () => {
                $('.pin-hints').addClass('hidden');
                document.querySelector('.design-pin-hints').classList.add('hidden');
                mainObjs = svgDoc.querySelectorAll(`.mainObj:not([id=${sign.dataset.target}])`);
                mainObjs.forEach(function (obj) {
                    obj.classList.add('dim');
                });
                document.querySelector('.design-tooltip-container #tooltip-title').innerHTML = design_pin_info[sign.dataset.target].title;
                document.querySelector('.design-tooltip-container #tooltip-content').innerHTML = design_pin_info[sign.dataset.target].content;
                document.querySelector('.design-tooltip-container').classList.add('active');
            });
            sign.addEventListener('mouseout', () => {
                mainObjs = svgDoc.querySelectorAll('.mainObj');
                mainObjs.forEach(function (obj) {
                    obj.classList.remove('dim');
                });
                document.querySelector('.design-tooltip-container').classList.remove('active');
            });
        });
    }
    // Facilities video frame event
    const facilitiesHex = document.querySelectorAll('.mask-content');
    facilitiesHex.forEach(function(hex) {
        hex.addEventListener('mouseover', () => {
            hex.classList.add('active');
        });

        hex.addEventListener('mouseout', () => {
            hex.classList.remove('active');
        });

        hex.addEventListener('click', () => {
            time = hex.dataset.time;
            event.preventDefault();
            vid.currentTime = time;
            vid.pause();
            document.querySelector('.video-control img#play').classList.remove('dim');
        });
    });
    // Facilities video control event
    const videoControl = document.querySelectorAll('.video-control img');
    videoControl.forEach((btn) => {
        let action = btn.id;
        btn.addEventListener('click', () => {
            switch(action) {
                case "play":
                if(vid.paused) {
                    vid.play();
                    document.querySelector('.video-control img#play').classList.add('dim');
                }
                break;
                case "replay":
                    vid.currentTime = '0';
                    vid.play();
                    document.querySelector('.video-control img#play').classList.add('dim');
                break;
            }
        });
    });

    home_top = document.querySelector('.home').offsetTop;
    facilities_top = document.querySelector('.facilities').offsetTop;
    quality_top = document.querySelector('.quality-content').offsetTop;
    sustainability_top = document.querySelector('.sustainability').offsetTop;
    news_top = document.querySelector('.news').offsetTop;
    contactus_top = document.querySelector('.contact-us').offsetTop;
    update_nav_class(Math.round(this.scrollY));
    
    $('section#productions-welcome').addClass('hide');
};

window.onresize = () => {
    home_top = document.querySelector('.home').offsetTop;
    facilities_top = document.querySelector('.facilities').offsetTop;
    quality_top = document.querySelector('.quality-content').offsetTop;
    sustainability_top = document.querySelector('.sustainability').offsetTop;
    news_top = document.querySelector('.news').offsetTop;
    contactus_top = document.querySelector('.contact-us').offsetTop;
    update_nav_class(Math.round(this.scrollY));
};
window.onscroll = () => {
    update_nav_class(Math.round(this.scrollY));
};


$('document').ready(function() {
    // Welcome fadein/Out
    if (detector.mobile() == null) {
        var welcome_show = get_session_stroage('welcome_shown');
        if (!welcome_show) {
            setTimeout(function () {
                $('section#productions-welcome').addClass('hide');
                set_session_stroage('welcome_shown', true);
            }, 7500);
        } else {
            $('section#productions-welcome').addClass('hide');
        }
    }
    
    // Buddle menu
    $('.bubble-menu .opt , .side-wrapper ul li a').on('click', function() {
        var id = $(this).attr('id');
        switch (id) {
            case 'home':
                to = home_top;
                break;
            case 'design':
                to = design_top;
                break;
            case 'facilities':
                to = facilities_top;
                break;
            case 'quality':
                to = quality_top;
                break;
            case 'sustainability':
                to = sustainability_top;
                break;
            case 'news':
                to = news_top;
                break;
            case 'contactus':
                to = contactus_top;
                break;
            default:

        }
        if($('.side-wrapper').hasClass('active')) {
            $('.side-wrapper').removeClass('active');
            $('#nav-icon').removeClass('open');
        }
        $('html, body').animate({
            scrollTop: to
        });
    });

    // Home
    $('.home-pin').on('mouseover', function() {
        $('.pin-hints').addClass('hidden');
        var toggle = $(this).data('toggle');
        $('.img-home-gif.dimmed').removeClass('active');
        $('.img-home-gif[id=main]').addClass('hidden');
        $('.img-home-gif[data-bg='+toggle+']').addClass('active');
        $('.home-pin').removeClass('active');
        $(this).addClass('active');

        // document.querySelector('.tooltip-content').classList.add('visible');
        document.querySelector('#tooltip-title').innerHTML = pin_info[toggle].title;
        document.querySelector('#tooltip-content').innerHTML = pin_info[toggle].content;
        document.querySelector('.pin-tooltip-container').classList.add('active');
    });

    $('.img-home-gif').on('mouseout', function() {
        $('.img-home-gif.dimmed').removeClass('active');
        $('.img-home-gif[id=main]').removeClass('hidden');
        $('.home-pin').removeClass('active');

        document.querySelector('.pin-tooltip-container').classList.remove('active');
        // document.querySelectorAll('.tooltip-content').forEach(function(tooltip) {
        //     tooltip.classList.remove('visible');
        // });
        
    });

    // $('.home-pin').on('click', function() {
    //     var index = $(this).attr('data-index');
    //     show_home_popup(index);
    // });

    // $('.close-container').on('click', function() {
    //     hide_popup();
    // });

    $('.popup-arrow').on('click', function() {
        var target = $(this).attr('target');
        change_home_popup_content(target);
    });

    // News
    if(fromDetails && fromDetails != undefined) {
        $('html, body').animate({
            scrollTop: news_top + 9 + 'rem'
        });
    }

    // News popup
    show_news_popup();
    set_session_stroage('news_shown', true);

    $('.news-popup .btn-container #btn-close').on('click', function() {
        hide_news_popup();
    });

    $('.news-popup-main-hex').on('click', function() {
        var position = $(this).data('position');
        news_popup_slider(position);
    });
    
    $('#nav-icon').click(function(){
		$(this).toggleClass('open');
        if($(this).hasClass('open')) {
            $('.side-wrapper').addClass('active');
        } else {
            $('.side-wrapper').removeClass('active');
        }
	});

    // Active responsive image map
    $('map').imageMapResize();

    $('.sustain-slick').slick({
        infinite: false,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-arrow" id="left"></i>',
    });
});

function update_nav_class(scroll_y) {
    scroll_y+=100;
    var nav = document.querySelector('nav');
    var class_name = '';
    $('.bubble-menu .opt').removeClass('active');
    $('.hints').addClass('hidden');
    if(scroll_y <= 100) {
        class_name = '';
        $('.bubble-menu .opt .bullet#home').closest('.opt').addClass('active');
        $('.hints').removeClass('hidden');
    } else if (scroll_y >= design_top && scroll_y < facilities_top) {
        class_name = 'scroll-design';
        $('.bubble-menu .opt .bullet#design').closest('.opt').addClass('active');
        if ($('.bubble-menu').hasClass('hidden')) {
            $('.bubble-menu').removeClass('hidden');
        }
        if (!vid.paused) {
            vid.pause();
            $('.video-control img#play').removeClass('dim');
        }
    }else if(scroll_y >= facilities_top && scroll_y < quality_top) {
        class_name = 'hide';
        $('.bubble-menu .opt .bullet#facilities').closest('.opt').addClass('active');
        $('.bubble-menu').addClass('hidden');
        if(!vid_start) {
            vid.play();
            $('.video-control img#replay').removeClass('dim');
            vid_start = true;
        }
        // Reset quality_safety_replay to false;
        quality_safety_replay = false;
    } else if(scroll_y >= quality_top && scroll_y < sustainability_top){
        class_name = 'scroll-quality';
        $('.bubble-menu .opt .bullet#quality').closest('.opt').addClass('active');
        if ($('.bubble-menu').hasClass('hidden')) {
            $('.bubble-menu').removeClass('hidden');
        }
        if (!quality_safety_replay) {
            cw = document.body.clientWidth;
            if (cw < 768) {
                replayGif('quality-mobile');
            } else {
                replayGif('quality-desktop');
            }
            quality_safety_replay = true;
        }
        if (!vid.paused) {
            vid.pause();
            $('.video-control img#play').removeClass('dim');
        }
        // Off auto play sustainability cube
        off_auto_play();
    } else if(scroll_y >= sustainability_top && scroll_y < news_top) {
        class_name = 'scroll-sustainability';
        $('.bubble-menu .opt .bullet#sustainability').closest('.opt').addClass('active');
        // Reset quality_safety_replay to false;
        quality_safety_replay = false;
        // Init auto play sustainability cube
        auto_play();
    } else if(scroll_y >= news_top && scroll_y < contactus_top) {
        class_name = 'scroll-news';
        $('.bubble-menu .opt .bullet#news').closest('.opt').addClass('active');
        // Off auto play sustainability cube
        off_auto_play();
    } else if(scroll_y >= contactus_top && scroll_y < group_desc_top) {
        class_name = 'scroll-contactus';
        $('.bubble-menu .opt .bullet#contactus').closest('.opt').addClass('active');
    } else if (scroll_y >= group_desc_top) {
        class_name = 'scroll-home';
        $('.bubble-menu .opt .bullet#contactus').closest('.opt').removeClass('active');
        descVid.play();
    }else {
        class_name = 'scroll-home';
        $('.bubble-menu .opt .bullet#home').closest('.opt').addClass('active');
    }
    // console.log('scrollY :::: ' + scrollY);
    // console.log('sustainability_top ::::: ' + sustainability_top);
    // console.log('class ::::: ' + class_name);
    nav.className = class_name;
}

function show_home_popup(target) {
    $('html, body').css('overflow', 'hidden');
    $('.home-popup').addClass('show-popup');
    change_home_popup_content(target);
}


function change_home_popup_content(target) {
    curr_popup_index = target;
    update_home_popup_target();
    $('.popup-content').addClass('d-none');
    // $('.home-popup .popup-base.base-bg').css('background-image', 'url(themes/productions/assets/images/'+target+'_bg.png)');
    $('.popup-content[data-index="'+target+'"]').removeClass('d-none');
}

function update_home_popup_target() {
    prev_index = parseInt(curr_popup_index) - 1;
    next_index = parseInt(curr_popup_index) + 1;
    $('.popup-arrow[id=right-arrow]').attr('target', next_index);
    $('.popup-arrow[id=left-arrow]').attr('target', prev_index);
    if(next_index > total_home_popup) {
        next_index = 1;
        $('.popup-arrow[id=right-arrow]').attr('target', next_index);
    } else if(prev_index == 0) {
        prev_index = total_home_popup;
        $('.popup-arrow[id=left-arrow]').attr('target', prev_index);
    }
}

function hide_popup() {
    $('html, body').css('overflow', 'visible');
    $('.home-popup').removeClass('show-popup');
}

function show_news_popup() {
    var get_show = get_session_stroage('news_shown');
    if(!get_show) {
        $('html, body').css('overflow', 'hidden');
        $('.news-popup').removeClass('inactive');
    }
}

function hide_news_popup() {
    $('html, body').css('overflow', 'visible');
    $('.news-popup').addClass('inactive');
}

function news_popup_slider(position) {
    if($('.details-img-hide[img-display=1]').length == $('.details-img-hide').length) {
        $('.details-img-hide').attr('img-display', '0');
    }
    switch (position) {
        //right to left
        case 'right' :
            $('.details-img-2').removeClass('details-img-2').addClass('details-img-hide').data('position', '');
            $('.details-img-1').removeClass('details-img-1').addClass('details-img-2').data('position', 'left');
            $('.details-img-3').removeClass('details-img-3').addClass('details-img-1').data('position', 'center');
            $('.details-img-hide[img-display=0]').last().removeClass('details-img-hide').addClass('details-img-3').data('position', 'right').attr('img-display', '1');
            break;
        // left to right
        case 'left' :
            $('.details-img-3').removeClass('details-img-3').addClass('details-img-hide').data('position', '');
            $('.details-img-1').removeClass('details-img-1').addClass('details-img-3').data('position', 'right');
            $('.details-img-2').removeClass('details-img-2').addClass('details-img-1').data('position', 'center');
            $('.details-img-hide[img-display=0]').last().removeClass('details-img-hide').addClass('details-img-2').data('position', 'left').attr('img-display', '1');
            break;
    }
    var current = $('.details-img-1').data('detail');
    $('.news-details').addClass('d-none');
    $('.news-details[data-index='+current+']').removeClass('d-none');
}