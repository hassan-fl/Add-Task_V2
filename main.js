let task = document.getElementById("adt");
let filt = document.getElementById("filt");
let tasks = document.querySelector(".tasks");
let arr = [];
let id = 0;


window.onload = function(){
    if(localStorage.length === 0) return;
    arr.push(...JSON.parse(localStorage.getItem("tasks")));
    [...JSON.parse(localStorage.getItem("tasks"))].forEach((e)=>{
        let div = document.createElement("div");
        div.id = e.id;
        div.title = e.title;
        div.innerHTML = e.content;

        tasks.appendChild(div);
    })
};


document.addEventListener("click",(e)=>{
    if (!(e.target.value == "Add Task")) return;
    if (!task.value) return;
    
    let div = document.createElement("div");
    let p = document.createElement("p");
    let ii = document.createElement("i");
    id++;

    ii.className = "fa-solid fa-xmark";
    ii.id = `i0${id}`;
    p.innerHTML = task.value
    p.setAttribute("data-line","false")
    div.id = `d0${id}`;
    div.title = task.value;
    
    
    div.appendChild(p);
    div.appendChild(ii);
    tasks.appendChild(div);
    
    arr.push({id:`d0${id}`,title:task.value,content:div.innerHTML});

    localStorage.setItem("tasks",JSON.stringify(arr));
});

function line(eve){
    eve.target.style.textDecoration = "line-through"
}

filt.addEventListener("input",(ee)=>{
    if (filt.value && filt.value != ""){
        [...tasks.children].forEach((e)=> e.remove());
        [...JSON.parse(localStorage.getItem("tasks"))].forEach(function(e){
            // console.log()
            if(e.content.includes(filt.value) || e.content.toLowerCase().includes(filt.value)){
                let div = document.createElement("div");
                div.id = e.id;
                div.title = e.title;
                div.innerHTML = e.content;

                tasks.appendChild(div);
                console.log("here")
            }
        })
    }else{
        [...JSON.parse(localStorage.getItem("tasks"))].forEach((e)=>{
            let div = document.createElement("div");
            div.id = e.id;
            div.title = e.title;
            div.innerHTML = e.content;
    
            tasks.appendChild(div);
        })
    }
})

document.addEventListener("click",function(ee){
    if(!(ee.target.className === "fa-solid fa-xmark")) return;
    arr = [...JSON.parse(localStorage.getItem("tasks"))];
    arr.forEach((e,i)=>{
        if(e.id === document.querySelector(`div:has(> #${ee.target.id})`).id){
            arr.splice(i,1);
        }
    })
    localStorage.setItem("tasks",JSON.stringify(arr));
    document.querySelector(`div:has(> #${ee.target.id})`).remove();
});

    document.addEventListener("click",(e)=>{
        if(!(e.target.dataset.line) ) return;
        e.target.style.textDecoration = "line-through"
        
    })


document.addEventListener("click",(e)=>{
    if (!(e.target.value == "Clear Tasks")) return;
    [...tasks.children].forEach((e)=> e.remove());
    localStorage.clear()
});