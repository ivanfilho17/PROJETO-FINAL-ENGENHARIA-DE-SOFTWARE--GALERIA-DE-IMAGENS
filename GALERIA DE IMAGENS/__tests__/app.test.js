// 1. Testar a abertura e fechamento da galeria

document.body.innerHTML = `
    <div id="galeria" style="display: none;"></div>
    <button id="botao-abrir-galeria">Abrir Galeria</button>
    <button id="botao-fechar-galeria">Fechar Galeria</button>
`;

const botaoAbrirGaleria = document.querySelector('#botao-abrir-galeria');
const botaoFecharGaleria = document.querySelector('#botao-fechar-galeria');
const galeria = document.getElementById('galeria');

// Função para abrir galeria
botaoAbrirGaleria.addEventListener('click', () => {
    galeria.style.display = 'block';
});

// Função para fechar galeria
botaoFecharGaleria.addEventListener('click', () => {
    galeria.style.display = 'none';
});

test('Abre a galeria ao clicar no botão "Abrir Galeria"', () => {
    botaoAbrirGaleria.click();
    expect(galeria.style.display).toBe('block');
});

test('Fecha a galeria ao clicar no botão "Fechar Galeria"', () => {
    botaoFecharGaleria.click();
    expect(galeria.style.display).toBe('none');
});


// 2. Testar a navegação entre as imagens

document.body.innerHTML = `
    <img id="modal-image" src="" />
    <button id="next">Próxima</button>
    <button id="prev">Anterior</button>
`;

const modalImage = document.getElementById("modal-image");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentImageIndex = 0;
const imagens = [
    { src: "https://picsum.photos/id/1/200" },
    { src: "https://picsum.photos/id/2/200" },
    { src: "https://picsum.photos/id/3/200" }
];

// Função para atualizar a imagem exibida na modal
// Atualiza a imagem exibida na modal
function updateModalImage() {
    const image = imagens[currentImageIndex];
    modalImage.src = image.src;
}

// Funções para navegação
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


test('Exibe a próxima imagem ao clicar no botão "Próxima"', () => {
    nextButton.click();
    expect(modalImage.src).toBe(imagens[1].src);
});

test('Exibe a imagem anterior ao clicar no botão "Anterior"', () => {
    modalImage.src = imagens[1].src; // Configura a imagem 1 (segunda imagem)
    prevButton.click(); // Clica no botão "Anterior"
    expect(modalImage.src).toBe(imagens[0].src); // Espera a imagem 0 (primeira)
});





// 3. Testar a aplicação de filtros

document.body.innerHTML = `
    <img id="modal-image" src="" />
    <button id="black-white">Filtro P&B</button>
    <button id="filtro-negativo">Filtro Negativo</button>
    <button id="remove-filter">Remover Filtros</button>
`;


const blackWhiteButton = document.getElementById("black-white");
const filtroNegativoButton = document.getElementById("filtro-negativo");
const removeFilterButton = document.getElementById("remove-filter");

// Função para aplicar filtros
function applyFilter(filter) {
    modalImage.style.filter = filter;
}

// Funções dos botões de filtro
blackWhiteButton.addEventListener("click", () => {
    applyFilter("grayscale(100%)");
});

filtroNegativoButton.addEventListener("click", () => {
    applyFilter("invert(100%)");
});

removeFilterButton.addEventListener("click", () => {
    applyFilter("none");
});

test('Aplica o filtro P&B ao clicar no botão "Filtro P&B"', () => {
    blackWhiteButton.click();
    expect(modalImage.style.filter).toBe('grayscale(100%)');
});

test('Aplica o filtro negativo ao clicar no botão "Filtro Negativo"', () => {
    filtroNegativoButton.click();
    expect(modalImage.style.filter).toBe('invert(100%)');
});

test('Remove os filtros ao clicar no botão "Remover Filtros"', () => {
    removeFilterButton.click();
    expect(modalImage.style.filter).toBe('none');
});



// 4. Testar o zoom nas imagens

document.body.innerHTML = `
    <img id="modal-image" src="" style="transform: scale(1)" />
    <button id="zoom-in">Zoom +</button>
    <button id="zoom-out">Zoom -</button>
`;

const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

let currentZoom = 1;

// Funções de zoom
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


test('Aplica zoom ao clicar no botão "Zoom +"', () => {
    zoomInButton.click();
    expect(modalImage.style.transform).toBe('scale(1.4)');
});

test('Reduz zoom ao clicar no botão "Zoom -"', () => {
    modalImage.style.transform = 'scale(1.4)'; // Configura o zoom inicial
    zoomOutButton.click(); // Clica no botão "Zoom -"
    
    // Verifica se o valor de scale está próximo de 1.0
    const scaleValue = parseFloat(modalImage.style.transform.match(/scale\(([^)]+)\)/)[1]);
    expect(scaleValue).toBeCloseTo(1, 5); // Tolerância de 5 casas decimais
});



