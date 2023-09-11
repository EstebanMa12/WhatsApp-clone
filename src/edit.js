const editButtons = document.querySelectorAll(".edit_button");
const imageChange = document.querySelector(".message__change-profile-button")
const imageInput =  document.querySelector("#imageInput")

editButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const parentElement = button.parentElement;
    const spanElement = parentElement.querySelector('.editable')
    const inputElement = parentElement.querySelector('input')
    
    if (spanElement.style.display !== 'none'){
      spanElement.style.display = 'none'
      inputElement.style.display = 'inline-block'
      inputElement.value = spanElement.textContent
      inputElement.focus()
    }else{
      spanElement.style.display = 'inline-block'
      inputElement.style.display = 'none'
      spanElement.textContent = inputElement.value
    }
  });
});

imageChange.addEventListener("click", (e) => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile){
    const imageURL = URL.createObjectURL(selectedFile);

    imageChange.style.backgroundImage = `url(${imageURL})`;
  }
})