import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { setProductId } from "../store/slices/productSlice";

const products = [
  {
    id: 646734,
    name: "Wireless Mouse",
    price: 19.99,
  },
  {
    id: 918275,
    name: "Bluetooth Headphones",
    price: 49.99,
  },
  {
    id: 374829,
    name: "Mechanical Keyboard",
    price: 89.99,
  },
  {
    id: 562193,
    name: "USB-C Charger",
    price: 24.99,
  },
  {
    id: 845617,
    name: "27-inch Monitor",
    price: 229.99,
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAbout = (id) => {
    dispatch(setProductId(id));

    setTimeout(() => {
      window.open("/products", "_blank");
    }, 0);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <nav>
        <Link to="/about" className="about">
          About
        </Link>
        <div className="title">Products</div>
        <ul>
          {products.map((el) => (
            <li key={el.id} onClick={() => handleAbout(el.id)}>
              {el.name} ({el.id})
            </li>
          ))}
        </ul>
      </nav>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
