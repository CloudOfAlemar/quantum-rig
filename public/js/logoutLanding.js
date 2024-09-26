const logoutLanding = async () => {
    const response = await fetch('/api/guests/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to log out.' + response.statusText);
    }
  };
  
  if(document.getElementById('logoutLanding')){
  document.getElementById('logoutLanding').addEventListener('click', logoutLanding);
  }
  