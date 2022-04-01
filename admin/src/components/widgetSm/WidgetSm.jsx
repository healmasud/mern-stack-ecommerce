import "./widgetSm.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../redux/apiCalls";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get("users");
      try {
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const handleUpdate = (id, ad) => {
    updateUser(id, ad, dispatch);
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">List Of Users</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.img || "https://i.imgur.com/WGYfga4.gif"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <div>
              <span className="widgetSmUsername">
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <div class="z">
              <button
                class="promote"
                onClick={() => handleUpdate(user._id, user.isAdmin)}
              >
                Promote | Demote
              </button>
              <button class="ban" onClick={() => handleDelete(user._id)}>
                Perma Ban
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
