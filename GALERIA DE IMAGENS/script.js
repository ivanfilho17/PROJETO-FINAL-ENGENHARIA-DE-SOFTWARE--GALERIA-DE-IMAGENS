const botaoAbrirGaleria = document.querySelector('#botao-abrir-galeria');
const imagens = document.querySelectorAll('.imagem img');
const botaoFecharGaleria = document.querySelector('#botao-fechar-galeria');

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const rotateLeftButton = document.getElementById("rotate-left");
const rotateRightButton = document.getElementById("rotate-right");
const flipHorizontalButton = document.getElementById("flip-horizontal");
const flipVerticalButton = document.getElementById("flip-vertical");
const blackWhiteButton = document.getElementById("black-white");
const filtroNegativoButton = document.getElementById("filtro-negativo");
const removeFilterButton = document.getElementById("remove-filter");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const downloadButton = document.getElementById("download");
const downloadButtonWithEffects = document.getElementById("download-efeitos");
const closeButton = document.getElementById("close");


botaoAbrirGaleria.addEventListener('click', () => {
    galeria.style.display = 'block';
});

botaoFecharGaleria.addEventListener('click', () => {
    galeria.style.display = 'none';
});

imagens.forEach(image => {
    image.addEventListener("click", () => {
        modalImage.src = image.src;
        modal.style.display = "flex";
    });
});

imagens.forEach(image => {
    image.addEventListener('click', event => {
        event.preventDefault();
        openImage(image.src);
    });
});

imagens.forEach((image, index) => {
    image.addEventListener("click", () => {
        currentImageIndex = index;
        modalImage.src = image.src;
        modal.style.display = "flex";
    });
});

let currentImageIndex = 0;

nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % imagens.length;
    updateModalImage();
});

prevButton.addEventListener("click", () => {
    if (currentImageIndex > 0) {
        currentImageIndex = (currentImageIndex - 1 + imagens.length) % imagens.length;
        updateModalImage();
    }
});

rotateLeftButton.addEventListener("click", () => {
    rotateImage(-90);
});

rotateRightButton.addEventListener("click", () => {
    rotateImage(90);
});

flipHorizontalButton.addEventListener("click", () => {
    flipImage("horizontal");
});

flipVerticalButton.addEventListener("click", () => {
    flipImage("vertical");
});

blackWhiteButton.addEventListener("click", () => {
    applyFilter("grayscale(100%)");
    efeitos = 'grayscale(100%)';
});

filtroNegativoButton.addEventListener("click", () => {
    applyFilter("invert(100%)");
    efeitos = 'invert(100%)';
});

removeFilterButton.addEventListener("click", () => {
    removeFilter("grayscale(0%)");
    removeFilter("invert(0%)");
    efeitos = 'none';
});

let currentZoom = 1;

zoomInButton.addEventListener("click", () => {
    currentZoom += 0.4;
    modalImage.style.transform = `scale(${currentZoom})`;
});

zoomOutButton.addEventListener("click", () => {
    if (currentZoom > 1) {
        currentZoom -= 0.4;
        modalImage.style.transform = `scale(${currentZoom})`;
    }
});



downloadButton.addEventListener("click", () => {
    // Use a biblioteca html2canvas para capturar a imagem da modal
    html2canvas(modalImage, { useCORS: true }).then(canvas => {
        // Converta o elemento canvas em uma imagem no formato JPEG
        const image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

        // Crie um link de download e defina a imagem como seu href
        const link = document.createElement("a");
        link.setAttribute("href", image);
        link.setAttribute("download", "imagem.jpg");

        // Simule um clique no link para iniciar o download da imagem
        link.click();
    });
});

downloadButtonWithEffects.addEventListener("click", () => {
    downloadModalImageWithEffects();
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Função para atualizar a imagem exibida na modal
// Atualiza a imagem exibida na modal
function updateModalImage() {
    const image = imagens[currentImageIndex];
    modalImage.src = image.src;
}

function rotateImage(degrees) {
    let currentRotation = getRotationDegrees(modalImage);
    let newRotation = currentRotation + degrees;
    modalImage.style.transform = `rotate(${newRotation}deg)`;
}

function flipImage(direction) {
    let flipValue = "";
    if (direction === "horizontal") {
        flipValue = "scaleX(-1)";
    } else if (direction === "vertical") {
        flipValue = "scaleY(-1)";
    }
    modalImage.style.transform += ` ${flipValue}`;
}

function applyFilter(filter) {
    modalImage.style.filter = filter;
}

function removeFilter() {
    modalImage.style.filter = 'none';
}

function getRotationDegrees(element) {
    let transform = element.style.transform;
    let match = transform.match(/rotate\((\d+)deg\)/);
    return match ? parseInt(match[1], 10) : 0;
}

// Função para baixar a imagem da modal com os efeitos aplicados
function downloadModalImageWithEffects() {
    // Use a biblioteca html2canvas para capturar a imagem da modal
    html2canvas(modalImage, { useCORS: true }).then(canvas => {
        // Cria um novo canvas para aplicar os efeitos
        const canvasWithEffects = document.createElement("canvas");
        const context = canvasWithEffects.getContext("2d");

        // Define as dimensões do novo canvas com base no canvas capturado pelo html2canvas
        canvasWithEffects.width = canvas.width;
        canvasWithEffects.height = canvas.height;

        // Aplica os efeitos desejados no novo canvas (exemplo: filtro de escala de cinza)
        context.filter = efeitos;
        context.drawImage(canvas, 0, 0);

        // Converte o canvas com os efeitos em um arquivo de imagem (formato jpg)
        const imageWithEffects = canvasWithEffects.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

        // Crie um link de download e defina a imagem com os efeitos como seu href
        const link = document.createElement("a");
        link.setAttribute("href", imageWithEffects);
        link.setAttribute("download", "imagem_com_efeitos.jpg");

        // Simule um clique no link para iniciar o download da imagem com os efeitos
        link.click();
    });
}