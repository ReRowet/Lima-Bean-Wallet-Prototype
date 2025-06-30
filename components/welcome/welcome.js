const welcomeCard = document.getElementById('welcomeCard');
const createWalletForm = document.getElementById('createWalletForm');
const importWalletForm = document.getElementById('importWalletForm');

const createWalletBtn = document.getElementById('createWalletBtn');
const importWalletBtn = document.getElementById('importWalletBtn');
const backBtns = document.querySelectorAll('.back-btn');

const proceedBtn = document.getElementById('proceedToWalletBtn');
const importProceedBtn = document.getElementById('importAndProceedBtn');
const copyMnemonicBtn = document.querySelector('.copy-mnemonic-btn');
const generatedMnemonicField = document.getElementById('generatedMnemonic');

function showView(viewToShow) {
    welcomeCard.style.display = 'none';
    createWalletForm.style.display = 'none';
    importWalletForm.style.display = 'none';
    viewToShow.style.display = 'block';
}

createWalletBtn.addEventListener('click', () => {
    generatedMnemonicField.value = "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12";
    showView(createWalletForm)
});
importWalletBtn.addEventListener('click', () => showView(importWalletForm));
backBtns.forEach(btn => btn.addEventListener('click', () => showView(welcomeCard)));

proceedBtn.addEventListener('click', () => {
    // Add form validation here before navigating
    window.appNavigator.goToDashboard();
});
importProceedBtn.addEventListener('click', () => {
    // Add form validation here before navigating
    window.appNavigator.goToDashboard();
});

copyMnemonicBtn.addEventListener('click', () => {
    generatedMnemonicField.select();
    generatedMnemonicField.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(generatedMnemonicField.value);

    const originalText = copyMnemonicBtn.innerHTML;
    copyMnemonicBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    
    setTimeout(() => {
        copyMnemonicBtn.innerHTML = originalText;
    }, 2000);
});

document.addEventListener('mousemove', function(e) {
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    if (!leftPupil || !rightPupil) return;

    const leftEyeOverlay = leftPupil.parentElement; 
    const rightEyeOverlay = rightPupil.parentElement; 

    const leftEyeRect = leftEyeOverlay.getBoundingClientRect();
    const rightEyeRect = rightEyeOverlay.getBoundingClientRect();
    
    const leftEyeX = leftEyeRect.left + leftEyeRect.width / 2;
    const leftEyeY = leftEyeRect.top + leftEyeRect.height / 2;
    
    const rightEyeX = rightEyeRect.left + rightEyeRect.width / 2;
    const rightEyeY = rightEyeRect.top + rightEyeRect.height / 2;
    
    const angleLeft = Math.atan2(e.clientY - leftEyeY, e.clientX - leftEyeX);
    const angleRight = Math.atan2(e.clientY - rightEyeY, e.clientX - rightEyeX);
    
    const distance = 5; 
    
    leftPupil.style.transform = `translate(calc(-50% + ${Math.cos(angleLeft) * distance}px), calc(-50% + ${Math.sin(angleLeft) * distance}px))`;
    rightPupil.style.transform = `translate(calc(-50% + ${Math.cos(angleRight) * distance}px), calc(-50% + ${Math.sin(angleRight) * distance}px))`;
});

showView(welcomeCard);