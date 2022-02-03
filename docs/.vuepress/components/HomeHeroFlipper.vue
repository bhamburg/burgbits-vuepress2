<template>
  <div 
    v-on:click="flip"
    :class="['flip-card', {active: flipped}]"
    title="Click me!"
  >
    <div class="flip-card-inner">
      <a class="flip-card-front">
        <img 
          src="/images/brian-hamburg-profile-photo-DICE2019.jpeg" 
          alt="Brian Hamburg"
        />
      </a>
      <a class="flip-card-back">
        <img :src="photos[photoIndex].src" :alt="photos[photoIndex].alt" />
      </a>
    </div>
  </div>
</template>

<style>
  /* hide hero image and adjust margins for flip card */
  .home .hero > img {
    visibility: hidden;
  }
  @media (max-width: 419px) {
    .home .hero .flip-card img {
      max-height: 210px;
      margin: 1.2rem auto 2rem;
    }
  }
  .home .hero .flip-card img {
    max-height: 280px;
    margin: 1.5rem auto 3rem;
  }

  /* flip card styles */
  .flip-card {
    background-color: transparent;
    cursor: pointer;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card.active .flip-card-inner {
    transform: rotateY(540deg);
  }

  /* Position the front and back side */
  .flip-card-front, .flip-card-back {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  /* Style the back side */
  .flip-card-back {
    transform: rotateY(180deg);
  }
</style>

<script>
  export default {
    data () {
      let flipped = false;
      let flipping = false;
      let photoIndex = 0;
      let photos = [
        {
          'src': '/images/hero/2015-mummers-parade.jpg',
          'alt': '2015 Mummers Parade'
        },
        {
          'src': '/images/hero/2022-mummers-parade.jpg',
          'alt': '2022 Mummers Parade'
        },
        {
          'src': '/images/hero/at-cannstatters.jpg',
          'alt': 'Summer with the Twins'
        },
        {
          'src': '/images/hero/christmas-2020.jpg',
          'alt': 'Christmas 2020'
        },
        {
          'src': '/images/hero/disney-world.jpg',
          'alt': 'Magic Kingdom'
        },
        {
          'src': '/images/hero/Hamburg-family-beach.jpg',
          'alt': 'On the beach'
        },
        {
          'src': '/images/hero/july-4th-2020.jpg',
          'alt': 'Fourth of July'
        },
        {
          'src': '/images/hero/love-phila.jpg',
          'alt': 'With Love, Philadelphia'
        },
        {
          'src': '/images/hero/midnight-society.jpg',
          'alt': 'Drew Nugent and the Midnight Society gig'
        },
        {
          'src': '/images/hero/night-out.jpg',
          'alt': 'fancy night out'
        },
        {
          'src': '/images/hero/ramblers-bookstore.jpg',
          'alt': 'Red Hot Ramblers at the Bookstore Speakeasy'
        },
        {
          'src': '/images/hero/the-claw.jpg',
          'alt': 'claw machine halloween costume'
        },
        {
          'src': '/images/hero/vegavox.jpg',
          'alt': 'Vegavox banjo'
        },
        {
          'src': '/images/hero/wedding-city-hall.jpg',
          'alt': 'wedding photo at city hall'
        },
        {
          'src': '/images/hero/with-fralinger-shades.jpg',
          'alt': 'banjo with shades'
        },
        {
          'src': '/images/hero/work-at-dice.jpg',
          'alt': 'at work'
        },
      ];
      return {
        flipped,
        flipping,
        photoIndex,
        photos
      }
    },
    mounted() {
      // preload images
      this.$nextTick(function () {
        for (var i = 0; i < this.photos.length; i++) {
          let tempImage = new Image();
          tempImage.src = this.photos[i];
        }
      })

      // replace hero image with flipper
      // THIS IS NOT THE VUE WAY!!! :-(
      let hero = document.querySelector('header.hero');
      let flipper = document.querySelector('.flip-card');
      hero.prepend(flipper);

      // auto flip after 8 seconds
      setInterval(()=>{
        this.flip();
      },10000)
    },
    methods: {
      flip: function() {
        if (!this.flipping) {
          this.flipping = true;
          this.flipped = !this.flipped;
          if (!this.flipped) {
            setTimeout(() => {
              this.photoIndex = Math.floor(Math.random() * this.photos.length); // choose random photo from array
            }, 800); // wait until animation finishes to load next image
          }
          setTimeout(() => { this.flipping = false }, 1000); // throttle flipping
        }
      }
    }
  }
</script>
