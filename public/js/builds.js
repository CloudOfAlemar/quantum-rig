
const buildPC = async event => {
  const response = await fetch( "/pc-parts", {
    method : "GET",
    headers : { "Content-Type" : "application/json" }
  } );
  
}

buildPC();