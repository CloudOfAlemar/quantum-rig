const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#pcbuild-name').value.trim();
  const personal_comments = document.querySelector('#pcbuild-comments').value.trim();

  if (name && personal_comments) {
    const response = await fetch(`/api/pcBuilds`, {
      method: 'POST',
      body: JSON.stringify({ name, personal_comments}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/pcBuilds/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-pcbuild-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.pcbuild-list')
  .addEventListener('click', delButtonHandler);
