(() => {

  async function init() {
    let potionData = await parseJSON("./json/db.json").then((data) => data);
    let potions = potionData.potions;
    potions = sortPotionsAlphabetically(potions);
    displayPotions(potions);
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

  function displayPotions(potions) {
    let possibleKeys = [
      "name",
      "required_level",
      "restore_hp",
      "restore_mp",
      "cooldown_time",
      "price",
    ];

    potions.forEach(potion => {
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

      document.querySelector(".potions").appendChild(listItem);
    });
  }

  init();

})();