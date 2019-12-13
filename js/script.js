(() => {

  async function init() {
    let potionData = await parseJSON("./json/db.json").then((data) => data);
    let potions = potionData.potions;
    potions = sortPotionsAlphabetically(potions);
    displayPotions(potions, 30);
    manageUserInput(potions);
  };

  function parseJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => {
        console.log("load failed");
      };
      xhr.send();
    });
  };

  function manageUserInput(potions) {
    const tags = [
      "potions",
      "healing_potions",
      "mana_potions",
      "gift_release",
      "vip_prestige",
      "rejuvenation_potions",
      "antidote",
    ];

    tags.forEach(tag => {
      let tagEL = document.getElementById(`filter-${tag}`);
      tagEL.addEventListener("click", (event) => {
        const newPotions = sortPotionByTag(potions, tag);
        clearPotions();
        displayPotions(newPotions);
      });
    });

    document.getElementById("filter-price").addEventListener("click", (event) => {
      potions = sortPotionsByPrice(potions);
      clearPotions();
      displayPotions(potions);
    });

    document.getElementById("filter-required_level").addEventListener("click", (event) => {
      potions = sortPotionsByLevel(potions);
      clearPotions();
      displayPotions(potions);
    });

    handleSearchBarInput(potions);

    hideBackdropOnClick();
  }

  function handleSearchBarInput(potions){
    document.getElementById("search-bar").addEventListener("keyup", (event) => {
      let userInput = event.target.value;
      if (userInput === "") {
        clearPotions();
        displayPotions(potions);
      } else {
        let newPotions = filterPotionsByName(potions, userInput);
        clearPotions();
        displayPotions(newPotions);
      }
    });
  }

  function hideBackdropOnClick() {
    document.getElementById("backdrop").addEventListener("click", event => {
      event.target.style.display = "none";
      document.getElementById("popup").style.display = "none";
    });
  }

  function sortPotionsAlphabetically(potions) {
    potions = potions.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    return potions;
  }

  function sortPotionsByPrice(potions) {
    potions = potions.sort(function (a, b) {
      if (a.price < b.price) { return -1; }
      if (a.price > b.price) { return 1; }
      return 0;
    });
    return potions;
  }

  function sortPotionsByLevel(potions) {
    potions = potions.sort(function (a, b) {
      if (a.required_level < b.required_level) { return -1; }
      if (a.required_level > b.required_level) { return 1; }
      return 0;
    });
    return potions;
  }

  function sortPotionByTag(potions, tag) {
    potions = potions.filter(function (potion) {
      if (potion.tags.includes(tag)) return true;
      return false;
    });

    if (potions.length > 1) {
      potions = sortPotionsAlphabetically(potions);
    }

    return potions;
  }

  function filterPotionsByName(potions, name) {
    potions = potions.filter(function (potion) {
      if (potion.name.toLowerCase().includes(name)) return true;
      return false;
    });
    return potions;
  }

  function clearPotions() {
    let potions = document.querySelector(".potions");
    while (potions.lastChild) {
      if (potions.lastChild.className == "potion-head") break;
      potions.removeChild(potions.lastChild);
    }
  }

  function displayPotions(potions, delay = 0) {
    const possibleKeys = [
      "name",
      "required_level",
      "restore_hp",
      "restore_mp",
      "cooldown_time",
      "price",
    ];

    potions.forEach((potion, index) => {
      let listItem = document.createElement("li");
      listItem.className = "potion";
      listItem.setAttribute("data-id", potion.id);

      let image = document.createElement("img");
      image.setAttribute("src", `./images/${potion.id}.png`);
      image.setAttribute("alt", potion.name.toString());
      image.className = "potion-image";
      listItem.append(image);

      possibleKeys.forEach(key => {
        let span = document.createElement("span");
        span.innerHTML = "None";
        span.className = "potion-" + key.toString();
        if (potion.hasOwnProperty(key)) {
          span.innerHTML = potion[key];
        }
        listItem.append(span);
      });

      listItem.addEventListener("click", () => {
        clearPotionDetails();
        displayPotionDetails(potion);
      });

      setTimeout(() => {
        document.querySelector(".potions").appendChild(listItem);
      }, index * delay);
    });
  }

  function clearPotionDetails() {
    let popup = document.getElementById("popup");
    while (popup.lastChild) {
      popup.removeChild(popup.lastChild);
    }
  }

  function displayPotionDetails(potion) {
    let popup = document.getElementById("popup");

    let nameEl = document.createElement("h2");
    nameEl.innerHTML = potion.name;
    popup.appendChild(nameEl);

    let descriptionEl = document.createElement("p");
    let description = "No description provided.";
    if (potion.hasOwnProperty("description")) {
      description = potion.description;
    }
    descriptionEl.innerHTML = description;
    popup.appendChild(descriptionEl);

    document.getElementById("backdrop").style.display = "block";
    popup.style.display = "block";
  };

  init();

})();