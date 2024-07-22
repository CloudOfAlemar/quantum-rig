let pcPartCard;

const selectingPartsHandler = event => {
  if( event.target.classList.contains( "add-part-btn" ) ) {
    pcPartCard = event.target.closest( ".pc-part-card" );
  }
  if( event.target.classList.contains( "pc-part-btn" ) ) {
    const pcPartTitle = event.target.closest( ".pc-part-wrapper" ).querySelector( ".pc-part-title" ).innerText;
    const partSelected = pcPartCard.querySelector( ".part-selected" );
    partSelected.innerText = pcPartTitle;
  }
}

document.querySelector( ".pc-part-cards-row" )
.addEventListener( "click", selectingPartsHandler );