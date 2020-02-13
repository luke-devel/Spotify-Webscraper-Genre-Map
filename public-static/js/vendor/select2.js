/* 
=============================================================
CSS RESET
=============================================================
*/

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


/* 
=============================================================
FONTS
=============================================================
*/

h1 { 
    font-family: 'Heebo', sans-serif;
}
h2 {
    font-family: 'Cabin', sans-serif;
}
h3 {
    font-family: 'Heebo', sans-serif;
    font-size: 2rem;
}
h4 {
    font-family: 'Cabin', sans-serif;
   
}
p {
    font-family: 'Noto Serif SC', serif;
}
option {
    color: #C4FA70; 
    font-family: 'Heebo', sans-serif;
    font-size: 1.5rem;
    line-height: 2rem;
}
body {
    background-color: #030303;
}

/* 
=============================================================
CUSTOM ITEMS (SPECIFIC CLASS AND ID STYLING)
=============================================================
*/
.w3-bar {
    height: 7.5rem;
    border-bottom: .1rem solid #FF8AE3;
  
}
.w3-bar-item {
    font-family: 'Heebo', sans-serif;
    margin-left: 3.5rem;
    margin-bottom: 1rem;
}


#trackingGenre{
   color: #C4FA70;
   margin-left: 2rem;
   padding-bottom: 2rem;
   font-size: 2rem;
};
.select2-container {
    margin-right: .5rem;
 
}

#month.textContent{
    color: #030303;
    font-size: 1.2rem;

} 
#slider {
    color: #E52797;
}
#sliderHead {
  color: #030303;
  font-size: 1.4rem;
  color: #E52797;
}
#instructions{
    font-size: 2rem;
    color: #C4FA70;
    /* filter: opacity( 0.9);
    filter: color(#FF8AE3); */

}

#instructionsBody {
    padding-left: 1rem;
    font-size: 1.3rem;
    font-family: 'Heebo', sans-serif;
    filter: opacity( 0.95);
    filter: color(#FF8AE3);
}
.js-example-data-ajax {
    height:1.5rem;
}

#currentlytracking{
    padding-bottom: .5rem;
    
}
    .select2 {
        margin-right: 2rem;
 
    }
#searchGenre{
    float: right;
    background: #030303;
    }

    @media only screen and (max-width: 1200px) {
 
   #searchGenre {
        padding-right: 1rem;
    }
}
    @media only screen and (max-width: 850px) {
 
        #searchGenre {
            padding-right: 1rem;
        }
    }
    @media only screen and (max-width: 700px) {
 
        #searchGenre {
            margin-right: 2rem;
        }
    }
@media only screen and (max-width: 500px) {
    #searchGenre {
        margin-right: .4rem;
    }
    #trackingGenre {
        margin-right: .3rem;
    }
    #instructions{
        font-size: 1.2rem;
        color: #C4FA70;
    }
    #instructionsBody {
        padding-left: .5rem;
        font-size: 1.1rem;
        font-family: 'Heebo', sans-serif;
    }
    #map-overlay {
        color: #030303;
        size: 1.5;
        font-size: .8rem;
      }
    #month {
        font-size: .7rem;
    }
    #searchGenre{
        float: right;
        /* margin-right: .3rem; */
        }
    #slider {
        background-color: #E52797;
    }
    #sliderHead {
      color: #E52797;
      font-size: .8rem;
    }
    #trackingGenre {
        font-size: 1.5rem;
        width: 50%;
        margin-bottom: .3rem;
    }
 
    option {
        font-size: 1.1rem;
    }
  }
