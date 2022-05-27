async function renderData() {
    let sectionData = await getMainSection();
    let html = '';
    sectionData.forEach(element => {
        if (element.isAdd) {
            html += `<article>`;
            element.sectionUrl.map(url => {
                html += ` <img src="${'images/' + url}">`
            })
            html += `</article>`;
        } else {
           
            let newsDesc = '<div>';
            element.newsTitle.map(news => {
                let tempText =  news.startImg ? '<img class="clockIcon" src="images/start1.png"/>' : ""
                    tempText +=  news.headingColor == 'red' ? '<span class="redHeading">'+news.startHeading+' </span>' : news.headingColor == "blue" ? '<span class="blueHeading">'+news.startHeading+' </span>' : ""
                let newsImg = "";
                if(news.imageSrc){
                    newsImg = `<img class="newsImage" src="images/${news.imageSrc}">`;
                }
                newsDesc += `<div><p class="newsTitle ${news.isUpperCase =="upperCase" ? "upperCase" : news.isUpperCase == "bold"? "bold" : ""}">  ${tempText + news.newsDesc}</p>${newsImg}</div>`
                if(!news.hideComment){
                    let comments = news.comments ? news.comments : "";
                newsDesc += `<div class="dottedBorder"> <img class="clockIcon" src="images/clockIcon.png"/><span>${comments}</span><img class="clockIcon" src="images/messageIcon.png"/></div> </div>`    
                }
            })
                       let htmlSegment = `<article>
                                   <img src="${'images/' + element.sectionUrl}" >
                                   ${newsDesc}
                               </div>
                           </article>`;

            html += htmlSegment;
        }
    });

 
    let mainContainer = document.querySelector('.main-container-left');
    mainContainer.innerHTML = `<div class="container-bottom-left"></div>`;

    let container = document.querySelector('.container-bottom-left');
    container.innerHTML = html;
}
renderData();


async function getMainSection() {
    let response = [];
    await fetch('https://jsonkeeper.com/b/KS6G')
        .then(response => response.json())
        .then(json => { response = json.data; })
        .catch(err => console.log('Request Failed', err));
    return response;
}

async function getCollectionType() {
    let response = [];
    await fetch('https://jsonkeeper.com/b/1VX1')
        .then(response => response.json())
        .then(json => { response = json.data; })
        .catch(err => console.log('Request Failed', err));
    return response;
}


