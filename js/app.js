import {fetchSection, result} from "./request.js";

const navLinksEls = document.querySelectorAll(".nav-link");

const setSection = (e) => {
  fetchSection().then(() => {
    const tabSection = document.getElementById(e.target.id.split("-")[0]);
    const {followersList, followingList} = result;
    tabSection.innerHTML = "";

    if (tabSection.id === "followings") {
      followingList.forEach((follower) => {
        const {id, name, tag, nfts, image} = follower;

        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";

        const imageElement = document.createElement("img");
        imageElement.className = "card-img-top rounded-circle";
        imageElement.src = image;
        imageElement.alt = "User Image";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const usernameElement = document.createElement("h5");
        usernameElement.className = "card-title";
        usernameElement.textContent = name;

        const tagElement = document.createElement("p");
        tagElement.className = "card-text";
        tagElement.textContent = tag;

        const nftsElement = document.createElement("p");
        nftsElement.className = "card-text";
        nftsElement.textContent = `NFTs: ${nfts}`;

        const followButton = document.createElement("button");
        followButton.className = "btn btn-primary";
        followButton.textContent = "Follow +";

        cardBody.appendChild(imageElement);
        cardBody.appendChild(usernameElement);
        cardBody.appendChild(tagElement);
        cardBody.appendChild(nftsElement);
        cardBody.appendChild(followButton);

        card.appendChild(cardBody);

        tabSection.appendChild(card);
      });
    } else if (tabSection.id === "followers") {
      followersList.forEach((following) => {
        const {id, name, tag, nfts, image} = following;

        const card = document.createElement("div");
        card.className = "card";
        card.style.background = "#171717";

        const imageElement = document.createElement("img");
        imageElement.className = "card-img-top rounded-circle w-10";
        imageElement.style.width = "25%";
        imageElement.src = image;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.style.width = "100%";

        const usernameElement = document.createElement("h5");
        usernameElement.className = "card-title";
        usernameElement.textContent = name;

        const tagElement = document.createElement("p");
        tagElement.className = "card-text";
        tagElement.textContent = tag;

        const nftsElement = document.createElement("p");
        nftsElement.className = "card-text";
        nftsElement.textContent = `NFTs: ${nfts}`;

        const followButton = document.createElement("button");
        followButton.className = "btn btn-primary";
        followButton.textContent = "Follow +";

        cardBody.appendChild(imageElement);
        cardBody.appendChild(usernameElement);
        cardBody.appendChild(tagElement);
        cardBody.appendChild(nftsElement);
        cardBody.appendChild(followButton);

        card.appendChild(cardBody);

        tabSection.appendChild(card);
      });
    }
  });
  navLinksEls.forEach((navLinkEl) => {
    navLinkEl.classList.remove("active");
  });
};

const initial = (resultLocal) => {
  const tabSection = document.getElementById("followers");
  const {followersList} = resultLocal;
  tabSection.innerHTML = "";

  followersList.forEach((following) => {
    const {id, name, tag, nfts, image} = following;

    const card = document.createElement("div");
    card.className = "card";
    card.style.background = "#171717";

    const imageElement = document.createElement("img");
    imageElement.className = "card-img-top rounded-circle w-10";
    imageElement.style.width = "25%";
    imageElement.src = image;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.style.width = "100%";

    const usernameElement = document.createElement("h5");
    usernameElement.className = "card-title";
    usernameElement.textContent = name;

    const tagElement = document.createElement("p");
    tagElement.className = "card-text";
    tagElement.textContent = tag;

    const nftsElement = document.createElement("p");
    nftsElement.className = "card-text";
    nftsElement.textContent = `NFTs: ${nfts}`;

    const followButton = document.createElement("button");
    followButton.className = "btn btn-primary";
    followButton.textContent = "Follow +";

    cardBody.appendChild(imageElement);
    cardBody.appendChild(usernameElement);
    cardBody.appendChild(tagElement);
    cardBody.appendChild(nftsElement);
    cardBody.appendChild(followButton);

    card.appendChild(cardBody);

    tabSection.appendChild(card);
  });};


document.getElementById("followings-tab").addEventListener("click", setSection);
document.getElementById("followers-tab").addEventListener("click", setSection);

[].slice
  .call(document.querySelectorAll("#myTab li button"))
  .forEach(function (triggerEl) {
    triggerEl.addEventListener("click", function (event) {
      event.preventDefault();
      const triggerer = event.target.id;
      const tab = document.querySelector(`#${triggerer.split("-")[0]}`);
      const tabsList = document.querySelectorAll(".tab-pane");
      tabsList.forEach((tabEl) => {
        tabEl.classList.remove("active");
      });
      tab.classList.add("active");
    });
  });

const fetchEverything = async () => {
  const resultLocal = await fetchSection();
  initial(resultLocal);
};

addEventListener("load", fetchEverything);
