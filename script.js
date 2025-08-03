function getRandomTime() {
    return Math.random() * 2000 + 1000; // Random time between 1 and 3 seconds
}

function createPromise(index) {
    const startTime = new Date().getTime();
    return new Promise((resolve) => {
        setTimeout(() => {
            const endTime = new Date().getTime();
            const timeTaken = (endTime - startTime) / 1000;
            resolve({ index, timeTaken });
        }, getRandomTime());
    });
}

function populateTable(results) {
    const output = document.getElementById('output');
    const loadingRow = output.querySelector('tr');
    if (loadingRow && loadingRow.textContent.includes('Loading...')) {
        loadingRow.remove();
    }

    let maxTime = 0;
    results.forEach((result) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Promise ${result.index + 1}</td>
            <td>${result.timeTaken.toFixed(3)}</td>
        `;
        output.appendChild(row);
        maxTime = Math.max(maxTime, result.timeTaken);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td>Total</td>
        <td>${maxTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
}

const promises = [createPromise(0), createPromise(1), createPromise(2)];
Promise.all(promises).then((results) => {
    populateTable(results);
});


