const host = "http://localhost:8080";

  window.onload = function() {
      displayFlowerDetails();
  };

  async function displayFlowerDetails() {
      const urlParams = new URLSearchParams(window.location.search);
      const flowerId = urlParams.get('id');
      
      try {
          const response = await fetch(`${host}/flowers/${flowerId}`);
          const flowerData = await response.json();
  
          const imageUrl = `${host}/flowers/${flowerId}/image`;
  
          const flowerDetailsContainer = document.getElementById('flowerDetails');
          flowerDetailsContainer.innerHTML = `
              <h2>${flowerData.name}</h2>
              <img src="${imageUrl}" alt="${flowerData.name}" style="max-width: 25%; height: 5;">
          `;
  
          const updatedPrice = flowerData.cost + 25;
          const subPrice = flowerData.cost - 10;
  
          document.getElementById('oneTimePrice').textContent = updatedPrice;
          document.getElementById('subPrice').textContent = subPrice;

          localStorage.setItem("flowerName", flowerData.name);
          localStorage.setItem("flowerImage", imageUrl);
  
      } catch (error) {
          console.error('Error fetching flower details:', error);
      }
  }

  function addToBasket() {
        const oneTimePurchaseOption = document.querySelector('input[name="purchaseOption"][value="oneTimePurchase"]');
        const subOption = document.querySelector('input[name="purchaseOption"][value="sub"]');

        let selectedPrice = 0;
        if (oneTimePurchaseOption.checked) {
            selectedPrice = parseFloat(document.getElementById('oneTimePrice').textContent);
        } else if (subOption.checked) {
            selectedPrice = parseFloat(document.getElementById('subPrice').textContent);
        }
        console.log("Selected price:", selectedPrice);
        
        const deliveryDate = document.getElementById("delivery").value;
        
        localStorage.setItem("purchasePrice", selectedPrice);
        localStorage.setItem("deliveryDate", deliveryDate);

        let cartItem = {
            flowerId: localStorage.getItem("flowerId"),
            flowerName: localStorage.getItem("flowerName"),
            deliveryDate: deliveryDate,
            purchaseOption: oneTimePurchaseOption.checked ? "oneTimePurchase" : "sub",
            cost: selectedPrice 
        };


        localStorage.setItem("cartItem", JSON.stringify(cartItem));
        
        window.location.href = "AddDeliveryInformation.html";
    }