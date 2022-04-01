import { useLocation } from "react-router-dom";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updatePrd } from "../../redux/apiCalls";
import styled from "styled-components";

const Duo = styled.div`
  display: flex;
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid #4889c2;
  border-radius: 10px;
  padding: 3% 3%;
  margin-bottom: 5%;
`;

const Button = styled.button`
  background: transparent;
  outline: 0;
  border: none;
  color: #4889c2;
  width: 100%;
  text-align: right;
  cursor: pointer;
  font-size: 16px;
`;

const Input = styled.input`
  border: none;
  outline: 0;
  width: 100%;
`;

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const produc = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const dispatch = useDispatch();
  const prdname = produc.title;
  const prddesc = produc.desc;
  const prdprice = produc.price;
  const prdcategory = produc.categories;
  const prdcolor = produc.color;
  const prdsize = produc.size;
  const prdtt = produc.inStock;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [status, setStatus] = useState("");

  const handleClick = () => {
    let nm = "";
    if (name === "") {
      nm = prdname;
    } else {
      nm = name;
    }

    let dsc = "";
    if (desc === "") {
      dsc = prddesc;
    } else {
      dsc = desc;
    }

    let pr = 0;
    if (price === 0) {
      pr = prdprice;
    } else {
      pr = price;
    }

    let ct = [];
    if (category === []) {
      ct = prdcategory;
    } else {
      ct = category;
    }

    let cl = [];
    if (color === []) {
      cl = prdcolor;
    } else {
      cl = color;
    }

    let sz = [];
    if (size === []) {
      sz = prdsize;
    } else {
      sz = size;
    }

    let st = "";
    if (status === "") {
      st = prdtt;
    } else {
      st = status;
    }

    updatePrd(dispatch, productId, nm, dsc, pr, ct, cl, sz, st);
  };

  const handleChange = (e) => {
    setStatus((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChange2 = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product Details</h1>
      </div>
      <div className="productBottom">
        <div className="productForm">
          <div className="productFormLeft">
            <div className="productUpload">
              <img src={produc.img} alt="" className="productUploadImg" />
            </div>
            <Duo>
              <Input
                type="text"
                placeholder={produc.title}
                name="title"
                onChange={(e) => setName(e.target.value)}
              />
            </Duo>
            <Duo>
              <Input
                type="text"
                placeholder={produc.desc}
                name="desc"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Duo>
            <Duo>
              <Input
                type="number"
                placeholder={produc.price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Duo>
            <Duo>
              <select
                name="category"
                id="category"
                style={{
                  border: "transparent",
                  width: "100%",
                  outline: "none",
                  color: "gray",
                  fontSize: "16px",
                }}
                onChange={handleChange2}
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
            </Duo>
            <Duo>
              <Input
                type="text"
                placeholder={produc.color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Duo>
            <Duo>
              <Input
                type="text"
                placeholder={produc.size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Duo>
            <Duo>
              <select
                name="inStock"
                id="idStock"
                style={{
                  border: "transparent",
                  width: "100%",
                  outline: "none",
                  color: "gray",
                  fontSize: "16px",
                }}
                onChange={handleChange}
              >
                <option selected disabled>
                  Set Status
                </option>
                <option value="true">In Stock</option>
                <option value="false">Out Of Stock</option>
              </select>
            </Duo>
            <Button onClick={() => handleClick()}>Update Product</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
