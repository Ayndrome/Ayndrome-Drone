setTimeout(() => {
  // Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

  
// Canvas setup for frame sequence animation
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 498
};
let imagesLoaded = 0;
const images = [];

function preloadImages(){
  for (var i=0; i<=frames.maxIndex; i++){
    const imageUrl = `https://www-cdn.djiits.com/pre/reactor/assets/uploads/p/1f2bbc69-67d2-40cd-95ea-532e58afc243/${i}.jpg`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      imagesLoaded++;
        
        
      if(imagesLoaded === frames.maxIndex){
        console.log('all images loaded');
        loadImage(frames.currentIndex);
        startAnimation();
      }
    }

    images.push(img);
  }
}

function loadImage(index){
  if (index>=0 && index<=frames.maxIndex){
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth)/2;
    const offsetY = (canvas.height - newHeight)/2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}



function startAnimation(){
  // Initial setup for the Titanium text
  gsap.set(".titanium", {
    opacity: 1,
    scale: 1
  });
  
  // Create a master timeline for coordinating animations
  let master = gsap.timeline({
    scrollTrigger: {
      trigger: "#parent",
      start: "top top",
      end: "+=10000", // Longer scrolling area for both animations
      scrub: true,
      pin: true,
      // markers: true
    }
  });
  
  // Add Titanium animation that finishes quickly (in the first ~20% of scroll)
  master.to(".titanium", {
    scale: 2.5,
    opacity: 0,
    duration: 0.2, // Completes in the first 20% of the scroll
    ease: "power2.inOut"
  }, 0);

  master.to(".cinematic-2", {
scrollTrigger: {
// markers: true,
start: "top+=7000 center",   
end: "top+=7500 top",     
toggleActions: "play none none reverse",
onEnter: () => gsap.set(".cinematic-2", { visibility: "visible" }),
onLeave: () => gsap.set(".cinematic-2", { visibility: "hidden" }),
onEnterBack: () => gsap.set(".cinematic-2", { visibility: "visible" }),
onLeaveBack: () => gsap.set(".cinematic-2", { visibility: "hidden" })
}
});
  master.to(".cinematic-1", {
scrollTrigger: {
// markers: true,
start: "top+=8000 center",   
end: "top+=8500 top",    
toggleActions: "play none none reverse", 
onEnter: () => gsap.set(".cinematic-1", { visibility: "visible" }),
onLeave: () => gsap.set(".cinematic-1", { visibility: "hidden" }),
onEnterBack: () => gsap.set(".cinematic-1", { visibility: "visible" }),
onLeaveBack: () => gsap.set(".cinematic-1", { visibility: "hidden" })
}
});

  
  // Add frame sequence animation that continues through the entire scroll
  master.to(frames, {
    currentIndex: frames.maxIndex,
    duration: 1, // Uses the full scroll range
    ease: "none",
    onUpdate: function(){
      loadImage(Math.floor(frames.currentIndex));
    }
  }, 0);

  // Update on window resize
  window.addEventListener("resize", () => {
    loadImage(frames.currentIndex);
    ScrollTrigger.refresh();
  });
}

// Ensure canvas fills viewport correctly
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  if (imagesLoaded > 0 && frames.currentIndex >= 0) {
    loadImage(frames.currentIndex);
  }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

preloadImages();

gsap.registerPlugin(ScrollTrigger);

var time = gsap.timeline({
scrollTrigger: {  
trigger: ".textRevealWrapper",
start: "10000 center",
end: "bottom bottom",
scrub: 1,
pin: ".textRevealWrapper",
// markers: true,
}
});
time.to(".reveal-text", {
  opacity : 1,
  scale : 1.1 ,
  ease : "expoScale(0.5,7,none)",
})


gsap.to(".videoContainer", {
scrollTrigger : {
trigger: ".videoScaleWrapper",
start : "top+=10000 25%",
end : "bottom top",
scrub : 0.8,
// markers : true,
pin : ".videoScaleWrapper",
invalidateOnRefresh: true,
},
width : "100%",
height : "100%",
ease : "slow(0.1,0.3,true)"
})


var timeline2 = gsap.timeline({
scrollTrigger: {
trigger: ".videoHoverWrapper",
start: "top+=10000 top",
end: "top+=11200 top",
scrub: 1,
pin: true,
pinSpacing: true,
invalidateOnRefresh: true,
// markers: {
//   startColor: "blue",
//   endColor: "blue",
//   fontSize: "12px"
// },
pinReparent: true
}
});


timeline2.to(".videoTextReveal", {
y:-600,
ease: "power4.out",
opacity : "100%",
scale: 1.1,
})



// var timeline3 = gsap.timeline({
//   scrollTrigger : {
//     trigger : ".arrow-Wrapper",
//     start: "top+=10000 center",
//     end : "top+=10300 center",
//     markers: {
//       startColor: "pink",
//       endColor: "pink",
//       fontSize: "12px"
//     },
//     scrub : 1,
//   }
// })

// timeline3.to(".arrow", {
//    height : "50vh",
// }).to(".circle-element", {
//   scale : 1,
// })


// const lineCircleTimeline = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".line-and-circle-container",
//     start: "top+=9900 center",
//     end : "top+=10300 center", 
//     markers: {
//       startColor: "pink",
//       endColor: "pink",
//       fontSize: "12px"
//     },
//     srcub : 1,
//   }
// });


// lineCircleTimeline
//   .to(".arrow", {
//     height: "50vh",
//     ease: "none"
//   }, 0) 
//   .to(".circle-element", {
//     scale: 1,
//     top: "calc(15% + 50vh - 4px)",
//     ease: "none"
//   }, 0); 


const lineCircleTimeline = gsap.timeline({
scrollTrigger: {
trigger: ".line-and-circle-container",
start: "top+=9900 center", 
end: "top+=10300 center", 
scrub: true, 
// markers: true, 
}
});

// Add animations to the timeline
lineCircleTimeline
.to(".arrow", {
height: "50vh",
ease: "none" 
}, 0)
.to(".circle-element", {
scale: 1,
top: "calc(15% + 50vh - 4px)",
ease: "none" 
}, 0);



if (document.querySelector(".modelContainer")) {
  var modelContainerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".modelContainer",
      start: "top+=10000 25%",
      end: "top+=11000 top",
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      pinReparent: true,
      scrub: 0.6,
      
    }
  });

  modelContainerTimeline.set(".parallax-content", {
    y: 200,
    opacity: 0,
  });
  modelContainerTimeline.to(".parallax-content", {
    y: -600,
    ease: "slow(0.1,0.3,true)",
    opacity: "100%",
  });
}


}, 100);


