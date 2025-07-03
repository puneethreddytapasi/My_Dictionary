const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionaryArea = document.querySelector('.dictionary-app');

// Fetch dictionary data
async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    return data[0];
}

// Event listener on button
btn.addEventListener('click', fetchAndCreateCard);

async function fetchAndCreateCard() {
    const data = await dictionaryFn(input.value);

    console.log(data);

    // Collect all parts of speech
    let partOfSpeechArray = [];
    for (let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    // Handle optional values with fallback
    const phonetic = data.phonetic || 'N/A';
    const audio = data.phonetics?.[0]?.audio || '';
    const example = data.meanings[1]?.definitions[0]?.example || 'No example available';

    dictionaryArea.innerHTML = `
    <div class="card">
        <div class="property"> 
            <span>Word:</span>
            <span>${data.word}</span>
        </div>

        <div class="property"> 
            <span>Phonetics:</span>
            <span>${phonetic}</span>
        </div>

        <div class="property"> 
            <span>Audio:</span>
            ${audio ? `<audio controls src="${audio}"></audio>` : 'No audio available'}
        </div>

        <div class="property"> 
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition}</span>
        </div>

        <div class="property"> 
            <span>Example:</span>
            <span>${example}</span>
        </div>

        <div class="property"> 
            <span>Parts of Speech:</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>`;
}
