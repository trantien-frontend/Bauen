    window.onload = () => {
    const $  = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    console.log();
    const load = {
        init: function () {
            this.loading();
        },
        loading: function () {
           const loading = $('.preloader ');
            function hide() {
                loading.classList.add('hide');
            }
            setTimeout(hide,4000);
        }
    }   
    load.init();
    const header = {
        init: function () {
            this.toggleMenu();
            this.fixedMenu();
            this.scrollSection();
        },
        toggleMenu: function () {
           const button = $('.icon-bar');
           const menu   = $('header .header-content .header-content__menu');
           button.addEventListener('click',function(){
                menu.classList.toggle('active');
           })
        },
        fixedMenu: function () {
            window.addEventListener('scroll',()=>{
                const header = $('header');
                const heightMenu = $('header .header-content').offsetHeight;
                const progressButton = $('.progress-button');
                const currentHeight = document.documentElement.scrollTop; 
                if (currentHeight > heightMenu) {
                    header.classList.add('header-fixed');
                    progressButton.classList.add('show');
                } 
                else if  (currentHeight <= heightMenu) {
                    header.classList.remove('header-fixed');
                    progressButton.classList.remove('show');
                }
            })
        },
        handelClick: function () {
            const buttons = $$('nav .header-content__menu li a');
            buttons.forEach((button)=>{
                button.addEventListener('click',(e)=>{
                    e.preventDefault(); 
                    let id = button.getAttribute('href');
                    let section = $(id);
                    section.scrollIntoView({
                        behavior: 'smooth', block: 'nearest', inline: 'start'
                    });
                    buttons.forEach(itemLink => {
                        itemLink.classList.remove('active');
                    })
                    button.classList.add('active');
                })
            })
        },
        scrollSection: function () {
            const links = $$('nav .header-content__menu li a');
            const sections = $$('.section-scroll-intoview');
            window.addEventListener('scroll',()=>{
                let sectionCurrent = '';
                sections.forEach(section => {
                    const scrollHeight = document.documentElement.scrollTop; 
                    const heightSectionToTop = section.offsetTop; //chieu cao tu section toi dau trang 
                    const sectionHeight = section.clientHeight; //Chieu cao noi dung cua section
                    if (scrollHeight >= (heightSectionToTop - sectionHeight/3)) { // scroll 1/3 cua do dai tu dau trang toi section add active 
                        sectionCurrent = section.getAttribute('id');
                    }
                })
                links.forEach(link => {
                    link.classList.remove('active');
                    let href = link.getAttribute('href');
                    if (href.includes(sectionCurrent)) {
                        link.classList.add('active');
                    }
                })
            })

        }
    }
    header.init();
    const progress = {
        init:function () {
            this.scroll();
            this.handelClick();
        },
        scrollProgress: function () {
            const scrollTop = document.documentElement.scrollTop;  //chiều cao từ top tới thanh scroll
            const scrollHeight = document.documentElement.scrollHeight; // chiều cao của cả document
            const clientHeight = document.documentElement.clientHeight; // chiều cao của phân nhìn thấy trên viewport
            const circleTransition = $('#circle-progress'); 

            const percentScrollPage = Math.floor(scrollTop / (scrollHeight - clientHeight)*100); 

            if (percentScrollPage != 0 ) {
                const circle = percentScrollPage*1;
                const dataOffsetStroke = Math.floor(100 - circle);
                circleTransition.style.strokeDashoffset = dataOffsetStroke; 
            }
        },
        handelClick: function () {
            const button = $('.progress-button');
            button.addEventListener('click',()=>{
                window.scrollTo(0,0);
            })
        },
        scroll: function () {
            window.addEventListener('scroll',()=>{
                this.scrollProgress();
            })
        }
    }
    progress.init();
   
    const video = {
        init: function () {
            this.videoPopup();
        },
        videoPopup: function () {
            const buttonClose = $('.close-video');
            const buttonOpen = $('.button-play');
            const overlay = $('.overlay');
            const iframe = $('.video iframe');
            buttonOpen.addEventListener('click',(e)=>{
                this.open(e,overlay,buttonOpen,iframe);
            });
            buttonClose.addEventListener('click',()=>{
                this.close(overlay,iframe);
            });
            overlay.addEventListener('click',()=>{
                this.close(overlay,iframe);
            });
           
        },
        open: function (e,overlay,button,iframe) {
            e.preventDefault();
            overlay.classList.add('show');
            const sourc = button.getAttribute('href');
            iframe.setAttribute('src',sourc);
            iframe.parentElement.classList.add('show');
        },
        close: function (overlay,iframe) {
            overlay.classList.remove('show');
            iframe.setAttribute('src','');
            iframe.parentElement.classList.remove('show');
        }
    }
    video.init();
}