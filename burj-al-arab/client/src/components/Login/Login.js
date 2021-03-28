import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import "./Login.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        storeAuthToken();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const storeAuthToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        history.replace(from);
      })
      .catch(function (error) {
        // Handle error
      });
  };
  return (
    <div className="login">
      <h1>This is Login</h1>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "10px" }}
        onClick={handleGoogleSignIn}
      >
        <FontAwesomeIcon
          icon={faGoogle}
          style={{ color: "lightGreen", marginRight: "5px" }}
        />
        Sign In
      </Button>
    </div>
  );
};

export default Login;
