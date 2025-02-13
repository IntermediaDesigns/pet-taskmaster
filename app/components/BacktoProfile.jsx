import Link from "next/link.js";
export default function BacktoProfile({ user }) {
  return (
    <>
      <div>
        {user.id ? (
          <Link href={`/user/${user.id}`}>
            Profile
          </Link>
        ) : (
          <Link href={"/login"}>
            Login
          </Link>
        )}
      </div>
    </>
  );
}
