AOS.init();
var home_top = (document.querySelector('.home') != null) ? document.querySelector('.home').offsetTop : '';
var factsheet_top = (document.querySelector('.fact-sheet') != null) ? document.querySelector('.fact-sheet').offsetTop : '';
var design_top = (document.querySelector('.production-design') != null) ? document.querySelector('.production-design').offsetTop : '';
var product_top = (document.querySelector('.products') != null) ? document.querySelector('.products').offsetTop : '';
var facilities_top = (document.querySelector('.facilities') != null) ? document.querySelector('.facilities').offsetTop : '';
var our_network_top = (document.querySelector('.our-network') != null) ? document.querySelector('.our-network').offsetTop : '';
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
        'content': 'We work closely with our customers to meet their individual needs.'
    },
    'du': {
        'title': 'DESIGN & INNOVATE',
        'content': 'We develop products and customize services for our customers.'
    },
    'ct': {
        'title': 'PRODUCE',
        'content': 'With our own production facilities we can make most of our customer products in house to guarantee quality and lead times.'
    },
    'io': {
        'title': 'OVERSEE',
        'content': 'We help our customers meet their quality needs, industry standards and local requirements. With our own and 3th party quality control checks we guarantee the best quality.'
    },
    'ns': {
        'title': 'DELIVER',
        'content': 'We always make sure our customers get their products where and when they need them to be in time.'
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
    },
    'Engineering': {
        'title': 'Engineering',
        'content': 'An important part of our design team are our factory engineers, whom make sure that our product designs (especially with OEM product development) are technically feasible and will comply to universal product safety standards.'
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
// Home pin interval status
var pin_interval;
var pin_timeout;
var pin_interval_status = false;
var current_pin = 0;
//
// Design sign
var designSign = {
    1: 'Marketingresearchsign',
    2: 'Brandingsign',
    3: 'Marketingsign',
    4: 'Designdevelopmentsign',
    5: 'Engineeringsign',
    6: 'Animationvideoproductionsign',
    7: 'Digitalsolutionssign'
};
var sign_interval;
var sign_timeout;
var sign_interval_status = false;
var current_sign = 0;
//
// Quality & Safety
var quality_safety_replay = false;
//
// Sustaninbility panda intro
var panda_intro = false;
//
// Products 
const fillArr = [];
var product_interval;
//
var newsCurrPage = 1;
const newsPerPage = 10;
const newsPages = document.querySelectorAll('ul.pagination li');

newsPages.forEach(function (page) {
    page.addEventListener('click', () => {
        pages = document.querySelectorAll('.page-no');
        pages.forEach(function (p) {
            p.classList.remove('active');
        });
        page.classList.add('active');
        type = page.parentElement.dataset.type;
        cat = 'productions';
        pageNo = page.dataset.index;
        let animate = (newsCurrPage < pageNo) ? 'slide-in-right' : 'slide-in-left';
        renderNews.fetchData(type, cat, pageNo, animate);
        updateNewsArrow(pageNo);
    });
});

document.querySelectorAll('.news .control').forEach((control) => {
    control.addEventListener('click', () => {
        if (control.getAttribute('to') != '') {
            let animate = (control.id == 'left') ? 'slide-in-left' : 'slide-in-right';
            renderNews.fetchData('all', 'productions', control.getAttribute('to'), animate);
            updateNewsArrow(control.getAttribute('to'));

            pages = document.querySelectorAll('.page-no');
            pages.forEach(function (p) {
                p.classList.remove('active');
                if (p.dataset.index == control.getAttribute('to')) {
                    p.classList.add('active');
                }
            });
            
        }
    });
});

function updateNewsArrow(currPage) {
    // News arrow control
    if (totalPageofNews > 1) {
        if (currPage == 1) {
            document.querySelector('.news .control#left').classList.add('hidden');
            document.querySelector('.news .control#right').classList.remove('hidden');

            document.querySelector('.news .control#right').setAttribute('to', parseInt(currPage) + 1);
        }
        if (currPage == totalPageofNews) {
            document.querySelector('.news .control#left').classList.remove('hidden');
            document.querySelector('.news .control#right').classList.add('hidden');

            document.querySelector('.news .control#left').setAttribute('to', parseInt(currPage) - 1);
        }
        if (currPage > 1 && currPage < totalPageofNews) {
            document.querySelector('.news .control#left').classList.remove('hidden');
            document.querySelector('.news .control#right').classList.remove('hidden');

            document.querySelector('.news .control#left').setAttribute('to', parseInt(currPage) - 1);
            document.querySelector('.news .control#right').setAttribute('to', parseInt(currPage) + 1);
        }
    }
}

//  News item vue component
Vue.component('news-item', {
    props: {
        item: {},
        baseUrl: {
            default: base_url
        }
    },
    template: `
        <li :class="'hex'" :animate="item.animate" :news-type="'all'" :index="item.id" @click="goNews($event)">
            <div class="hexIn">
                <a class="hexLink">
                    <img class="hex-main" :src="baseUrl + '/storage/app/media' + item.news_image_thumbnail" alt=""/>
                    <img class="hover-bg" :src="baseUrl + '/storage/app/media/productions/news_hex_hover.png'" alt=""/>
                    <h1 class="font-homenaje">{{ item.title }}</h1>
                </a>
            </div>
        </li>
    `,
    methods: {
        goNews: function (event) {
            el = event.currentTarget;
            var news_id = el.getAttribute('index');
            if (news_id != undefined) {
                window.location.href = base_url + "/productions-news/" + news_id;
            }
        }
    }
});
//
// Render product news
var renderNews = new Vue({
    el: "#hexGrid",
    data: {
        newsList: []
    },
    methods: {
        fetchData: function (type, cat, pageNo, animateFrom) {
            newsCurrPage = parseInt(pageNo);
            var self = this;
            axios.get(base_url + '/api/getNewsByPage/' + type + '/' + cat + '/' + pageNo)
                .then(function (response) {
                    if (response.data.data.length > 0) {
                        if (response.data.data.length < newsPerPage) {
                            var dummy = {
                                'title': 'Coming Soon',
                                'news_image_thumbnail': '/productions/news/logo.jpg'
                            };
                            var max = newsPerPage - response.data.data.length;
                            for (var i = 0; i < max; i++) {
                                response.data.data.push(dummy);
                            }
                        }
                        
                        for (var i = 0; i < response.data.data.length ; i++) {
                            // animateFrom = 'slide-in-right';
                            response.data.data[i].animate = animateFrom;
                        }
                        self.newsList = response.data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});
renderNews.fetchData('all', 'productions', 1);
//
window.onload = () => {
    // Design SVG event
    // const designSvg = document.querySelector('#design-svg');
    // const svgDoc = designSvg.contentDocument;
    const svgDoc = document.querySelector('#design-svg');
    const signTag = svgDoc.querySelectorAll('.sign');
    const mainObj = svgDoc.querySelectorAll('.mainObj');
   
    if (detector.mobile() != null) {
        // console.log(mainObj);
        const closeBtn = document.querySelector('.svg-popup-container .close-btn');
        const svgpopup = document.querySelector('.svg-popup-bg');

        mainObj.forEach((obj) => {
            obj.addEventListener('touchstart', () => {
                svgpopup.querySelector('#design-desc-content').innerHTML = design_pin_info[obj.id].content;
                svgpopup.querySelector('.design-svg-container').dataset.active = obj.id;
                svgpopup.classList.add('active');
            });
        });

        closeBtn.addEventListener('touchstart', () => {
            svgpopup.classList.remove('active');
        });
    } else {
        // signTag.forEach(function (sign) {
        mainObj.forEach(function (sign) {
            sign.addEventListener('mouseover', () => {
                // console.log(sign.querySelector('.sign').id);
                signObjs = svgDoc.querySelectorAll('.sign');
                signObjs.forEach(function (signobj) {
                    signobj.classList.remove('active');
                });
                sign.querySelector(`#${sign.querySelector('.sign').id}`).classList.add('active');
                let targetSign = sign.querySelector('.sign').dataset.target;
                $('.pin-hints').addClass('hidden');
                document.querySelector('.design-pin-hints').classList.add('hidden');
                mainObjs = svgDoc.querySelectorAll(`.mainObj:not([id=${targetSign}])`);
                mainObjs.forEach(function (obj) {
                    obj.classList.add('dim');
                });

                document.querySelector('.design-tooltip-container #tooltip-title').innerHTML = design_pin_info[targetSign].title;
                document.querySelector('.design-tooltip-container #tooltip-content').innerHTML = design_pin_info[targetSign].content;
                document.querySelector('.design-tooltip-container').classList.add('active');

                clearTimeout(sign_timeout);
                clearInterval(sign_interval);
                sign_interval_status = false;
            });
            sign.addEventListener('mouseout', () => {
                sign.querySelector('.sign').classList.remove('active');
                mainObjs = svgDoc.querySelectorAll('.mainObj');
                mainObjs.forEach(function (obj) {
                    obj.classList.remove('dim');
                });
                document.querySelector('.design-tooltip-container').classList.remove('active');
                sign_timeout = setTimeout(() => {
                    design_sign_loop();
                    sign_interval_status = true;
                }, 1500);
            });
        });
    }
    // Facilities video frame event
    const facilitiesHex = document.querySelectorAll('.mask-content, .block-text');
    facilitiesHex.forEach(function(hex) {
        hex.addEventListener('mouseover', () => {
            if(hex.tagName == 'text') {
                hex.previousElementSibling.classList.add('active');
            } else {
                hex.classList.add('active');
            }
        });

        hex.addEventListener('mouseout', () => {
            if (hex.tagName == 'text') {
                hex.previousElementSibling.classList.remove('active');
            } else {
                hex.classList.remove('active');
            }
            
        });

        hex.addEventListener('click', () => {
            // Hide hine when clicked 
            if (!document.querySelector('.facilities-hint').classList.contains('hide')) {
                document.querySelector('.facilities-hint').classList.add('hide');
            }
            // Jump to video frame 
            // time = hex.dataset.time;
            // event.preventDefault();
            // vid.currentTime = time;
            // vid.pause();
            // document.querySelector('.video-control img#play').classList.remove('dim');
            //
            // Display Content
            if (!document.querySelector('.facilities .desktop-view .title').classList.contains('hide')) {
                document.querySelector('.facilities .desktop-view .title').classList.add('hide');
            }
            document.querySelectorAll('.facilities .desktop-view .facility-content').forEach((content) => {
                content.classList.remove('active');
            });
            document.querySelector(`.facilities .desktop-view .facility-content[data-toggle=${hex.dataset.toggle}]`).classList.add('active');
        });
    });
    // Facilities video control event
    // const videoControl = document.querySelectorAll('.video-control img');
    // videoControl.forEach((btn) => {
    //     let action = btn.id;
    //     btn.addEventListener('click', () => {
    //         switch(action) {
    //             case "play":
    //             if(vid.paused) {
    //                 vid.play();
    //                 document.querySelector('.video-control img#play').classList.add('dim');
    //             }
    //             break;
    //             case "replay":
    //                 vid.currentTime = '0';
    //                 vid.play();
    //                 document.querySelector('.video-control img#play').classList.add('dim');
    //             break;
    //         }
    //     });
    // });

    updateOffestTop();
    update_nav_class(Math.round(this.scrollY));

    // Product page hex event
    document.querySelectorAll('.hex-item').forEach((hexProduct) => {
        let fillImgIdx = hexProduct.getAttribute('index');
        fillArr.push(fillImgIdx);

        hexProduct.addEventListener('mouseover', () => {
            hexProduct.classList.add('active');
            clearInterval(product_interval);
        });

        hexProduct.addEventListener('mouseout', () => {
            hexProduct.classList.remove('active');
            initProductInterval();
        });
    });
    initProductInterval();

    // initMap();
};

window.onresize = () => {
    updateOffestTop();
    update_nav_class(Math.round(this.scrollY));
};

window.onscroll = () => {
    update_nav_class(Math.round(this.scrollY));
};

$('document').ready(function() {
    // Buddle menu
    $('.nav-right-menu .opt, .bubble-menu .opt , .side-wrapper ul li a').on('click', function () {
        var id = $(this).attr('id');
        switch (id) {
            case 'home':
                to = home_top;
                break;
            case 'fact-sheet':
                to = factsheet_top;
                break;
            case 'design':
                to = design_top;
                break;
            case 'products':
                to = product_top;
                break;
            case 'facilities':
                to = facilities_top;
                break;
            case 'our-network':
                to = our_network_top;
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
    if(detector.mobile() == null) {
        $('.home-pin').on('mouseover', function () {
            $('.pin-hints').addClass('hidden');
            var toggle = $(this).data('toggle');
            // $('.img-home-gif.dimmed').removeClass('active');
            // $('.img-home-gif[id=main]').addClass('hidden');
            // $('.img-home-gif[data-bg=' + toggle + ']').addClass('active');
            $('.home-pin').removeClass('active');
            $(this).addClass('active');
            clearTimeout(pin_timeout);
            clearInterval(pin_interval);
            pin_interval_status = false;

            document.querySelector('#tooltip-title').innerHTML = pin_info[toggle].title;
            document.querySelector('#tooltip-content').innerHTML = pin_info[toggle].content;
            document.querySelector('.pin-tooltip-container').classList.add('active');
        });

        $('.img-home-gif').on('mouseout', function () {
            // $('.img-home-gif.dimmed').removeClass('active');
            // $('.img-home-gif[id=main]').removeClass('hidden');
            $('.home-pin').removeClass('active');
            pin_timeout = setTimeout(() => {
                home_pin_loop();
                pin_interval_status = true;
            }, 1500);
            document.querySelector('.pin-tooltip-container').classList.remove('active');
            // document.querySelectorAll('.tooltip-content').forEach(function(tooltip) {
            //     tooltip.classList.remove('visible');
            // });

        });
    } else {
        $('.home-pin').on('click', function() {
            var index = $(this).attr('data-index');
            show_home_popup(index);
        });

        $('.close-container').on('click', function() {
            hide_popup();
        });

        $('.popup-arrow').on('click', function () {
            var target = $(this).attr('target');
            change_home_popup_content(target);
        });
    }
    // News
    if(fromDetails && fromDetails != undefined) {
        $('html, body').animate({
            scrollTop: news_top + 9 + 'rem'
        });
    }

    // News popup
    // show_news_popup();
    // set_session_stroage('news_shown', true);

    // $('.news-popup .btn-container #btn-close').on('click', function() {
    //     hide_news_popup();
    // });

    // $('.news-popup-main-hex').on('click', function() {
    //     var position = $(this).data('position');
    //     news_popup_slider(position);
    // });
    
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

    // Init hex grid on products page
    document.querySelector('.hex-grid').appendChild(buildHexGrid({
        cols: 12,
        rows: 10,
        size: 100,
        spacing: 0,
        offsetX: -10, //58,
    }));

    if (detector.mobile() != null) {
        $('section#productions-welcome').addClass('hide');
    } else {
        // Welcome fadein/Out
        $('section#productions-welcome .productions-preload').addClass('hide');
        var welcome_show = get_session_stroage('welcome_shown');
        if (!welcome_show) {
            replayGif('welcome-gif');
            setTimeout(function () {
                $('section#productions-welcome').addClass('hide');
                set_session_stroage('welcome_shown', true);
            }, 8500);
        } else {
            $('section#productions-welcome').addClass('hide');
        }
        // Loop home pin
        home_pin_loop();
    }
});

function update_nav_class(scroll_y) {
    scroll_y+=100;
    var nav = document.querySelector('nav');
    var class_name = '';
    // $('.bubble-menu .opt').removeClass('active');
    $('.hints').addClass('hidden');
    if(scroll_y <= 100) {
        class_name = '';
        // $('.bubble-menu .opt .bullet#home').closest('.opt').addClass('active');
        // $('.hints').removeClass('hidden');
    } else if (scroll_y >= factsheet_top && scroll_y < design_top) {
        class_name = 'scroll-factsheet';
    } else if (scroll_y >= design_top && scroll_y < product_top) {
        class_name = 'scroll-design';
        design_sign_loop();
        /*
        $('.bubble-menu .opt .bullet#design').closest('.opt').addClass('active');
        if ($('.bubble-menu').hasClass('hidden')) {
            $('.bubble-menu').removeClass('hidden');
        }
        if (!vid.paused) {
            vid.pause();
            $('.video-control img#play').removeClass('dim');
        }
        */
    } else if (scroll_y >= product_top && scroll_y < facilities_top) {
        class_name = 'scroll-product';
    } else if (scroll_y >= facilities_top && scroll_y < our_network_top) {
        class_name = 'scroll-facilities';
        // $('.bubble-menu .opt .bullet#facilities').closest('.opt').addClass('active');
        // $('.bubble-menu').addClass('hidden');
        if(!vid_start) {
            // vid.play();
            // $('.video-control img#replay').removeClass('dim');
            // vid_start = true;
        }
        // Reset quality_safety_replay to false;
        quality_safety_replay = false;
    } else if (scroll_y >= our_network_top && scroll_y < quality_top) {
        class_name = 'scroll-network';
        if(!document.querySelector('.ou-svg').classList.contains('animate')) {
            document.querySelector('.ou-svg').classList.add('animate');
        }
    } else if(scroll_y >= quality_top && scroll_y < sustainability_top){
        class_name = 'scroll-quality';
        // $('.bubble-menu .opt .bullet#quality').closest('.opt').addClass('active');
        // if ($('.bubble-menu').hasClass('hidden')) {
        //     $('.bubble-menu').removeClass('hidden');
        // }
        if (!quality_safety_replay) {
            cw = document.body.clientWidth;
            if (cw < 768) {
                replayGif('quality-mobile');
                updateOffestTop();
            } else {
                replayGif('quality-desktop');
            }
            
            quality_safety_replay = true;
        }
        if (!vid.paused) {
            // vid.pause();
            // $('.video-control img#play').removeClass('dim');
        }
        // Off auto play sustainability cube
        off_auto_play();
    } else if(scroll_y >= sustainability_top && scroll_y < news_top) {
        class_name = 'scroll-sustainability';
        // $('.bubble-menu .opt .bullet#sustainability').closest('.opt').addClass('active');
        // Reset quality_safety_replay to false;
        quality_safety_replay = false;
        // Init auto play sustainability cube
        auto_play();
        if (!panda_intro) {
            typeWriter(document.querySelector('#panda-text'));
            panda_intro = true;
        }
        
    } else if(scroll_y >= news_top && scroll_y < contactus_top) {
        class_name = 'scroll-news';
        // $('.bubble-menu .opt .bullet#news').closest('.opt').addClass('active');
        // Off auto play sustainability cube
        off_auto_play();
    } else if(scroll_y >= contactus_top && scroll_y < group_desc_top) {
        class_name = 'scroll-contactus';
        // $('.bubble-menu .opt .bullet#contactus').closest('.opt').addClass('active');
    } else if (scroll_y >= group_desc_top) {
        class_name = 'scroll-home';
        // $('.bubble-menu .opt .bullet#contactus').closest('.opt').removeClass('active');
        // descVid.playVideo();
        descVid.play();
    }else {
        class_name = 'scroll-home';
        // $('.bubble-menu .opt .bullet#home').closest('.opt').addClass('active');
    }
    // console.log('scrollY :::: ' + scrollY);
    // console.log('sustainability_top ::::: ' + sustainability_top);
    // console.log('class ::::: ' + class_name);
    nav.className = class_name;
}

function home_pin_loop() {
    if (!pin_interval_status) {
        pin_interval = setInterval(() => {
            if (current_pin >= total_home_popup) {
                current_pin = 1;
            } else {
                current_pin++;
            }
            document.querySelectorAll('.home-pin').forEach((pin) => {
                pin.classList.remove('active');
            });
            document.querySelector(`.home-pin#home-${home_popup_arr[current_pin]}-pin`).classList.add('active');
        }, 1500);
        pin_interval_status = true;
    }
}

function design_sign_loop() {
    if (!sign_interval_status) {
        sign_interval = setInterval(() => {
            if (current_sign >= Object.keys(designSign).length) {
                current_sign = 1;
            } else {
                current_sign++;
            }
            document.querySelectorAll('.sign').forEach((sign) => {
                sign.classList.remove('active');
            });
            document.querySelector(`#${designSign[current_sign]}`).classList.add('active');
        }, 2000);
        sign_interval_status = true;
    }
}

function show_home_popup(target) {
    $('html, body').css('overflow', 'hidden');
    $('.home-popup').addClass('show-popup');
    change_home_popup_content(target);
}


function change_home_popup_content(target) {
    curr_popup_index = target;
    update_home_popup_target();
    document.querySelector('#home-block-popup').dataset.index = home_popup_arr[target];
    $('.popup-content').addClass('d-none');
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
//
// Type word animation
var typeWriterTxt = 0;
var typeWriterTimeout;
function typeWriter(ele) {
    txt = ele.dataset.text;
    if (typeWriterTxt < txt.length) {
        typeWriterTimeout = setTimeout(() => {
            ele.innerHTML += txt.charAt(typeWriterTxt);
            typeWriterTxt++;
            typeWriter(ele);
        }, 100);
    } else {
        typeWriterTxt = 0;
        clearTimeout(typeWriterTimeout);
    }
}
//
function initProductInterval() {
    product_interval = setInterval(() => {
        shuffleProduct(shuffle(fillArr));
    }, 800);
}

function shuffleProduct(randomList) {
    let randomLimit = Math.floor((Math.random() * 10) + 6);
    for(let i = 0; i < randomLimit; i++) {
        if(parseInt(i + 1) == randomLimit) {
            fill = `url(#img_${randomList[0]})`;
        } else {
            fill = `url(#img_${randomList[i + 1]})`;
        }
        document.querySelector(`.hex-item[fill="url(#img_${randomList[i]})"]`).setAttribute('fill', fill);
    }
}

function updateOffestTop() {
    home_top = document.querySelector('.home').offsetTop;
    design_top = document.querySelector('.production-design').offsetTop;
    product_top = document.querySelector('.products').offsetTop;
    facilities_top = document.querySelector('.facilities').offsetTop;
    quality_top = document.querySelector('.quality-content').offsetTop;
    sustainability_top = document.querySelector('.sustainability').offsetTop;
    news_top = document.querySelector('.news').offsetTop;
    contactus_top = document.querySelector('.contact-us').offsetTop;
}