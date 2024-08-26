const inputButton = document.getElementById('commentButton');

// Only render delete and update button if the logged in guest is the original commenter or poster
const renderButtons = async () => {
  const deleteButton = document.querySelectorAll('.col-3 button');
  const response = await fetch('/guest');
  const guest = await response.json();
  deleteButton.forEach( async button => {
    if ( button.getAttribute('data-id') ){
        console.log(button.getAttribute('data-id'), "DFSHFJDHSFKJ");
        if(guest.guest_id == button.getAttribute('data-id')){
          button.style.display = 'grid';
          button.addEventListener('click', delButtonHandler);
        }
    }
  });

}

// Creating a comment after clicking the button
const handleComment = async () => {
    event.preventDefault();
    const text = document.getElementById('commentInput').value.trim();
    const pc_build_id = inputButton.getAttribute('data-id');
    if(text){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text, pc_build_id }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            // If successful, alert the user
            document.location.reload();
          } else {
            console.log(text, pc_build_id);
            alert(response.statusText);
          }
    }
}

// Deleting a comment
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id2')) {
    const id = event.target.getAttribute('data-id2');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete Comment!');
    }
  }
};





inputButton.addEventListener('click', handleComment);
document.addEventListener('DOMContentLoaded', function() {
    renderButtons();
  });