
    let host = "localhost:8080";
    let orders = [];
    displayOrders();

    async function getOrders(token){
            try {
                let response = await fetch(`${host}/orders`, {
                    headers: {
                         "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {throw new Error('Failed to fetch orders');}
                return await response.json();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        async function displayOrders(){
            let token = configuration.token(); 
            try {
                orders = await getOrders(token);
                const orderList = document.getElementById("orderList");
                orderList.innerHTML = "";

                orders.forEach(order => {
                    const div = document.createElement("div");
                    div.className = "order-card";
                    div.innerHTML = `
                    <h3>Order ID: ${order.id}</h3>
                    <p>Flower Name: ${order.flowerName}</p>
                    <p>Recipient Name: ${order.recipientName}</p>
                    <p>Total Cost: $${order.totalCost}</p>
                    <p>Status: ${order.status}</p>
                    `;
                    orderList.appendChild(div);
                });
            } catch (error) {
                console.error('Error fetching or displaying orders:', error);
                const orderList = document.getElementById("orderList");
                orderList.innerHTML = "<p>Failed to fetch orders.</p>";
            }
        }