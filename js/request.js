import Person from "./person.js";

export const result = {
  followersList: [],
  followingList: [],
};

export const fetchSection = async () => {
  return new Promise((resolve, reject) => {
    fetch("./database/data.json").then((response) => {
      response.json().then((data) => {
        const followers = data.followers;
        const following = data.following;
        result.followersList = [];
        result.followingList = [];
        followers.forEach((follower) => {
          result.followersList.push(
            new Person(
              follower.id,
              follower.name,
              follower.tag,
              follower.nfts,
              follower.image
            )
          );
        });
        following.forEach((following) => {
          result.followingList.push(
            new Person(
              following.id,
              following.name,
              following.tag,
              following.nfts,
              following.image
            )
          );
        });
        resolve(result);
      });
    }).catch((err) => {
      reject(err);
    });
  });
 
};
