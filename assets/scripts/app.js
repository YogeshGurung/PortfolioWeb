// slider code
$(function () {
    const slider = $(".slider");
    const slides = $(".slide");
    const next = $(".nav__next");
    const prev = $(".nav__prev");
    let currentSlide = 0;
    let waiting = true; // seconds;
    let intervalID;
    let timeoutID;
    let timeoutID2;

    function animate(forward) {
        let nextSlide = currentSlide + 1 < slides.length ? currentSlide + 1 : 0;
        let prevSlide = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide -1;

        let right  = ((forward ? nextSlide : prevSlide) * 100) + "%";
        currentSlide = forward ? nextSlide : prevSlide;

        slides.css("right", right);
    };

    function run() {
        clearInterval(intervalID);
        clearTimeout(timeoutID);
        clearTimeout(timeoutID2);


        intervalID = setInterval(() => {
            if(waiting) return;
    
            waiting = true;
    
            timeoutID2 = setTimeout(() => waiting = false, 3000);
    
            animate(true);
        }, 500);

        timeoutID = setTimeout(() => waiting = false, 3000);
    }

    $(".slide--fullheight img").each((id, img) => {
        const src = img.src;
        $(img).parent().css({ "background-image": src });
    });

    slides.hover(e => pause = true, e => pause = false);

    next.click(function () {
        waiting = true;
        animate(true);
        run();
    });

    prev.click(function () {
        waiting = true;
        animate(false);
        run();
    });

    run();
});