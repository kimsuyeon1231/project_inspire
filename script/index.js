
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

/* 룸 */
document.addEventListener('DOMContentLoaded', () => {
    const towerButtons   = document.querySelectorAll('#tower_room .tower_list button');
    const towerImages    = document.querySelectorAll('#tower_room .tower_img');
    const roomContainers = document.querySelectorAll('#tower_room .room_container');

    const swipers = new Map(); // type별 Swiper 인스턴스 저장

    // 라벨 active 처리 함수
    function updateLabels(swiper, container) {
        const labels = container.querySelectorAll('.room_label .label_num');
        // loop 옵션에 따라 realIndex / activeIndex 차이 있으니 realIndex 우선 사용
        const index = (typeof swiper.realIndex === 'number') ? swiper.realIndex : swiper.activeIndex;

        labels.forEach(label => label.classList.remove('active'));
        const target = container.querySelector(`.label_num[data-index="${index + 1}"]`);
        if (target) target.classList.add('active');
    }

    // 각 room_container마다 Swiper 생성 + 라벨 클릭 연동
    roomContainers.forEach(container => {
        const swiperEl = container.querySelector('.swiper');
        const labels   = container.querySelectorAll('.room_label .label_num');

        if (!swiperEl) return;

        const swiper = new Swiper(swiperEl, {
            loop: false, // 필요하면 true로 바꿔도 됨
            centeredSlides: false,
            navigation: {
                // 공용 화살표 사용
                nextEl: '#tower_room .swiper-button-next',
                prevEl: '#tower_room .swiper-button-prev',
            },
            on: {
                init(sw) {
                    updateLabels(sw, container);
                },
                slideChange(sw) {
                    updateLabels(sw, container);
                }
            }
        });

        // 라벨 클릭 → 해당 인덱스로 슬라이드 이동
        labels.forEach(label => {
            label.addEventListener('click', () => {
                const idx = Number(label.dataset.index) - 1;
                swiper.slideTo(idx);
            });
        });

        swipers.set(container.dataset.type, swiper);
    });

    // 타워 선택 시: 이미지 + 룸 컨테이너 + 슬라이드/라벨 초기화
    function setActiveTower(type) {
        // 왼쪽 타워 버튼 active
        towerButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });

        // 왼쪽 타워 이미지 active
        towerImages.forEach(img => {
            img.classList.toggle('active', img.dataset.type === type);
        });

        // 오른쪽 room_container active
        roomContainers.forEach(container => {
            const isActive = container.dataset.type === type;
            container.classList.toggle('active', isActive);

            if (isActive) {
                const swiper = swipers.get(type);
                if (swiper) {
                    // 첫 슬라이드로 이동 + 라벨 초기화
                    swiper.slideTo(0, 0);

                    const labels = container.querySelectorAll('.room_label .label_num');
                    labels.forEach(label => label.classList.remove('active'));
                    const firstLabel = container.querySelector('.room_label .label_num[data-index="1"]');
                    if (firstLabel) firstLabel.classList.add('active');
                }
            }
        });
    }

    // 타워 버튼 클릭 이벤트
    towerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveTower(btn.dataset.type);
        });
    });

    // 초기 상태 세팅 (FOREST TOWER 기준으로 active 있음)
    const firstActiveTower = document.querySelector('#tower_room .tower_list button.active');
    if (firstActiveTower) {
        setActiveTower(firstActiveTower.dataset.type);
    } else if (towerButtons[0]) {
        setActiveTower(towerButtons[0].dataset.type);
    }
});