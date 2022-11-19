const links = document.querySelectorAll(".links");
const slides = document.querySelectorAll(".slide");

let insta = document.getElementById("instagram_id");
insta.addEventListener("mouseleave", function (event) {
    if(insta.classList.contains("insta-background")) {
        insta.classList.remove("insta-background");
    }
}, false);
insta.addEventListener("mouseover", function (event) {
  insta.classList.add("insta-background");
  insta.style.opacity = 1;
}, false);

var slides_active = [false, false, false, false];
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.left >= -1 * (window.innerWidth/3) && 
        rect.left <= (window.innerWidth / 3) &&
        rect.right >= window.innerWidth * 2 / 3
    );
}

function arraysEqual(a, b) {
    if (a == null || b == null) {
        //console.log("null");
        return false
    };
    const passed = false;
    //console.log(a.indexOf(true));
    if (a.indexOf(true) === b.indexOf(true) && a.indexOf(true) !== -1) return true;
    
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
      if(a[i] === true) passed == true;
    }
    if (a === b && passed === true) return true;
    return false;
}
links.forEach(link => {
    link.addEventListener('click', function () {
        links.forEach((link2) => {
            if(link2.classList.contains("underline-link")) link2.classList.remove("underline-link");
        })
        link.classList.add("underline-link");
        
    });
});
const windowcontainer = document.querySelectorAll('outer-wrapper');
document.addEventListener('wheel', function(){
    let i = 0;
    const slides_active2 = []
    
    slides.forEach(slide =>{
        const inView = isInViewport(slide)
        slides_active2.push(inView)
    })
    if(arraysEqual(slides_active, slides_active2)) {
        // has changed and is not all false
        if(slides_active2.indexOf(true) !== -1) {
            let j = 0; 
            links.forEach((link) => {
                if(j === slides_active2.indexOf(true)){
                    link.classList.add("underline-link");
                } else if(link.classList.contains("underline-link")) {
                    link.classList.remove("underline-link");
                }
                j++;
                //add to a link-normal that will take the place of "a" when transition is done
                //gave up and just made the text bold instead oh well
                //also just realized my logic is reversed so the code should have run when !arraysEqual
            })
        }
        //console.log('equal');
        //console.log('index: ' + slides_active2.indexOf(true));
    }
    //console.log(slides_active2);

    slides_active = Array.from(slides_active2);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
//TODO: 
/**
 * animate webkit circle (instagram)
 * color scheme
 * 
 * 
 */
 const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
      console.log(entry.intersectionRatio + entry)
    }, {
        threshold: 0.5,
        root: document.querySelector("#three-events-flex")
    })
  });
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
//https://youtube.com/shorts/VTw2cUVFl1c?feature=share