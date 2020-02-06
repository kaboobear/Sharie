var API;

if (process.env.NODE_ENV === "development") {
    API = "http://localhost:5000";
    alert("x");
  } else if (process.env.NODE_ENV === "production") {
    API = "https://be-prepared-app-bk.herokuapp.com";
    alert("y");
}

export default API;