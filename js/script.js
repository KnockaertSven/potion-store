(() => {

  async function init() {
    let potionData = await parseJSON("./json/db.json").then((data) => data);
    let potions = potionData.potions;
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

  function displayPotions(potions) {

    let possibleKeys = [
      "name",
      "required_level",
      "tags",
      "restore_hp",
      "restore_mp",
      "cooldown_time",
      "price",
    ];

    potions.forEach(potion => {
      let listItem = document.createElement("li");
      listItem.className = "potion";
      listItem.setAttribute("data-id", potion.id);

      possibleKeys.forEach(key => {
        let span = document.createElement("span");
        span.innerHTML = "none";
        if(potion.hasOwnProperty(key)){
          span.innerHTML = potion[key];
        }
        listItem.append(span);
      });

      document.querySelector(".potions").appendChild(listItem);
    });

    // <span class="potion-image">Image</span>
    // <span class="potion-name">Name</span>
    // <span class="potion-level">Level</span>
    // <span class="potion-tags">Tags</span>
    // <span class="potion-health">Health</span>
    // <span class="potion-mana">Mana</span>
    // <span class="potion-time">Cooldown time</span>
    // <span class="potion-price">Price</span
  }

  init();

})();