const API_KEY = "ccdbf7e420eb4695a20fa64168d0d0bd";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{fetchNews("India")});

document.getElementById("nav_logo").addEventListener("click", () => {
    window.location.reload();
});


document.getElementById("ipl").addEventListener("click",()=>{
    let temp1 = document.getElementById("main_content_box");
    temp1.innerHTML="";
    fetchNews("ipl");
})

document.getElementById("Technology").addEventListener("click",()=>{
    let temp1 = document.getElementById("main_content_box");
    temp1.innerHTML="";
    
    fetchNews("Technology");
})


document.getElementById("Finance").addEventListener("click",()=>{
    let temp1 = document.getElementById("main_content_box");
    temp1.innerHTML="";
    
    fetchNews("Finance");
})


document.getElementById("Politics").addEventListener("click",()=>{
    let temp1 = document.getElementById("main_content_box");
    temp1.innerHTML="";
    
    fetchNews("Politics");
})


document.getElementById("search_icon").addEventListener("click",()=>{
    let temp= document.getElementById("bar").value;
    if(!temp){return;}
    else{
        let temp1 = document.getElementById("main_content_box");
        temp1.innerHTML="";
        fetchNews(`${temp}`);   
    }
})

async function fetchNews(query){
    const response=await fetch(`${URL}${query}&apikey=${API_KEY}`);
    const data=await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const main_container = document.getElementById("main_content_box");

    articles.forEach((element) => {
        if(!element.urlToImage){return ;}
        else{
            //step1 create template div
                let box=document.createElement("div");
                    box.className="box";
                    box.id="box";
            
                let image=document.createElement("div");
                    image.className="b_image";
                    image.id="b_image";
            
                let description=document.createElement("div");
                    description.className="b_desc";
                    description.id="b_desc";
            
                let author_container=document.createElement("div");
                    author_container.className="b_author";
                    author_container.id="b_author";
            
                    let author=document.createElement("div");
                        author.className="b_a";
                        author.id="b_a";
                    author_container.appendChild(author);
                    let relase_date=document.createElement("div");
                        relase_date.className="b_p_date";
                        relase_date.id="b_p_date";
                    author_container.appendChild(relase_date);
            
                let content=document.createElement("div");
                    content.className="b_content";
                    content.id="b_content";
            
                box.appendChild(image);
                box.appendChild(description);
                box.appendChild(author_container);
                box.appendChild(content);
            
            //step2 JSON data paste 
            
                let img=document.getElementById("b_image");
                let desc=document.getElementById("b_desc");
                let a_name=document.getElementById("b_a");
                let r_date=document.getElementById("b_p_date");
                let cont=document.getElementById("b_content");

                image.style.backgroundImage = `url(${element.urlToImage})`;
                description.innerHTML = `${element.description}`;
                author.innerHTML = `${element.author}`;

                const d = new Date(element.publishedAt).toDateString("en-US", {
                    timeZone: "Asia/Jakarta",
                });

                relase_date.innerHTML = `${d}`;

                content.innerHTML = `${element.content}`;

            box.addEventListener("click",()=>{
                window.open(element.url, "_blank");
            })

            //step3 Append newly created div in main_container;
                main_container.appendChild(box);

        }
    });
} 

let t=0;
let d_mod = document.getElementById("dark_mode");
d_mod.addEventListener("click",()=>{
    if(t%2==0){
    d_mod.style.backgroundImage= `url("Images/Screenshot\ \(20\).png")`;
    t++;
}
else{
        d_mod.style.backgroundImage= `url("Images/Screenshot\ \(19\).png")`;
        t++;
    }
})