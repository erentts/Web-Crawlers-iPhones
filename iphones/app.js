const ui = new UI();

const getProfile = document.querySelector("#getAll");
//const getAnySite = document.getElementById("getAnySite");
const maxPrice = document.getElementById("maxPrice");
const selectProduct = document.getElementById("selectProduct");
const selectSites = document.getElementById("selectSites");

getProfile.addEventListener("click", () => {
  fetch("./iphones.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(selectProduct.options[selectProduct.selectedIndex].text);
      ui.showProfile(
        data,
        maxPrice.value,
        selectProduct.options[selectProduct.selectedIndex].text,
        selectSites.options[selectSites.selectedIndex].text
      );
    })
    .catch((err) => {
      console.log("rejected", err);
    });
});
