export const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const nameRegx = /^[a-zA-Z]([\w -]*[a-zA-Z])?$/;
export const homeScreenName = "Home";
export const loginScreenName = "Login";
export const signupScreenName = "Signup";
export const ideasScreenName = "Ideas";
export const updateIdeaScreenName = "update";
export const createIdeaScreenName = "create";
export const settingsScreenName = "Settings";
export const ideaFeedsScreenName = "IdeaFeeds";
export const jwtKey = "jwtToken";
export const unProtectedScreens = [homeScreenName, loginScreenName, signupScreenName];
export const protectedScreens = [ideaFeedsScreenName, settingsScreenName, ideasScreenName];
export const sortOption1 = {
    name: "average rating",
    value: "average"
};
export const sortOption2 = {
    name: "title",
    value: "title"
};
export const sortOption3 = {
    name: "date created",
    value: "createdAt"
};
export const sortOption4 = {
    name: "date updated",
    value: "updatedAt"
};
export const sortOptions = [sortOption1, sortOption2, sortOption3, sortOption4];
export const loginFailureMessage = "invalid credentials!";
export const confidenceRatingTitle = "confidence";
export const easeRatingTitle = "ease";
export const impactRatingTitle = "impact";
export const minimumRating = 1;
export const maximumRating = 10;
export const limit = 10;
