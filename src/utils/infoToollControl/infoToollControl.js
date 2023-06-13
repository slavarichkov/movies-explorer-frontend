function openInfoToolSub(text, setIsInfoTool, setTextMassageInfoTool) { // открыть инфотул
    setIsInfoTool(true); // открыть инфотул
    setTextMassageInfoTool(text); // передать текст в инф.окно
    setTimeout(() => { // закрыть подверждение через 3 сек.
        setIsInfoTool(false);
    }, 3000);
}

function closeInfoToolSub(setIsInfoTool, setTextMassageInfoTool) { // свернуть инфотул
    setIsInfoTool(false);
    setTextMassageInfoTool('')
}

function listenInfoToolClose(isInfoTool, handleCloseInfoTool) {
    if (isInfoTool) {
        document.addEventListener('click', handleCloseInfoTool);
        document.addEventListener('keydown', handleCloseInfoTool);
    } else {
        document.removeEventListener('click', handleCloseInfoTool);
        document.removeEventListener('keydown', handleCloseInfoTool);
    }
}

export { openInfoToolSub, closeInfoToolSub, listenInfoToolClose };