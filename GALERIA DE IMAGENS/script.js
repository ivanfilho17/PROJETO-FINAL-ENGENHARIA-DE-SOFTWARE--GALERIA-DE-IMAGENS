const botaoAbrirGaleria = document.querySelector('#botao-abrir-galeria');
const imagens = document.querySelectorAll('.imagem img');
const botaoFecharGaleria = document.querySelector('#botao-fechar-galeria');

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");

const sideNavPrev = document.getElementById('side-prev');
const sideNavNext = document.getElementById('side-next');
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

const loginModal = document.getElementById('login-modal');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const cancelLoginButton = document.getElementById('cancel-login');
const cancelRegisterButton = document.getElementById('cancel-register');
const switchToRegisterButton = document.getElementById('switch-to-register');
const switchToLoginButton = document.getElementById('switch-to-login');


// Mock user credentials (in a real application, this would be handled server-side)
let users = [
    {
        username: 'admin',
        password: 'admin',
        email: 'admin@admin.com'
    }
];

// Login state
let isLoggedIn = false;


// Show/Hide Modal Functions
function showLoginModal() {
    loginModal.style.display = 'flex';
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
}

function hideLoginModal() {
    loginModal.style.display = 'none';
    loginForm.reset();
    registerForm.reset();
}

function switchToRegister() {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
}

function switchToLogin() {
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
}

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        isLoggedIn = true;
        hideLoginModal();
        document.getElementById('galeria').style.display = 'block';
        uploadSection.style.display = 'block';
        updateUIBasedOnLogin(); // Atualiza a UI após o login
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

// Register form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('As senhas não correspondem!');
        return;
    }

    if (users.some(u => u.username === username)) {
        alert('Este nome de usuário já está em uso!');
        return;
    }

    if (users.some(u => u.email === email)) {
        alert('Este email já está em uso!');
        return;
    }

    // Add new user
    users.push({
        username,
        email,
        password
    });

    alert('Registro realizado com sucesso! Faça login para continuar.');
    switchToLogin();
    registerForm.reset();
});

// Navigation button listeners
switchToRegisterButton.addEventListener('click', switchToRegister);
switchToLoginButton.addEventListener('click', switchToLogin);
cancelLoginButton.addEventListener('click', hideLoginModal);
cancelRegisterButton.addEventListener('click', hideLoginModal);


// Modify the gallery open logic to restore uploaded images
const originalGalleryOpen = botaoAbrirGaleria.onclick;
botaoAbrirGaleria.addEventListener('click', () => {
    if (isLoggedIn) {
        document.getElementById('galeria').style.display = 'block';
        // Show upload section if already logged in
        uploadSection.style.display = 'block';
    } else {
        showLoginModal();
    }
});

botaoFecharGaleria.addEventListener('click', () => {
    document.getElementById('galeria').style.display = 'none';
    // Hide upload section when closing gallery
    uploadSection.style.display = 'none';
});

function logout() {
    isLoggedIn = false;
    document.getElementById('galeria').style.display = 'none';
    uploadSection.style.display = 'none';
    updateUIBasedOnLogin(); // Atualiza a UI após o logout
}

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

nextButton.addEventListener('click', () => {
    navigateToImage(currentImageIndex + 1);
});

prevButton.addEventListener('click', () => {
    navigateToImage(currentImageIndex - 1);
});

// Add side navigation button click handlers
sideNavNext.addEventListener('click', () => {
    navigateToImage(currentImageIndex + 1);
});

sideNavPrev.addEventListener('click', () => {
    navigateToImage(currentImageIndex - 1);
});


// Update the modal open handler
function openImageModal(image) {
    const allImages = getAllImages();
    currentImageIndex = allImages.indexOf(image);
    modalImage.src = image.src;
    modal.style.display = 'flex';
    updateNavigationButtons();
}

// Update image click handlers
function setupImageClickHandlers() {
    const allImages = getAllImages();
    allImages.forEach(image => {
        image.onclick = () => openImageModal(image);
    });
}


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

// Update the modal close handler
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    // Reset any active effects
    modalImage.style.transform = '';
    modalImage.style.filter = '';
    currentZoom = 1;
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

// Upload-related elements
const openUploadButton = document.getElementById('open-upload-modal');
const uploadModal = document.getElementById('upload-modal');
const uploadSection = document.getElementById('upload-section');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const previewContainer = document.getElementById('preview-container');
const cancelUploadButton = document.getElementById('cancel-upload');
const grid = document.querySelector('.grid');

// Store uploaded images
let uploadedImages = [];

// Upload Modal Functions
function showUploadModal() {
    uploadModal.style.display = 'flex';
}

function hideUploadModal() {
    uploadModal.style.display = 'none';
    clearPreview();
}

function clearPreview() {
    previewContainer.innerHTML = '';
    fileInput.value = '';
}

// File Handling Functions
function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert(`Tipo de arquivo inválido: ${file.name}. Apenas JPG, PNG e GIF são permitidos.`);
            return false;
        }
        return true;
    });

    validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewItem = createPreviewItem(e.target.result);
            previewContainer.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

function createPreviewItem(imgSrc) {
    const div = document.createElement('div');
    div.className = 'preview-item';

    const img = document.createElement('img');
    img.src = imgSrc;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-preview';
    removeButton.innerHTML = '×';
    removeButton.onclick = function () {
        div.remove();
    };

    div.appendChild(img);
    div.appendChild(removeButton);
    return div;
}

function addImageToGallery(imgSrc) {
    const newImageDiv = document.createElement('div');
    newImageDiv.className = 'imagem';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Imagem Carregada';
    img.id = getAllImages().length.toString().padStart(2, '0');

    newImageDiv.appendChild(img);
    addDeleteButton(newImageDiv);
    addShareButton(newImageDiv); // Adiciona o botão de compartilhamento
    grid.appendChild(newImageDiv);

    uploadedImages.push(imgSrc);
    setupImageClickHandlers();
}

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        switch (e.key) {
            case 'ArrowLeft':
                navigateToImage(currentImageIndex - 1);
                break;
            case 'ArrowRight':
                navigateToImage(currentImageIndex + 1);
                break;
            case 'Escape':
                modal.style.display = 'none';
                break;
        }
    }
});

// Event Listeners
openUploadButton.addEventListener('click', showUploadModal);
cancelUploadButton.addEventListener('click', hideUploadModal);

dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const previewImages = previewContainer.querySelectorAll('img');
    if (previewImages.length === 0) {
        alert('Por favor, selecione pelo menos uma imagem para enviar.');
        return;
    }

    previewImages.forEach(img => {
        addImageToGallery(img.src);
    });

    hideUploadModal();
    alert('Imagens enviadas com sucesso!');
});

function updateNavigationButtons() {
    // Update side navigation buttons
    sideNavPrev.disabled = currentImageIndex === 0;
    sideNavNext.disabled = currentImageIndex === getAllImages().length - 1;

    // Update bottom navigation buttons
    prevButton.disabled = currentImageIndex === 0;
    nextButton.disabled = currentImageIndex === getAllImages().length - 1;
}

function getAllImages() {
    const existingImages = Array.from(imagens);
    const uploadedImageElements = Array.from(document.querySelectorAll('.imagem img')).filter(img => !img.closest('.preview-item'));
    return uploadedImageElements;
}

function navigateToImage(index) {
    const allImages = getAllImages();
    if (index >= 0 && index < allImages.length) {
        currentImageIndex = index;
        modalImage.src = allImages[currentImageIndex].src;
        updateNavigationButtons();

        // Reset any active effects
        modalImage.style.transform = '';
        modalImage.style.filter = '';
        currentZoom = 1;
    }
}

document.addEventListener('DOMContentLoaded', setupImageClickHandlers);

document.addEventListener('DOMContentLoaded', () => {
    const imageDivs = document.querySelectorAll('.imagem');
    imageDivs.forEach(imageDiv => {
        if (!imageDiv.querySelector('.delete-button')) {
            addDeleteButton(imageDiv);
        }
    });
});

// Função para adicionar o botão de exclusão às imagens
function addDeleteButton(imageDiv) {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '×';
    deleteButton.title = 'Excluir imagem';

    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o modal da imagem abra ao clicar no botão de exclusão

        if (confirm('Tem certeza que deseja excluir esta imagem?')) {
            // Remove a imagem do array de imagens carregadas se ela existir lá
            const img = imageDiv.querySelector('img');
            const index = uploadedImages.indexOf(img.src);
            if (index > -1) {
                uploadedImages.splice(index, 1);
            }

            // Remove o elemento da galeria
            imageDiv.remove();

            // Atualiza os índices das imagens restantes
            updateImageIndexes();
        }
    });

    imageDiv.appendChild(deleteButton);
}

// Função para atualizar os índices das imagens após uma exclusão
function updateImageIndexes() {
    const allImages = getAllImages();
    allImages.forEach((img, index) => {
        img.id = index.toString().padStart(2, '0');
    });
}

// Objeto para armazenar as descrições das imagens
const imageDescriptions = {};

// Elementos do DOM
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const descriptionModal = document.getElementById('description-modal');
const addDescriptionButton = document.getElementById('add-description');
const saveDescriptionButton = document.getElementById('save-description');
const cancelDescriptionButton = document.getElementById('cancel-description');
const imageDescriptionTextarea = document.getElementById('image-description');

// Função para mostrar/esconder elementos baseado no login
function updateUIBasedOnLogin() {
    if (isLoggedIn) {
        searchContainer.style.display = 'flex';
        addDescriptionButton.style.display = 'block';
    } else {
        searchContainer.style.display = 'none';
        addDescriptionButton.style.display = 'none';
    }
}

// Função para adicionar descrição à imagem
function addDescription() {
    const currentImage = getAllImages()[currentImageIndex];
    imageDescriptionTextarea.value = imageDescriptions[currentImage.id] || '';
    descriptionModal.style.display = 'flex';
}

// Função para salvar a descrição
function saveDescription() {
    const currentImage = getAllImages()[currentImageIndex];
    const description = imageDescriptionTextarea.value.trim();

    if (description) {
        imageDescriptions[currentImage.id] = description;
        updateDescriptionPreview(currentImage);
    } else {
        delete imageDescriptions[currentImage.id];
        removeDescriptionPreview(currentImage);
    }

    descriptionModal.style.display = 'none';
}

// Função para atualizar a preview da descrição na miniatura
function updateDescriptionPreview(image) {
    const imageDiv = image.parentElement;
    let descriptionPreview = imageDiv.querySelector('.image-description-preview');

    if (!descriptionPreview) {
        descriptionPreview = document.createElement('div');
        descriptionPreview.className = 'image-description-preview';
        imageDiv.appendChild(descriptionPreview);
    }

    descriptionPreview.textContent = imageDescriptions[image.id];
}

// Função para remover a preview da descrição
function removeDescriptionPreview(image) {
    const descriptionPreview = image.parentElement.querySelector('.image-description-preview');
    if (descriptionPreview) {
        descriptionPreview.remove();
    }
}

// Função de pesquisa
function searchImages() {
    const searchTerm = searchInput.value.toLowerCase();
    const allImages = getAllImages();

    allImages.forEach(image => {
        const description = imageDescriptions[image.id] || '';
        const imageDiv = image.parentElement;

        if (searchTerm === '' || description.toLowerCase().includes(searchTerm)) {
            imageDiv.style.display = 'block';
        } else {
            imageDiv.style.display = 'none';
        }
    });
}


// Event Listeners
addDescriptionButton.addEventListener('click', addDescription);
saveDescriptionButton.addEventListener('click', saveDescription);
cancelDescriptionButton.addEventListener('click', () => {
    descriptionModal.style.display = 'none';
});
searchButton.addEventListener('click', searchImages);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchImages();
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateUIBasedOnLogin();
});

// Função para adicionar o botão de compartilhamento às imagens
function addShareButton(imageDiv) {
    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    shareButton.innerHTML = '↗';
    shareButton.title = 'Compartilhar imagem';

    shareButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que o modal da imagem abra ao clicar no botão de compartilhamento

        const img = imageDiv.querySelector('img');
        const shareUrl = img.src;

        // Copia o link para a área de transferência
        navigator.clipboard.writeText(shareUrl).then(() => {
            showTooltip('Link copiado com sucesso!', e);
        }).catch(() => {
            showTooltip('Erro ao copiar o link', e);
        });
    });

    imageDiv.appendChild(shareButton);
}

// Função para mostrar o tooltip de confirmação
function showTooltip(message, event) {
    // Remove qualquer tooltip existente
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Cria um novo tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);

    // Posiciona o tooltip próximo ao cursor
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;

    // Mostra o tooltip
    setTimeout(() => tooltip.classList.add('show'), 10);

    // Remove o tooltip após 2 segundos
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
}

// Adiciona os botões de compartilhamento às imagens existentes
document.addEventListener('DOMContentLoaded', () => {
    const imageDivs = document.querySelectorAll('.imagem');
    imageDivs.forEach(imageDiv => {
        if (!imageDiv.querySelector('.share-button')) {
            addShareButton(imageDiv);
        }
    });
});