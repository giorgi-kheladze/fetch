const api = "https://6734a44fa042ab85d11b0c1a.mockapi.io/photos";
const buttons = document.getElementById("buttons");
const mainImg = document.getElementById("main-img");
const otherImg = document.getElementById("other-img");
const errorMessage = document.getElementById("errormessage")

const id = document.getElementById("ctgr")
const name = document.getElementById("name")

async function getData() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Could not fetch");
        }
        const data = await response.json();
        console.log(data)
        createButtons(data);
    } catch (error) {
        console.error(error);
        errorMessage.innerHTML = error
    }
}

function createButtons(data) {
    data.forEach(element => {
        const button = document.createElement("button");
        button.textContent = element.name;
        button.classList.add("btn");
        button.addEventListener("click", () => {
            display(element);
        });
        buttons.appendChild(button);
    });
}

function display(category) {
    mainImg.innerHTML = "";
    otherImg.innerHTML = "";
    name.innerHTML = category.name;
    id.innerHTML = category.category;



    if (category.photos && category.photos.length > 0) {
        const mainImageElement = document.createElement("img");
        mainImageElement.src = category.photos[0];
        mainImageElement.classList.add("main-image");
        mainImg.appendChild(mainImageElement);

        const otherImages = category.photos.slice(1);
        otherImages.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo;
            img.classList.add("other-image");
            img.addEventListener("click", () => {
                swapImages(photo, img);
            });
            otherImg.appendChild(img);
        });
    }
}


function swapImages(photoUrl, clickedImg) {
    const mainImage = mainImg.querySelector("img");
    const mainImageUrl = mainImage.src;

    clickedImg.src = mainImageUrl;
    mainImage.src = photoUrl;
}

getData();
