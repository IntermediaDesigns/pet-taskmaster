import Login from "../../components/Login.jsx";
import { fetchUser } from "../../../lib/fetchUser.js";

export default async function SignUpPage() {
  let user = await fetchUser();
  return <Login user={user} />;
}
