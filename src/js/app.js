import '../scss/main.scss';

import smoothScroll from 'smooth-scroll'

import project1 from '../img/project1.jpg'
import project2 from '../img/project2.jpg'
import project3 from '../img/project3.jpg'
import project4 from '../img/project4.jpg'
import project5 from '../img/project5.jpg'
import project6 from '../img/project6.jpg'
import image_200 from '../img/image_200.jpg'

(function() {
  const projects = document.querySelectorAll('.projects__item');
  const menuBtn = document.querySelector('.menu-btn');
  const body = document.querySelector('body');
  const colorBtn = document.querySelector('.color-btn');
  const cookieBtn = document.querySelector('#cookieBtn');
  const nav = document.querySelector('.menu');
  const cookieInfo = document.querySelector('#cookieInfo');
  const scroll = new smoothScroll();
  const links = document.querySelectorAll('.menu__link');
  let darkTheme = null || JSON.parse(localStorage.getItem('darkTheme'));

  const onDOMLoad = function() {
    document.addEventListener('DOMContentLoaded', function() {
      if (!showCookie('hideCookieInfo')) {
        cookieInfo.classList.add('show');
      }

      if (!darkTheme) {
        body.classList.add('light');
        colorBtn.classList.add('active');
      }
      const projectsAll = [...projects];
      const randomNumber = Math.floor(Math.random() * projectsAll.length);
      projectsAll[randomNumber].classList.add('featured');
    })
  }

  const menuClick = function() {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.classList.toggle('close');
    });
  }

  const colorClick = function() {
    colorBtn.addEventListener('click', () => {
      colorBtn.classList.toggle('active');
      body.classList.toggle('light');
      _saveTheme();
    });
  }

  const cookieClick = function() {
    cookieBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const data = new Date();
      data.setTime(data.getTime() + (365 * 24*60*60*1000));
      document.cookie = 'hideCookieInfo=true; expires=' + data.toGMTString();
      cookieInfo.classList.add('hide');
    })
  }

  const showCookie = function(name) {
    if (document.cookie != "") {
      const cookies = document.cookie.split(/; */);

      for (let i=0; i<cookies.length; i++) {
        const cookieName = cookies[i].split("=")[0];
        const cookieVal = cookies[i].split("=")[1];
        if (cookieName === decodeURIComponent(name)) {
          return decodeURIComponent(cookieVal);
        }
      }
    }
  }

  const linkClick = function() {
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        _closeMenu();
        setTimeout(() => {
          const href = this.getAttribute('href');
          const anchor = document.querySelector(href);
          const toggle = this;
          scroll.animateScroll(anchor, toggle, {speed: 700});
        }, 600);
      })
    })
  }

  const onScroll = function() {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      const header = document.querySelector('header');
      const sections = document.querySelectorAll('section');
      const footer = document.querySelector('footer');
      const sectionsAll = [header, ...sections, footer]
      const links = nav.querySelectorAll('a');
      const linksAll = [...links];
      sectionsAll.forEach(function(section) {
        const sectionRect = section.getBoundingClientRect();
        if ((scrollPosition + 1) >= sectionRect.top + scrollPosition && scrollPosition <= sectionRect.bottom + scrollPosition) {
          linksAll.forEach(function(link) {
            const linkHref = link.getAttribute('href');
            const sectionId = '#' + section.id;
            if (linkHref === sectionId) {
              link.classList.add('menu__link--active');
            } else {
              link.classList.remove('menu__link--active');
            }
          });
        }
      });
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        linksAll.forEach(function(link) {
          link.classList.remove('menu__link--active');
        });
        linksAll[linksAll.length - 1].classList.add('menu__link--active');
      }
    });
  }

  const _saveTheme = function() {
    darkTheme = !darkTheme;
    localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
  }

  const _closeMenu = function() {
    nav.classList.remove('open');
    menuBtn.classList.remove('close');
  };

  const init = function() {
    onDOMLoad();
    menuClick();
    colorClick();
    cookieClick();
    showCookie();
    linkClick();
    onScroll();
  }
  init();
})();
