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

const buildPCHandler = async event => {
  const buildName = document.querySelector( "#build-name" ).value.trim();
  const buildComments = document.querySelector( "#build-comments" ).value.trim();
  console.log( buildName );
  console.log( buildComments );
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