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
    console.log( pcPartCard );
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

  console.log( allFilled );
  
  const buildName = document.querySelector( "#build-name" ).value.trim();
  const buildComments = document.querySelector( "#build-comments" ).value.trim();

  // console.log( buildName );
  // console.log( buildComments );
}

const forgeFormHandler = event => {
  event.preventDefault();
}

document.querySelector( ".pc-part-cards-row" )
.addEventListener( "click", selectingPartsHandler );

document.querySelector( ".forge-form" )
.addEventListener( "submit", forgeFormHandler );

document.querySelector( ".build-pc-btn" )
.addEventListener( "click", buildPCHandler );