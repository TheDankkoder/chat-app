const btn = document.getElementById("view-btn");
console.log(btn);
btn.addEventListener('click', async function (e) {
    e.preventDefault();
    
    const response = await fetch("http://localhost:3000/view");
    makeImages(response)
    
})

const makeImages = (images) => {
    for (let result of imagers) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}

