import {fetchSection, result} from "./request.js";

const navLinksEls = document.querySelectorAll(".nav-link");

function createStyledCard(imageUrl, name, tag, nfts) {
  var card = document.createElement('div');
  card.className = 'card d-flex flex-row justify-content-between align-items-center w-75';
  card.style.gridTemplateColumns = 'auto auto auto';
  card.style.margin='0 4rem 0 8rem'
  card.style.background = '#000'
  card.style.borderBottom='solid 2px rgba(255, 255, 255, 0.1)'
  card.style.justifyContent = 'space-around'
  card.style.alignItems = 'center'

  var imgUserName = document.createElement('div');
  imgUserName.className = 'd-flex align-items-center';

  var imageElement = document.createElement('img');
  imageElement.className = 'rounded-circle mx-4';
  imageElement.style.width = '80px';
  imageElement.style.border = 'solid 2px #D8FC71ff';
  imageElement.style.height = '80px';
  imageElement.src = imageUrl;

  var nameUsernameElement = document.createElement('div');

  var usernameElement = document.createElement('h5');
  usernameElement.className = 'card-title';
  usernameElement.style.color = 'white';
  usernameElement.textContent = name;

  var tagElement = document.createElement('p');
  tagElement.className = 'card-text';
  tagElement.style.color = 'gray';
  tagElement.textContent = tag;

  nameUsernameElement.appendChild(usernameElement);
  nameUsernameElement.appendChild(tagElement);

  imgUserName.appendChild(imageElement);
  imgUserName.appendChild(nameUsernameElement);

  var nftsTextElement = document.createElement('div');

  var nftsText = document.createElement('p');
  nftsText.className = 'card-text';
  nftsText.textContent = `Created`;
  nftsText.style.color = 'gray';

  var nftsElement = document.createElement('p');
  nftsElement.className = 'card-text';
  nftsElement.textContent = `${nfts} NFTs`;
  nftsElement.style.color = '#D8FC71ff';

  nftsTextElement.appendChild(nftsText);
  nftsTextElement.appendChild(nftsElement);

  var divButton = document.createElement('div');
  divButton.className = 'd-inline';

  var followButton = document.createElement('button');
  followButton.className = 'btn border text-white px-5';
  followButton.textContent = 'Follow +';

  divButton.appendChild(followButton);

  card.appendChild(imgUserName);
  card.appendChild(nftsTextElement);
  card.appendChild(divButton);

  return card;
}

const setSection = (e) => {
  fetchSection().then(() => {
    const tabSection = document.getElementById(e.target.id.split('-')[0]);
    const {followersList, followingList} = result;
    tabSection.style.height = 'calc(100vh - 250px)';
    tabSection.innerHTML = '';
    const createTitleSection = (titleText, valueText) => {
      const titleSection = document.createElement('div');
      titleSection.className = 'grid-container';

      const title = document.createElement('h1');
      title.style.color = 'white';
      title.className = 'grid-item';
      title.textContent = titleText;

      const value = document.createElement('h1');
      value.style.color = 'grey';
      value.className = 'grid-item';
      value.textContent = valueText;

      titleSection.appendChild(title);
      titleSection.appendChild(value);

      return titleSection;
    };

    const title = createTitleSection('Followers', followersList.length);
    const titleFollowing = createTitleSection('Following', followingList.length);

    if (tabSection.id === 'followings') {
      tabSection.appendChild(titleFollowing);
      renderUserCards(tabSection, followingList, false);
    } else if (tabSection.id === 'followers') {
      tabSection.appendChild(title);
      renderUserCards(tabSection, followersList, true);
    }
  });

  navLinksEls.forEach((navLinkEl) => {
    navLinkEl.classList.remove('active');
  });

};

const renderUserCards = (tabSection, userList, isFollower) => {
  const cardList = document.createElement('div');
  cardList.style.height = 'calc(100vh - 390px)';
  cardList.style.overflow = 'auto';
  cardList.innerHTML = '';

  userList.forEach((user) => {
    const {id, name, tag, nfts, image} = user;
    const card = createStyledCard(image, name, tag, nfts, isFollower);
    cardList.appendChild(card);
  });
  tabSection.appendChild(cardList);
};


const getFollowersValue = () => {
  fetchSection().then(()=>{
    document.getElementById("followers-values").textContent = `${result.followersList.length}`;
    document.getElementById("following-values").textContent = `${result.followingList.length}`;
    document.getElementById("myFollowers").textContent = `${result.followersList.length}`;
    document.getElementById("myFollowing").textContent = `${result.followingList.length}`;
  })
}

getFollowersValue();
const initial = (resultLocal) => {
  const tabSection = document.getElementById('followers');
  const {followersList} = resultLocal;

  const title = document.createElement('div');
  title.className='grid-container'

  const followersTitle = document.createElement('h1');
  followersTitle.style.color = 'white';
  followersTitle.className = 'grid-item';
  followersTitle.textContent = `Followers`;


  const followersValue = document.createElement('h1');
  followersValue.style.color = 'grey';
  followersValue.className = 'grid-item';
  followersValue.textContent =  `${followersList.length}`;

  title.appendChild(followersTitle);
  title.appendChild(followersValue);

  const cardList = document.createElement('div');
  cardList.style.height = 'calc(100vh - 390px)';
  cardList.style.overflow = 'auto';
  cardList.innerHTML = '';

  tabSection.appendChild(title);

  tabSection.appendChild(cardList)

  followersList.forEach((following) => {
    const {id, name, tag, nfts, image} = following;
    const card = createStyledCard(image, name, tag, nfts, true);
    cardList.appendChild(card);
  });
};
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
