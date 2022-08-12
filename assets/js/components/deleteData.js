export default async function deleteData(id) {
        const url = "https://restApi.myronxo.repl.co/products/" + id;
        let response = await fetch(url, { method: 'DELETE' });
        if (response.ok) { 
                let json = await response.json();
                window.location.reload();
                return json;
        }
        else {
                alert("HTTP-Error: " + response.status);
        }
}