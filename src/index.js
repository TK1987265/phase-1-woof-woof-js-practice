document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const filterButton = document.getElementById("good-dog-filter");
  
    // Step 1: Fetch Pups Data
    function fetchPups() {
      fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(pups => {
          // Step 2: Add Pups to Dog Bar
          pups.forEach(pup => {
            const span = document.createElement("span");
            span.textContent = pup.name;
            span.addEventListener("click", () => displayPupInfo(pup));
            dogBar.appendChild(span);
          });
        });
    }
  
    // Step 3: Show More Info About Each Pup
    function displayPupInfo(pup) {
      dogInfo.innerHTML = `
        <img src="${pup.image}" />
        <h2>${pup.name}</h2>
        <button>${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
      `;
      // Step 4: Toggle Good Dog
      const toggleButton = dogInfo.querySelector("button");
      toggleButton.addEventListener("click", () => toggleGoodDog(pup));
    }
  
    // Step 4: Toggle Good Dog
    function toggleGoodDog(pup) {
      pup.isGoodDog = !pup.isGoodDog;
      const buttonText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
      fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isGoodDog: pup.isGoodDog })
      })
        .then(response => response.json())
        .then(() => {
          const button = dogInfo.querySelector("button");
          button.textContent = buttonText;
        });
    }
  
    // Bonus Step 5: Filter Good Dogs
    filterButton.addEventListener("click", () => {
      // Implement filter functionality here
    });
  
    // Fetch pups data when the DOM is loaded
    fetchPups();
  });
  