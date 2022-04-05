let errorMsg = "Error occured. Please try again";

const handleError = ({ error }: any) => {
  console.log({ error });
  switch (error.code) {
    case "auth/wrong-password":
      errorMsg = "wrong password";
      break;
    case "auth/email-already-exists":
      errorMsg = "user already exist with same email";
      break;
    case "auth/email-already-in-use":
      errorMsg = "user already exist with same email";
      break;
    case "auth/internal-error":
      errorMsg = "internal server error";
      break;
    case "auth/invalid-credential":
      errorMsg = "wrong credentials entered";
      break;
    case "auth/invalid-email":
      errorMsg = "invalid email id";
      break;
    case "auth/invalid-password":
      errorMsg = "password must be atleast 6 characters long";
      break;
    case "auth/user-not-found":
      errorMsg = "user not found";
      break;
    default:
      break;
  }
  return (
    <p className="text-red-700 font-bold -mt-2 mb-2 text-center">{errorMsg}</p>
  );
};

export { handleError };
