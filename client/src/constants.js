var API;

if (process.env.NODE_ENV === "development") {
    API = "http://localhost:5000";
  } else if (process.env.NODE_ENV === "production") {
    API = "https://heroku-test-kaboo3.herokuapp.com/";
}

export default API;