const links = document.querySelectorAll(".links");
const slides = document.querySelectorAll(".slide");
const wrapper = document.getElementById("outer-wrapper");
const circle = document.getElementById('spotlight');

const text1 = document.getElementById('one-text1');
const text2 = document.getElementById('one-text2');
const text3 = document.getElementById('one-text3');


const stickytexts = document.querySelectorAll(".text-sticky");
let circx = 0;
let currentcircx = parseInt(circle.style.left.replace("px", ""));
let stopShowingText = false;
const textPos = new Map(); 


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
console.log(vw);
// alert("Hey, this site currently under construction, so some images and features are missing.");
let pos1; 
wrapper.addEventListener('mousemove', function(e) { // the hover spotlight
    let left = e.clientX;
    let top = e.clientY;
    circle.style.left = (wrapper.scrollTop + left) + 'px';
    circle.style.top = top + 'px';
    circx = e.clientX;
    console.log(currentcircx);
  });
//throttle scroll event, maybe with iodash?? 

//function to toggle hidden/shown classes based on current scroll distance >= or <=
//make sure elements line up... 
wrapper.addEventListener('scroll', (e) => {
    stickytexts.forEach((text) => {
        if(textPos.has(text.id) && text.classList.contains("text-show") && stopShowingText === false) {
            console.log("passed");
            let dist = wrapper.scrollTop - textPos.get(text.id) - vw/10;
            //text.style.left = (parseFloat(text.style.left.replace("px", "")) + dist) + "px";
            text.style.transform = `translateX(${dist}px)`;
            //get client rects??
        }
    })
    if(textPos.has(stickytexts[1].id) && (Math.abs(wrapper.scrollTop - textPos.get(stickytexts[1].id)) >= (vh * 2))) {
        console.log("removed all");
        stopShowingText = true;
        pos1 = textPos.get(text1.id);
        stickytexts.forEach((text) => {
            text.classList.remove("text-show");
            textPos.delete(text.id);
        })
    }
    circle.style.left = circx + wrapper.scrollTop + 'px';
    currentcircx = parseInt(circle.style.left.replace("px", ""));

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
                    link.classList.add("bolden-link");
                } else if(link.classList.contains("bolden-link")) {
                    link.classList.remove("bolden-link");
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
document.addEventListener('click', (e) => {
    console.log(wrapper.scrollTop);
});
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
//todo: check viewport position and update based on if rect.left is less 
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.left <= (window.innerWidth / 3) &&
        rect.right >= window.innerWidth * 2 / 3
    );
}

function arraysEqual(a, b) {
    if (a == null || b == null) {
        return false
    };
    const passed = false;
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
            if(link2.classList.contains("bolden-link")) link2.classList.remove("bolden-link");
        })
        link.classList.add("bolden-link");
        
    });
});
const windowcontainer = document.querySelectorAll('outer-wrapper');


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
 function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
  }
 
 function getDistanceBetweenElements(a, b) {
   const aPosition = getPositionAtCenter(a);
   const bPosition = getPositionAtCenter(b);
 
   return Math.sqrt(Math.pow(aPosition.x - bPosition.x, 2));  
 }
 
 const offset = getDistanceBetweenElements(text2, text1);
 const offset2 = getDistanceBetweenElements(text3, text1);


 console.log("offset " + offset);
 console.log("offset2 " + offset2); 

 const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    })
  });
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//offset is updating...
const textobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            stopShowingText = false;
            entry.target.classList.add('text-show');
            entry.target.classList.remove('text-hidden');
            console.log("shown!");
            if(!textPos.has(text1.id)) {
                if (Number.isFinite(pos1)) {
                    textPos.set(text1.id, pos1);
                } else {
                    textPos.set(text1.id, wrapper.scrollTop);

                }
                textPos.set(text2.id, (textPos.get(text1.id) + offset * 0.8))
                textPos.set(text3.id, (textPos.get(text1.id) + offset2 * 0.8))
                console.log("1.. " + textPos.get(text1.id));
                console.log("2.. " + textPos.get(text2.id));
                console.log("3.. " + textPos.get(text3.id));
            }
        } else {
            entry.target.classList.remove('text-show');
            entry.target.classList.add('text-hidden');
        }
    })
    
}, {
    rootMargin: "-15%",
    threshold: 0.75
})
const hiddenText = document.querySelectorAll('.text-hidden');
hiddenText.forEach((el) => textobserver.observe(el));
//https://youtube.com/shorts/VTw2cUVFl1c?feature=share

//1495
//maintain offset ratio of around 0.77??
//offset 1155.29150390625
//offset2 2408.70849609375