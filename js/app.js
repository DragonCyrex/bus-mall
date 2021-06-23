
'use strict';

let productArray = [
  'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg',
  'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
  'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
];

const firstPic = document.getElementById( 'firstPic' );
const secondPic = document.getElementById( 'secondPic' );
const thirdPic = document.getElementById( 'thirdPic' );
const button = document.getElementById( 'button' );

let leftPIndex = 0;
let midPIndex = 0;
let lastPIndex = 0;
const clickCounter = 25;

function Product( name ,image ) {
  this.name = name;
  this.image = `./img/${image}`;
  this.clicks = 0;
  this.shown = 0;
  Product.all.push( this );
}

Product.all = [];
Product.counter = 0;

function getName( fileName ) {
  return fileName.split( '.' ).slice( 0, -1 ).join( '.' );
}


for( let i = 0; i < productArray.length; i++ ) {
  new Product( getName( productArray[i] ), productArray[i] );


}

let indexs = [];

function renderNewProduct() {

  let index = randomNumber( 0, Product.all.length - 1 );

  firstPic.src = Product.all[index].image;
  firstPic.alt = Product.all[index].name;
  leftPIndex = index;
  indexs.push( index );
  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Product.all.length - 1 );
  } while( index === rightIndex );
  indexs.push( rightIndex );

  secondPic.src = Product.all[rightIndex].image;
  secondPic.alt = Product.all[rightIndex].name;
  midPIndex = rightIndex;
  let lastIndex;
  do{
    lastIndex = randomNumber( 0,Product.all.length - 1 );
  }while( index === lastIndex || rightIndex === lastIndex );
  indexs.push( lastIndex );

  thirdPic.src = Product.all[lastIndex].image;
  thirdPic.alt = Product.all[lastIndex].name;
  lastPIndex = lastIndex;

  Product.all[index].shown++;
  Product.all[rightIndex].shown++;
  Product.all[lastIndex].shown++;

}


function handelClick( event ) {

  if( Product.counter < clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'firstPic' || clickedElement.id === 'secondPic' || clickedElement.id === 'thirdPic' ) {
      if( clickedElement.id === 'firstPic' ) {
        Product.all[leftPIndex].clicks++;
      }

      if( clickedElement.id === 'secondPic' ) {
        Product.all[midPIndex].clicks++;
      }
      if( clickedElement.id === 'thirdPic' ){
        Product.all[lastPIndex].clicks++;
      }

      Product.counter++;
      renderNewProduct();


    }
  }removeEventListener( 'click',handelClick );

  button.addEventListener( 'click',handelButton );
}

function handelButton( ){
  const parentElement = document.getElementById( 'ol' );

  for( let i = 0;i < Product.all.length;i++ ){
    const li = document.createElement( 'li' );
    parentElement.appendChild( li );
    li.textContent = `${Product.all[i].name} is clicked ${Product.all[i].clicks} and shown ${Product.all[i].shown}`;
  }

  renderChart();

  button.removeEventListener( 'click',handelButton );
  button.innerText = 'reset';
  button.onclick = function(){
    location.reload();
  };
}


firstPic.addEventListener( 'click',handelClick );
secondPic.addEventListener( 'click',handelClick );
thirdPic.addEventListener( 'click',handelClick );


function randomNumber( min, max ) {

  let index2 = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  for( let i = 0;i < indexs.length;i++ ){
    if ( index2 === indexs[i] ){
      index2 = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
  }return( index2 );

}





renderNewProduct();

function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let shownArray = [];
  for( let i = 0; i < Product.all.length; i++ ) {
    nameArray.push( Product.all[i].name );
    clicksArray.push( Product.all[i].clicks );
    shownArray.push( Product.all[i].shown );

  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Votes',
          data: clicksArray,
          backgroundColor: 'rgba( 0, 0, 0, 0.8 )',
          borderColor: '#000000',
          borderWidth: 3
        },
        {
          label: '# of shown',
          data: shownArray,
          backgroundColor:'red',
          borderColor: '#000000',
          borderWidth: 3
        }
      ]

    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}
