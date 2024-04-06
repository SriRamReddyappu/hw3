function searchDictionary() {
    const word = document.getElementById('searchInput').value.trim();
    if (!word) {
        alert('Please enter a word to search.');
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = ''; // Clear previous results
                data.forEach(entry => {
                    const wordHeader = document.createElement('h2');
                    wordHeader.textContent = entry.word;
                    resultsDiv.appendChild(wordHeader);

                    entry.meanings.forEach(meaning => {
                        const partOfSpeech = document.createElement('p');
                        partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
                        resultsDiv.appendChild(partOfSpeech);

                        meaning.definitions.forEach((definition, index) => {
                            const definitionItem = document.createElement('p');
                            definitionItem.textContent = `${index + 1}. ${definition.definition}`;
                            resultsDiv.appendChild(definitionItem);

                            if (definition.example) {
                                const exampleItem = document.createElement('p');
                                exampleItem.textContent = `Example: ${definition.example}`;
                                resultsDiv.appendChild(exampleItem);
                            }
                        });
                    });
                });
            } else {
                alert(`No definition found for "${word}"`);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
