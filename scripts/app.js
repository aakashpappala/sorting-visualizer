"use strict";

// ================= COMMON ELEMENTS =================
const arrayContainer = document.querySelector("[data-testid='array-container']");
const statusText = document.querySelector("[data-testid='status-text']");
const startBtn = document.querySelector("[data-testid='start-btn']");

// ================= CLEAR SCREEN =================
const clearScreen = async () => {
    arrayContainer.innerHTML = "";
};

// ================= RANDOM ARRAY =================
const randomList = async (length) => {
    let arr = [];
    let upperBound = 100;
    let lowerBound = 1;

    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(
            Math.random() * (upperBound - lowerBound + 1) + lowerBound
        );
        arr.push(randomNumber);
    }
    return arr;
};

// ================= RENDER LIST =================
const RenderList = async () => {
    let sizeValue = Number(document.querySelector("[data-testid='size']").value);

    await clearScreen();

    let list = await randomList(sizeValue);

    for (const element of list) {
        const node = document.createElement("div");

        node.className = "cell";
        node.setAttribute("data-testid", "bar");   // 🔥 automation
        node.setAttribute("value", element);       // 🔥 validation

        node.style.height = `${3.8 * element}px`;

        arrayContainer.appendChild(node);
    }
};

// ================= SCREEN RENDER =================
const RenderScreen = async () => {
    await RenderList();
};

// ================= START SORT =================
const start = async () => {

    document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden";

    let algoValue = Number(document.querySelector("[data-testid='algorithm']").value);
    let speedValue = Number(document.querySelector("[data-testid='speed']").value);
    let sizeValue = Number(document.querySelector("[data-testid='size']").value);

    // VALIDATION
    if (algoValue === 0) {
        alert("Select Algorithm");
        return;
    }

    if (sizeValue === 0) {
        alert("Select Size");
        return;
    }

    if (speedValue === 0) speedValue = 1;

    // UI STATE
    statusText.innerText = "Sorting...";
    startBtn.disabled = true;
    startBtn.innerText = "Sorting...";

    try {
        let algorithm = new Algorithms(speedValue);

        if (algoValue === 1) await algorithm.BubbleSort();
        if (algoValue === 2) await algorithm.SelectionSort();
        if (algoValue === 3) await algorithm.InsertionSort();
        if (algoValue === 4) await algorithm.MergeSort();
        if (algoValue === 5) await algorithm.QuickSort();

        statusText.innerText = "Sorting Completed";
    } catch (error) {
        console.error(error);
        statusText.innerText = "Error occurred";
    }

    // RESET BUTTON
    startBtn.disabled = false;
    startBtn.innerText = "Sort";
};

// ================= GENERATE =================
const generate = async () => {
    let sizeValue = Number(document.querySelector("[data-testid='size']").value);

    if (sizeValue === 0) {
        alert("Select Size");
        return;
    }

    statusText.innerText = "Generating Array...";
    await RenderList();
    statusText.innerText = "Ready";
};

// ================= EVENTS =================
startBtn.addEventListener("click", start);
document.querySelector("[data-testid='size']").addEventListener("change", RenderList);
document.querySelector("[data-testid='algorithm']").addEventListener("change", RenderScreen);
document.querySelector("[data-testid='generate-btn']").addEventListener("click", generate);

// ================= INIT =================
window.onload = () => {
    statusText.innerText = "Ready";
    RenderScreen();
};
