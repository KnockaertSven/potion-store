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

      let image = document.createElement("img");
      image.setAttribute("src", `./images/${potion.id}.png`);
      image.setAttribute("alt", potion.name.toString());
      image.setAttribute("class", "potion-image");
      listItem.append(image);

      possibleKeys.forEach(key => {
        let span = document.createElement("span");
        span.innerHTML = "none";
        if(potion.hasOwnProperty(key)){
          span.innerHTML = potion[key];
          span.className = "potion-" + key.toString();
        }
        listItem.append(span);
      });

      document.querySelector(".potions").appendChild(listItem);
    });
  }

  init();

})();