
/* 배너 슬라이드 */
const bnrSlide = new Swiper('#bnr .swiper',{
    spaceBetween : 5,
    slidesPerView : 3,
    loop : true,
    centeredSlides: false,
    navigation: {
        nextEl: '.bnr_control .swiper-button-next',
        prevEl: '.bnr_control .swiper-button-prev',
    },
    autoplay : {delay:3000,},
    })

/* 스페셜오퍼 */
const specialOffersSlide = new Swiper('#special_offers .swiper',{
    loop : true,
    centeredSlides: false,
    navigation: {
        nextEl: '.offers_control .swiper-button-next',
        prevEl: '.offers_control .swiper-button-prev',
    },
    })

/* 다이닝 */
const diningSlide = new Swiper('#dining .swiper',{
    loop : true,
    centeredSlides: false,
    navigation: {
        nextEl: '.dining_control .swiper-button-next',
        prevEl: '.dining_control .swiper-button-prev',
    },
    })