const theFile = document.querySelector('#fileToLoad').value.trim();

async function loadTheFile(event) {
    event.preventDefault();

    const files = event.target.files
  const formData = new FormData();
  formData.append('myFile', files[0]);

console.log(formData);

    const response = await fetch('/post', {
        method: 'POST',
        body: formData,
        
        headers: { 'Content-Type': 'application/json' }
    });


    if (response.ok) {
        console.log('Sent The File');
    } else {
        alert(response.statusText);
    }


}


document.querySelector('.upLoad').addEventListener('submit', loadTheFile);