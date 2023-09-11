const editButtons = document.querySelectorAll(".edit_button");

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
