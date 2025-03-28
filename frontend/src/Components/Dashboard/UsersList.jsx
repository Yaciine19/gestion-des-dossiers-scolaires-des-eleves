import Loading from "../Loading";
import UserListItem from "./UserListItem";

export default function UsersList({ users, type }) {
  return (
    <ul className="w-full divide-y divide-gray-200 bg-white overflow-hidden shadow rounded-lg border border-primary font-poppins">
      {users?.length > 0 ? (
        type === "Teachers" ? (
          users?.map((user, index) => (
            <UserListItem
              key={index}
              fullName={`${user.firstName} ${user.lastName}`}
              email={user.email}
              extraData={user.subject.name}
            />
          ))
        ) : (
          users?.map((user, index) => (
            <UserListItem
              key={index}
              fullName={`${user.firstName} ${user.lastName}`}
              email={user.email}
              extraData={user.registrationNumber}
            />
          ))
        )
      ) : type === "Teachers" ? (
        <div className="text-red-500 p-3 sm:p-4 font-medium">
          there is no Teacher is assigned to this class.
        </div>
      ) : (
        <div className="text-red-500 p-3 sm:p-4 font-medium">
          there is no student is assigned to this class.
        </div>
      )}
    </ul>
  );
}
