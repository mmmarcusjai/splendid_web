AOS.init();
var video = $('#my-video');
var ele_window = $(window);
// section offsetTop
var home_top = (document.querySelector('.home') != null) ? document.querySelector('.home').offsetTop : '';
var about_top = (document.querySelector('.about') != null) ? document.querySelector('.about').offsetTop : '';
var how_we_work_top = (document.querySelector('.how-we-work') != null) ? document.querySelector('.how-we-work').offsetTop : '';
var our_servise_top = (document.querySelector('.our-servise') != null) ? document.querySelector('.our-servise').offsetTop : '';
var sustainability_top = (document.querySelector('.sustainability') != null) ? document.querySelector('.sustainability').offsetTop : '';
var quality_top = (document.querySelector('.quality-and-safety') != null) ? document.querySelector('.quality-and-safety').offsetTop : '';
var news_top = (document.querySelector('.news') != null) ? document.querySelector('.news').offsetTop : '';
var contactus_top = (document.querySelector('.contact-us') != null) ? document.querySelector('.contact-us').offsetTop : '';
var group_desc_top = (document.querySelector('.group-description') != null) ? document.querySelector('.group-description').offsetTop : '';
//
// How we work Description block
var desc_block = document.querySelectorAll('.description-block');
//
// Quality & Safety
var quality_safety_replay = false;
//
// Common footer splendid Group
var descVid = document.querySelector('#desc-video');

window.onscroll = () => {
    // Navbar
    if(document.querySelector('.about') != null) {
        if(this.scrollY >= about_top) {
            addClassById('active', 'layout-header');
        } else {
            removeClassById('active', 'layout-header');
        }
    }

    // Update menu selected
    var menu_item = document.querySelectorAll('.menu-item');
    menu_item.forEach(function(item){
        item.classList.remove('selected');
    });

    if(this.scrollY >= home_top && this.scrollY < about_top) {

    } else if(this.scrollY >= about_top && this.scrollY < how_we_work_top) {
        // addClassById('selected', 'm-about');
        customClass('roll-in-blurred-left', desc_block, 'remove');
    } else if(this.scrollY >= how_we_work_top && this.scrollY < our_servise_top) {
        // addClassById('selected', 'm-how-we-work');
        customClass('roll-in-blurred-left', desc_block, 'add');
    } else if(this.scrollY >= our_servise_top && this.scrollY < quality_top) {
        // addClassById('selected', 'm-our-servise');
        customClass('roll-in-blurred-left', desc_block, 'remove');
        // Reset quality_safety_replay to false;
        quality_safety_replay = false;
    } else if(this.scrollY >= quality_top && this.scrollY < sustainability_top) {
        // addClassById('selected', 'm-quality-and-safety');
        // Off auto play sustainability cube
        off_auto_play();
        // Replay gif
        if(!quality_safety_replay) {
            cw = document.body.clientWidth;
            if (cw < 768) {
                replayGif('quality-mobile');
            } else {
                replayGif('quality-desktop');
            }
            quality_safety_replay = true;
        }
    }  else if(this.scrollY >= sustainability_top && this.scrollY < news_top) {
        // addClassById('selected', 'm-sustainability');
        // Init auto play sustainability cube
        auto_play();
        // Reset quality_safety_replay to false;
        quality_safety_replay = false;
    } else if(this.scrollY >= news_top && this.scrollY < contactus_top) {
        // addClassById('selected', 'm-news');
        // Off auto play sustainability cube
        off_auto_play();
    } else if(this.scrollY >= contactus_top && this.scrollY < group_desc_top) {
        // addClassById('selected', 'm-contact-us');

    } else if (this.scrollY >= group_desc_top) {
        descVid.play();
    }

    if(this.scrollY >= our_servise_top && this.scrollY < parseInt(sustainability_top - 1000 )) {
        // Off auto play sustainability cube
        off_auto_play();
    }

   // if(this.scrollY >= quality_top && this.scrollY <= parseInt(quality_top + 5)) {
   //
   // }
};


window.onresize = () => {
    //
    resize_update();
}



document.querySelector('.explore-btn').addEventListener('click', () => {
    jump_to('about');
});

const newsPages = document.querySelectorAll('ul.pagination li');
newsPages.forEach(function(page){
    page.addEventListener('click', () => {
        type = page.parentElement.dataset.type;
        cat = 'solutions';
        pageNo = page.dataset.index;
        if(type == 'product') {
            renderNews.fetchData(type, cat, pageNo);
        } else {
            renderCompanyNews.fetchData(type, cat, pageNo);
        }

    });
});
//  News item vue component
Vue.component('news-item', {
   props: {
       item: {},
       baseUrl: {
           default: base_url
       },
       currLan: {
           default: lan
       }
   },
   template: `
        <div class="news-item" :news-type="item.news_type" :style="{ 'background-image': 'url( ' + baseUrl + '/storage/app/media' + item.news_image_thumbnail + ')' }" :index="item.id" @click="goNews($event)" @mouseover="mouseOver($event)" @mouseout="mouseOut($event)">
            <div class="news-desc-block" v-if="currLan==='en'">
                <p class="news-title text-uppercase">{{ item.title }}</p>
                <p class="news-desc">{{ item.description }}</p>
            </div>
            <div class="news-desc-block" v-else-if="currLan==='fr'">
                <p class="news-title text-uppercase">{{ item.title_fr }}</p>
                <p class="news-desc">{{ item.description_fr }}</p>
            </div>
            <div class="news-desc-block-hover" v-if="currLan==='en'">
                <p class="news-title text-uppercase">{{ item.title }}</p>
                <p class="news-desc">{{ item.description }}</p>
            </div>
            <div class="news-desc-block-hover" v-else-if="currLan==='fr'">
                <p class="news-title text-uppercase">{{ item.title_fr }}</p>
                <p class="news-desc">{{ item.description_fr }}</p>
            </div>
        </div>`,
    methods: {
        goNews: function (event) {
            el = event.currentTarget;
            var news_id = el.getAttribute('index');
            if(news_id != undefined) {
                window.location.href = base_url + "/" + lan + "/solutions-news/" + news_id;
            }
        },
        mouseOver: function (event) {
            el = event.currentTarget;
            init_news_item(el, 'mouseover');
        },
        mouseOut: function (event) {
            el = event.currentTarget;
            init_news_item(el, 'mouseout');
        }
    },
    mounted: function() {
        resize_update();
    }
});

// Render product news
var renderNews = new Vue({
   el: "#news-product",
   data: {
       newsList: []
   },
   methods: {
       fetchData: function(type, cat, pageNo) {
           var self = this;
           axios.get(base_url+'/api/getNewsByPage/'+type+'/'+cat+'/'+pageNo)
           .then(function (response) {
               if(response.data.data.length > 0) {
                   if(response.data.data.length < 6) {
                       var dummy = {'title': 'Coming Soon', 'news_image_thumbnail': '/solutions/news/coming_soon.jpg'};
                       var max = 6 - response.data.data.length;
                       for(var i = 0; i < max; i++) {
                           response.data.data.push(dummy);
                       }
                       // console.log(response.data.data);
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

// Render company news
var renderCompanyNews = new Vue({
   el: "#news-company",
   data: {
       newsList: []
   },
   methods: {
       fetchData: function(type, cat, pageNo) {
           var self = this;
           axios.get(base_url+'/api/getNewsByPage/'+type+'/'+cat+'/'+pageNo)
           .then(function (response) {
               if(response.data.data.length > 0) {
                   if(response.data.data.length < 3) {
                       var dummy = {'title': 'Coming Soon', 'news_image_thumbnail': '/solutions/news/coming_soon.jpg'};
                       var max = 6 - response.data.data.length;
                       for(var i = 0; i < max; i++) {
                           response.data.data.push(dummy);
                       }
                       // console.log(response.data.data);
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

renderNews.fetchData('product', 'solutions', 1);
renderCompanyNews.fetchData('company', 'solutions', 1);

function init_news_item(el, action) {
    switch(action) {
        case 'mouseover':
            el.children[0].classList.add('hide');
            el.children[1].classList.add('active');
            // Title slide from left
            el.children[1].children[0].classList.add('slide-in-left');
            // Description slide from left
            el.children[1].children[1].classList.add('slide-in-right');
            break;
        case 'mouseout':
            el.children[0].classList.remove('hide');
            el.children[1].classList.remove('active');
            el.children[1].children[0].classList.remove('slide-in-left');
            el.children[1].children[1].classList.remove('slide-in-right');
            break;
    }
}

$(document).ready(function() {
    $('.menu-icon').click(function(){
		$(this).toggleClass('change');
        $('nav').toggleClass('active');
        $('.side-wrapper').toggleClass('active');
        if($(this).hasClass('change')) {
            $('.menu-text').text('');
            $('.language-selector').addClass('hide');
        } else {
            $('.menu-text').text('menu');
            $('.language-selector').removeClass('hide');
        }
	});

    $('.description-block').on('mouseover', function() {
        $(this).addClass('active');
    })

    $('.description-block').on('mouseout', function() {
        $(this).removeClass('active');
    })

    const { NormalParallax } = MiniParallax;

    new NormalParallax('.js-parallax');

    // $.scrollify({
    //     section : ".scroll-section",
    //     // sectionName : "section-name",
    //     interstitialSection : "",
    //     easing: "easeOutExpo",
    //     scrollSpeed: 800,
    //     offset : 0,
    //     scrollbars: true,
    //     standardScrollElements: "",
    //     setHeights: false,
    //     overflowScroll: false,
    //     updateHash: false,
    //     touchScroll:false,
    //     before:function() {},
    //     after:function() {},
    //     afterResize:function() {},
    //     afterRender:function() {}
    // });
    // resize_update();

    $('.description-slick').slick({
        infinite: false,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-arrow" id="left"></i>',
    });

    $('.sustain-slick').slick({
        infinite: false,
        nextArrow: '<i class="fa fa-angle-right fa-3x more-arrow" id="right"></i>',
        prevArrow: '<i class="fa fa-angle-left fa-3x more-arrow" id="left"></i>',
    });

    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('show');
    }, 3000)
});

function jump_to(id) {
    // var selected_id = 'm-' + id;
    // addClassById('selected', selected_id);
    if($('.side-wrapper').hasClass('active')) {
        $('.side-wrapper').removeClass('active');
        $('.menu-icon').removeClass('change');
        $('nav').removeClass('active');
        $('.language-selector').removeClass('hide');

    }
    window.location.href = '#' + id;
    // $('html, body').scrollTop(document.getElementById(id).offsetTop);
    // $.scrollify.instantMove("#" + id);

}

function resize_update() {
    var cw = document.body.clientWidth;
    if (cw < 768) {
        var news_desc = document.querySelectorAll('.news-desc-block');
        var news_desc_hover = document.querySelectorAll('.news-desc-block-hover');
        customClass('hide', news_desc, 'add');
        customClass('active', news_desc_hover, 'add');
    }
}
