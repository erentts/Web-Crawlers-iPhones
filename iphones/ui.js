class UI {
  constructor() {
    this.profileContainer = document.querySelector("#profileContainer");
  }

  showProfile(profile, maxPrice, model, site) {
    let sites;
    //console.log(profile.iphones[0]);
    const regex = new RegExp(model);
    const regex2 = new RegExp(site);

    this.profileContainer.innerHTML = "";
    profile.iphones.forEach((response) => {
      if (
        parseInt(
          response.productPrice.split(".").join("").split(",").join("")
        ) < parseInt(maxPrice) &&
        regex.test(response.productName) &&
        regex2.test(response.page)
      ) {
        if (site == "vatanbilgisayar.com") {
          sites = "https://www.vatanbilgisayar.com" + response.redirectPage;
        } else if (site == "evkur.com") {
          sites = "https://www.evkur.com.tr" + response.redirectPage;
        } else if (site == "teknosa.com") {
          sites = "https://www.teknosa.com" + response.redirectPage;
        } else {
          sites = response.redirectPage;
        }

        this.profileContainer.innerHTML += `
                <div class="card text-dark bg-light mr-4 mb-4">
                    <div id="getImage"class="card-img-top">
                        <img src="${response.productImage}" style="width:100%;height:200px" class="card-img-top">
                       
                    </div>
                    <div class="card-header bg-light">
                        <h6 id="getFullName"class="card-title text-dark">
                        ${response.productName}
                        </h6>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li id="getEmail" class="list-group-item bg-light text-dark">
                            Price : ${response.productPrice} TL
                        </li>
                        <li id="getEmail" class="list-group-item bg-light text-dark">
                            <a href="${response.page}" class="badge badge-primary text-wrap pt-2" style="font-size :13px; outline:0;text-decoration:none; height:30px;">Page Link</a>
                        </li>
                        <li id="getEmail" class="list-group-item bg-light text-dark">
                            <a href="${sites}" class="badge badge-primary text-wrap pt-2" style="font-size :13px; outline:0;text-decoration:none; height:30px;">Product Details</a>
                        </li>
                    
                    </ul>
                </div>
            `;
      } else if (
        site == "Hepsi" &&
        parseInt(
          response.productPrice.split(".").join("").split(",").join("")
        ) < parseInt(maxPrice) &&
        regex.test(response.productName)
      ) {
        let redirect2;
        let regex3 = new RegExp("vatanbilgisayar.com");
        let regex4 = new RegExp("teknosa.com");
        let regex5 = new RegExp("evkur.com");
        if (regex3.test(response.page)) {
          redirect2 = "https://www.vatanbilgisayar.com" + response.redirectPage;
        } else if (regex4.test(response.page)) {
          redirect2 = "https://www.teknosa.com" + response.redirectPage;
        } else if (regex5.test(response.page)) {
          redirect2 = "https://www.evkur.com.tr" + response.redirectPage;
        } else {
          redirect2 = response.redirectPage;
        }
        console.log(redirect2);
        this.profileContainer.innerHTML += `
                <div class="card text-dark bg-light mr-4 mb-4">
                    <div id="getImage"class="card-img-top">
                        <img src="${response.productImage}" style="width:100%;height:200px" class="card-img-top">
                       
                    </div>
                    <div class="card-header bg-light">
                        <h6 id="getFullName"class="card-title text-dark">
                        ${response.productName}
                        </h6>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li id="getEmail" class="list-group-item bg-light text-dark">
                            Price : ${response.productPrice} TL
                        </li>
                        <li id="getEmail" class="list-group-item bg-light text-dark">
                            <a href="${response.page}" class="badge badge-primary text-wrap pt-2" style="font-size :13px; outline:0;text-decoration:none; height:30px;">Page Link</a>
                        </li>
                        <li id="getEmail" class="list-group-item bg-light text-dark">
                            <a href="${redirect2}" class="badge badge-primary text-wrap pt-2" style="font-size :13px; outline:0;text-decoration:none; height:30px;">Product Details</a>
                        </li>
                    
                    </ul>
                </div>
            `;
      }
    });

    return {
      profile: this.profileContainer,
    };
  }
}
