
/* 
Modify breadcrumbs very slightly
*/
(function() {

    let current_subnav;
    let child_nav;
    const bc = document.getElementById('block-breadcrumbs'); // the breadcrumb container
    const subnav = document.getElementById("block-mainnavigation"); // the full tree to work off
    const toggle = subnav.querySelector(".sf-accordion-toggle"); // the button that toggles the nav 

    const first_crumb = bc.querySelector('li.breadcrumb__item');
    const last_crumb = bc.querySelector('li.breadcrumb__item:last-child');

    /* 
    A little prepping of the final crumb
    Then we append the whole subnav in the final crumb */
    last_crumb.append(subnav); // could clone the node here too, to leave the existing one in place.
    /*
    Replace the first breadcrumb label with a home icon */
    const home_icon = '<a href="/"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></a>'
    first_crumb.innerHTML = home_icon;

    /*
    Basically walk the tree following active trails, and setting child_nav to the final UL in the tree */
    const recurse_active_trail = (el) => {
        const next_active = el.querySelector('.active-trail');
        if( next_active ) {
            current_subnav = next_active;
            recurse_active_trail(next_active);
        } else {
            child_nav = current_subnav.querySelector('ul');
        }
    }
    recurse_active_trail(subnav);

    function getElementOffset(element, property) {
        //Calculate the actual property name
        property = "offset"+property[0].toUpperCase()+property.slice(1).toLowerCase();
        if (property == "offsetLeft" || property == "offsetTop") {
            var actualOffset = element[property];
            var current = element.offsetParent;

            //Look up the node tree to add up all the offset value
            while (current != null) {
                actualOffset += current[property];
                current = current.offsetParent;
            }

            return actualOffset;
        } else if (property == "offsetHeight" || property == "offsetWidth") {
            return element[property];
        }
        return false;
    }

    // pop a copy into the last crumb
    const cn = child_nav.cloneNode(true);
    cn.id = "zivjhurs__child_nav"
    cn.classList.add('child_nav'); // a little useful selector
    bc.append(cn);

    /*
    close the child_nav when clicking outside of the last_crumb */
    document.addEventListener('click', event => {
        if( event.target.id != "superfish-main-toggle") {
            const clicked_inside = cn.contains(event.target)
            if (!clicked_inside && cn.classList.contains('open')) {
                cn.classList.add('sf-hidden');
                cn.classList.remove('open');
            }
        }
    })

    toggle.addEventListener('click', event => {
        console.log( event.target.getBoundingClientRect());
        event.preventDefault();
        /* maybe able to just rely on the removing of sf-hidden */
        if(window.innerWidth > 1000) {
            const rect = event.target.getBoundingClientRect();
            if( rect.x < window.innerWidth*0.5 ) {
                cn.style.left =  rect.x + 'px';
                cn.style.right = 'auto';
            } else {
                cn.style.left =  'auto';
                cn.style.right = '3.5rem';

            }
            cn.style.top = rect.height + 16 + 'px';
        }
        cn.classList.remove('sf-hidden');
        cn.classList.add('open');
        cn.querySelector('a').focus();
    });
    
})();

/* 

- Todo:
    Consider changing icon on toggle on click / hover states on final crumb

- Todo:
    Consider attaching the click listener to the whole final crumb rather than just the toggle

- Todo:
    The copied nav, still has additional depth we dont need, affecting the tab navigation
    (Tabbing through still traverses the hidden items.... 
    there maybe some pragmatic quick fixes or it's a site building issue.)

- Todo:
    May need to skip all of this, if there are no child pages.
    Whats the best way to determine this? - match some kind of ID? use TextContent
    Or is the recursive bit the trick?

- Ellipsis:
    The ellipsis truncation can be much improved using js (moved to the middle of the word).

- Recommendation:
    Add title tags, to the subnav menu and breadcrumb links (as well as final breadcrumb)
    Consider "Click to see pages in this section" or something similar

    Currently favicon is the drupal logo in search results
*/
