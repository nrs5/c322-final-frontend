
    const host = "http://localhost:8080";

    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || {};
    let info = JSON.parse(localStorage.getItem("info")) || {};
    let purchasePrice = parseFloat(localStorage.getItem("purchasePrice"));
    let deliveryDate = localStorage.getItem("deliveryDate");

    let summary = document.getElementById("summary");
    let totalCost = purchasePrice + 25;
    let deliveryDiscount = isLoggedIn() ? 10 : 0;  
    

    summary.innerHTML = `
    <img src="${localStorage.getItem('flowerImage')}" alt="Flower Image" style="max-width: 25%; height: 5;">

        <h3>Delivery Date</h3>
        <p>${deliveryDate}</p>
        <h3>Item Pricing</h3>
        <p>$${purchasePrice - 25}</p>
        <h3>Delivery Address</h3>
        <p>${info.firstName} ${info.lastName}</p>
        <p>${info.apt ? info.apt + ' ' : ''}${info.address}</p>
        <p>${info.city} ${info.state} ${info.zip}</p>

        <h3>Subtotal</h3>
        <p>Delivery: $25.00</p>
        <p>Delivery Discount: -$${deliveryDiscount}</p>
        <p>Tax: $0.00</p>
        <p>Order Total: $${cartItem.cost - deliveryDiscount}</p>
    `;

    async function order(){
        try {
            let orderData = {
                flowerId: cartItem.flowerId, 
                flowerName: cartItem.flowerName,
                recipientName: `${info.firstName} ${info.lastName}`,
                totalCost: totalCost,
                status: "DONE",
                customerUserName: null 
            };

            console.log(orderData);

            let request = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData)
            };

            let response = await fetch(`${host}/orders`, request);

            if (response.ok) {
                alert("Order placed successfully!");
                localStorage.removeItem("cartItem");
                localStorage.removeItem("delivery");
                window.location.href = "TrackOrder.html";
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            console.error("An error occurred while placing the order:", error);
            alert("An error occurred. Please try again.");
        }
    }