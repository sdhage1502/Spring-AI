document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const promptInput = document.getElementById('prompt');
    const messagesDiv = document.getElementById('messages');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const prompt = promptInput.value;
        if (prompt.trim() === '') return;

        // Add user message to the chat
        messagesDiv.innerHTML += `<div>User: ${prompt}</div>`;
        promptInput.value = '';

        // Fetch AI response
        try {
            const response = await fetch(`/ai/prompt?prompt=${encodeURIComponent(prompt)}`);
            if (response.ok) {
                const data = await response.json();
                data.forEach(msg => {
                    messagesDiv.innerHTML += `<div>AI: ${msg}</div>`;
                });
            } else {
                messagesDiv.innerHTML += `<div>AI: Error fetching response</div>`;
            }
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } catch (error) {
            messagesDiv.innerHTML += `<div>AI: Error fetching response</div>`;
        }
    });
});
