
/* 
Modify breadcrumbs very slightly
*/
(function() {

    const getAppropriateNavChunk = () => {
        const menu = document.getElementById('superfish-main-accordion');
        const items = menu.querySelectorAll('& > li');
        Array.from(items).forEach( el => {
            console.log(el.querySelector("a:not(.sf-accordion-button)").textContent, el);
            if (el.classList.contains('active-trail')) {
                let subitems = el.querySelectorAll(':scope > ul > li');
                Array.from(subitems).forEach( subitem => {
                    console.log('»»»» ', subitem.querySelector('a:not(.sf-accordion-button').textContent );
                });
            }
        });
    }

    const bc = document.getElementById('block-breadcrumbs');
    let crumbs = bc.querySelectorAll('li.breadcrumb__item'); 
    let home = bc.querySelector('li.breadcrumb__item');
    homeIcon = '<a href="/"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></a>'
    home.innerHTML = homeIcon;
    /* 
    Inserts toggle into final breadcrum if .... 
    */
    const last_crumb = bc.querySelector('li.breadcrumb__item:last-child');
    
    const subnav = document.getElementById("block-mainnavigation");
    const toggle = subnav.querySelector(".sf-accordion-toggle");
    toggle.addEventListener('click', (e)=> {
        e.preventDefault();
        getAppropriateNavChunk();
        
    });
    const label = last_crumb.textContent
    last_crumb.innerHtml = `<span>${label}</span>`;
    last_crumb.append(subnav);
})();
