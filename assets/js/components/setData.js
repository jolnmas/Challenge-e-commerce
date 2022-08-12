
export default async function setData(formData) {
  const url = "https://restApi.myronxo.repl.co/products";
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (response.ok) { 
      alert("The product has been saved");
      window.location.reload();
  }
  else {
      alert("HTTP-Error: " + response.status);
  }
}



