export default async function getData() {
        const url = "https://restApi.myronxo.repl.co/products";
        let response = await fetch(url);
        if (response.ok) { 
                let json = await response.json();
                return json;
        }
        else {
                alert("HTTP-Error: " + response.status);
        }
}