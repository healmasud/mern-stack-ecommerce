import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [clr, setClr] = useState([]);
  const [sz, setSz] = useState([]);
  const dispatch = useDispatch();
  const { scc, error } = useSelector((state) => state.product);
  const [err, setError] = useState(error);
  const [sc, setSuccess] = useState(scc);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value);
  };
  const handleClr = (e) => {
    setClr(e.target.value.split(","));
  };
  const handleSz = (e) => {
    setSz(e.target.value.split(","));
  };

  const handleClick = (e) => {
    if (file === null) {
      setError(true);
    } else {
      setSuccess(true);
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload Halted");
              break;
            case "running":
              console.log("Upload In Progress");
              break;
            default:
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {
              ...inputs,
              img: downloadURL,
              categories: cat,
              size: sz,
              color: clr,
            };
            addProduct(product, dispatch);
          });
        }
      );
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ cursor: "pointer" }}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            name="title"
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Product Description"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="Product Price"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select
            name="category"
            style={{ color: "grey" }}
            onChange={handleCat}
            required
          >
            <option selected disabled>
              Pick Category
            </option>
            <option value="Valentine's Collection Men">
              Valentine's Collection Men
            </option>
            <option value="Valentine's Collection Women">
              Valentine's Collection Women
            </option>
            <option value="Light Jackets">Light Jackets</option>
            <option value="T-shirts">T-shirts</option>
            <option value="Dresses">Dresses</option>
            <option value="Denim Jeans">Denim Jeans</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="Product Color"
            onChange={handleClr}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="text"
            placeholder="Product Size"
            onChange={handleSz}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select
            name="inStock"
            style={{ color: "grey" }}
            onChange={handleChange}
            required
          >
            <option selected disabled>
              Set Status
            </option>
            <option value="true">In Stock</option>
            <option value="false">Out Of Stock</option>
          </select>
        </div>
        {err ? (
          <>
            <button onClick={handleClick} className="addProductButton">
              {" "}
              Add Product{" "}
            </button>
            <span style={{ marginLeft: "10px" }}>Empty Fields !</span>
          </>
        ) : sc ? (
          <>
            <button onClick={handleClick} className="addProductButton">
              Add Product
            </button>
            <span style={{ marginLeft: "10px" }}>
              Product Added Successfully
            </span>
          </>
        ) : (
          <button onClick={handleClick} className="addProductButton">
            Add Product
          </button>
        )}
      </form>
    </div>
  );
}
