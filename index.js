const image = document.querySelector("#uploadimg");
const input = document.querySelector("input");
input.addEventListener("change",() => {
    image.src = URL.createObjectURL(input.files[0]);
});
let downloadURL;
const downloadimage = document.querySelector("#downloadimg");
const convert = document.querySelector("#convertbutton");
convert.addEventListener("click",()=> {
     const formData = new FormData();
     formData.append("image_file" , input.files[0]);
     const apikey = "7385573d880cecda3f397dfaaa9e7a699ae140c1"; 
     fetch("https://sdk.photoroom.com/v1/segment",{
        method : "POST",
        headers:{
            "X-Api-Key": apikey,
        },
        body :formData
     })
     .then(function(response){
        return response.blob();
     })
     .then(function(blob){
        const url = URL.createObjectURL(blob);
        downloadURL = url;
        downloadimage.src = url;
     })
     .catch();
});

const download = document.querySelector("#download");
download.addEventListener("click",()=>{
      var anchorElement = document.createElement('a'); 
      anchorElement.href = downloadURL;
      anchorElement.download = 'no-bg.png';
      document.body.appendChild(anchorElement);
      anchorElement.click();
      document.body.removeChild(anchorElement);
})

const theme = document.querySelector("#theme-button");
theme.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
       theme.innerHTML = "Dark Mode";
   }
   else{
       theme.innerHTML = "Light Mode";
    }
})