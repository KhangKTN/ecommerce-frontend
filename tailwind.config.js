/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
        'main': ['Nunito', 'sans-serif']
    },
    extend: {
      width: {
        'main': '1180px'
      },
      backgroundColor: {
        'main': '#5BBCFF'
      },
      colors: {
        'main': '#5BBCFF'
      },
      borderColor: {
        'border-main': '#5BBCFF'
      },
      keyframes: {
        'slide-in-top': {
          '0%': {
            '-webkit-transform': 'translateY(-500px)',
                    'transform': 'translateY(-500px)',
            'opacity': '0'
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
                    'transform': 'translateY(0)',
            'opacity': '1'
          }
        },
        'slide-in-bottom': {
          '0%': {
            '-webkit-transform': 'translateY(50px)',
                    'transform': 'translateY(50px)',
            'opacity': '0'
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
                    'transform': 'translateY(0)',
            'opacity': '1'
          }
        },
        'slide-in-left': {
          '0%': {
            '-webkit-transform': 'translateX(-500px)',
                    'transform': 'translateX(-500px)',
            'opacity': '0'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
                    'transform': 'translateX(0)',
            'opacity': '1'
          }
        },
        'slide-in-right': {
          '0%': {
            '-webkit-transform': 'translateX(500px)',
                    'transform': 'translateX(500px)',
            'opacity': '0'
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
                    'transform': 'translateX(0)',
            'opacity': '1'
          }
        },
        'slide-to-bottom': {
          '0%': {
            '-webkit-transform': 'translateY(0)',
                    'transform': 'translateY(0)',
            'opacity': '1'
          },
          '100%': {
            '-webkit-transform': 'translateY(50px)',
                    'transform': 'translateY(50px)',
            'opacity': '0'
          }
        },
        'countdown': {
          '0%': {'width': '100%'},
          '100%': {'width': '0%'},
        },
        'fade-in-fwd': {
          '0%': {
            'transform': 'translateZ(-80px)',
            'opacity': '0'
          },
          '100%': {
            'transform': 'translateZ(0)',
            'opacity': '1'
          },
        },
        'blink': {
          '50%': {
            'border-color': '#ff0000'
          }
        },
        'slide-in-blurred-top': {
          '0%': {
            'transform': 'translateY(-1000px) scaleY(2.5) scaleX(0.2)',
            'transform-origin': '50% 0%',
            'filter': 'blur(40px)',
            'opacity': '0'
          },
          '100%': {
            'transform': 'translateY(0) scaleY(1) scaleX(1)',
            'transform-origin': '50% 50%',
            'filter': 'blur(0)',
            'opacity': '1'
          }
        }
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-bottom': 'slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-to-bottom': 'slide-to-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'countdown-animation': 'countdown 10s linear forwards',
        'fade-in-fwd': 'fade-in-fwd 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'blink': 'blink .5s 5',
        'slide-in-blurred-top': 'slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
      }
  },
  plugins: [],
  }
}

