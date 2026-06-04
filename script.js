const button = document.getElementById("generatebtn");
const output = document.getElementById('output');

button.addEventListener('click', async function() {
    const resume = document.getElementById('resume').value;
    const jobDescription = document.getElementById('job-description').value;
    
    if (!resume || !jobDescription) {
        output.textContent = "Please fill in both the fields!";
        return;
    }

    output.textContent = "Generating your cover letter...";

    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume, jobDescription })
    });

    const data = await response.json();
    console.log(data);
    output.innerHTML = data.candidates[0].content.parts[0].text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.style.display = 'block';
    copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(data.candidates[0].content.parts[0].text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy Cover Letter', 2000);
});
});