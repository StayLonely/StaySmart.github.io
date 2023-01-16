const sliderMain = new Swiper('.slider_main', {
	effect: 'fade',
	centeredSlides: true,
	mousewheel: true,
	parallax: true,
	breakpoints: {
		0: {
			slidesPerView: 2.5,
			spaceBetween: 20
		},
		680: {
			slidesPerView: 3.5,
			spaceBetween: 60
		}
	}
})
const sliderBg = new Swiper('.slider_bg', {
	effect: 'fade',
	centeredSlides: true,
	parallax: true,
	spaceBetween: 0,
	slidesPerView: 3.5
})
sliderMain.controller.control = sliderBg

document.querySelectorAll('.slider__item').forEach(item => {
	item.addEventListener('click', event => {
		item.classList.toggle('opened')
		if (sliderMain.activeIndex == 1) {
			document.location.href = "/ready-html/firstGame.html";
		}
		if (sliderMain.activeIndex == 2) {
			document.location.href = "/ready-html/secondGame.html";
		}
		if (sliderMain.activeIndex == 3) {
			document.location.href = "/ready-html/index.html";
		}
		if (sliderMain.activeIndex == 4) {
			document.location.href = "/ready-html/fourthGame.html";
		}
	})
})

let desc = document.querySelector('.description')
sliderMain.on('slideChange', e => {
	sliderMain.activeIndex > 0 ? desc.classList.add('hidden') : desc.classList.remove('hidden')
})

let first = document.querySelector('.firstGame')
sliderMain.on('slideChange', e => {
	sliderMain.activeIndex == 1 ? first.classList.add('nohidden') : first.classList.remove('nohidden')
})

let second = document.querySelector('.secondGame')
sliderMain.on('slideChange', e => {
	sliderMain.activeIndex == 2 ? second.classList.add('nohidden') : second.classList.remove('nohidden')
})

let third = document.querySelector('.thirdGame')
sliderMain.on('slideChange', e => {
	sliderMain.activeIndex == 3 ? third.classList.add('nohidden') : third.classList.remove('nohidden')
})

let fourth = document.querySelector('.fourthGame')
sliderMain.on('slideChange', e => {
	sliderMain.activeIndex == 4 ? fourth.classList.add('nohidden') : fourth.classList.remove('nohidden')
})
