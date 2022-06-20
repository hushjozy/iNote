const arrayIds=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
let elements = document.getElementsByClassName("leftone")
let randomId = `ballId${Math.floor(Math.random()*10)}`
const sectionTwo = document.querySelector('pagetwo')
const header = document.querySelector('.header')
const paragraph = document.querySelector('.paragraph')
const headTwo = document.querySelector('.head-two')
const pTwo = document.querySelector('.p-two')
const fadeWave = document.querySelector('.fade-wave')
const staticBlob = document.querySelector('.static')
const surfOne = document.querySelector('.surf1')
const surfTwo = document.querySelector('.surf2')
const surfThree = document.querySelector('.surf3')

const comb = header 

const faders = document.querySelectorAll('.fade-in')



setInterval(
function bounceTheseBalls(){
  for (var i = 0; i < elements.length; i++) {
      arrayIds.map(item => {
        let randomAxisX = `${Math.floor(Math.random()*100)*10}px`;
        let randomAxisY = `${Math.floor(Math.random()*70)*10}px`
        // document.getElementById('rotateit').style.transform=`rotate3d(1, 1, 1, 297deg)`
        // document.getElementById('rotateit').style.transition=`transform 2s ease-in`
        document.getElementById(`ballId${item}`).style.transform=`translate(${randomAxisX}, ${randomAxisY}) scale(0.3)`
        document.getElementById(`ballId${item}`).style.transition=`transform 1.2s ease-in`
  })
  }
}, 1200)
 function getEntries(){
  // console.log (header.classList+ " "+ window.pageYOffset)
  faders.forEach(fader => {
if (window.pageYOffset >= 500 && window.pageYOffset < 1100 ) {
  fader.classList.add("appear")
    header.classList.add("from-left")
    paragraph.classList.add("from-right")
    fadeWave.classList.add("wave-in")
    surfOne.classList.add("wave4")
        surfTwo.classList.add("wave5")
        surfThree.classList.add("wave6")
} else if(window.pageYOffset < 500 || window.pageYOffset > 1100 ) {
  // fader.classList.remove("appear")
  header.classList.remove("from-left")
    paragraph.classList.remove("from-right")
    fadeWave.classList.remove("wave-in")
    if (window.pageYOffset >= 1001) {
      console.log( window.pageYOffset +" i am way off")
      headTwo.classList.add("left-right")
        pTwo.classList.add("right-left")
        staticBlob.classList.add("blob-in")
    }else{
      console.log('piss out')
      headTwo.classList.remove("left-right")
        pTwo.classList.remove("right-left")
        staticBlob.classList.remove("blob-in")
    }
}

})

 }
 window.addEventListener('scroll', getEntries);

 for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('mouseover', bounceTheseBalls,false);

 console.log(elements[i])
 }

