let pcPartCard;

const selectingPartsHandler = event => {
  if( event.target.classList.contains( "add-part-btn" ) ) {
    pcPartCard = event.target.closest( ".pc-part-card" );
  }
  if( event.target.classList.contains( "pc-part-btn" ) ) {
    const pcPartTitle = event.target.closest( ".pc-part-wrapper" ).querySelector( ".pc-part-title" ).innerText;
    const partSelected = pcPartCard.querySelector( ".part-selected" );
    partSelected.innerText = pcPartTitle;
    // change event.target.dataset to pcPartId when able
    pcPartCard.setAttribute( "data-pcPartId", event.target.dataset.dismiss );
    console.log( pcPartCard, partSelected );
  }
}

const buildPCHandler = async event => {

  const pcPartCards = document.querySelectorAll( ".pc-part-card" );
  let allFilled;
  pcPartCards.forEach( card => {
    if( !card.dataset.pcPartId ) {
      allFilled = false;
    } else {
      allFilled = true;
    }
  } );
  const name = document.querySelector( "#build-name" ).value.trim();
  const personal_comments  = document.querySelector( "#build-comments" ).value.trim();
  const pcParts =   document.querySelectorAll( "span.part-selected" )

  if (name && personal_comments) {
    const response = await fetch(`/api/pcBuilds`, {
      method: 'POST',
      body: JSON.stringify({ name, personal_comments}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("SUCCESS");
    } else {
      alert('Failed to create project');
    }

  }

  const pcPartArr = Array.from(pcParts);
  const pcPartsData = pcPartArr.map(part => {
    return part.innerText
    
  })
  console.log(pcPartsData);

  const response2 = await fetch(`/api/parts`, {
        method: 'POST',
        body: JSON.stringify(pcPartsData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response2.ok) {
        console.log('SUCCESS2')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
  


  // console.log( buildName );
  // console.log( buildComments );
}

const forgeFormHandler = async event => {
  event.preventDefault();

  const name = document.querySelector( "#build-name" ).value.trim();
  const personal_comments  = document.querySelector( "#build-comments" ).value.trim();
  const pcParts =   document.querySelectorAll( "span.part-selected" )

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
}

document.querySelector( ".pc-part-cards-row" )
.addEventListener( "click", selectingPartsHandler );

document.querySelector( ".forge-form" )
.addEventListener( "submit", forgeFormHandler );

document.querySelector( ".build-pc-btn" )
.addEventListener( "click", buildPCHandler );