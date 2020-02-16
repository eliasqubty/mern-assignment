import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Pagination from "react-js-pagination";
import { addProduct } from "../../actions/action";
import { connect } from "react-redux";
import "./dataTable.css";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from "reactstrap";

function DataTable(props) {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [edit, setEdit] = useState({});
  const clickDel = (id) => {
    setDelId(id);
    setDelModal(true);
  }
  const clickEdit = (obj) => {
    setEdit(obj);
    setEditModal(true);
  }
  const toggle = () => setModal(!modal);
  const toggleEdit = () => setEditModal(!modal);
  const toggleDel = () => setDelModal(!delModal);
  const [activePage, setActivePage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);
  const [limit, setLimit] = useState(10);
  const [run, setRun] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState(1);

  useEffect(() => {

    if (current !== activePage || run) {
      setRun(false);
      setCurrent(activePage);
      fetch(`/records/search_product?page=${activePage}&limit=${limit}&keyword=${keyword}&orderBy=${orderBy}&order=${order}`)
        .then(res => res.json())
        .then(res => {
          console.log(res.data);
          if (res.success) {
            props.dispatch(addProduct(res.data));
            setTotal(res.total);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    console.log(pageNumber)
  }
  function handleSearchBox(e) {
    setKeyword(e.target.value);
    setRun(true);
  }
  function del() {
    fetch(`/records/del_product?_id=${delId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.success) {
          toggleDel();
          setRun(true)
        }
      })
      .catch(err => { console.log(err) })

  }
  function handleLimit(e) {
    console.log(e.target.value)
    setLimit(e.target.value)
    setRun(true);
  }
  function handleOrderBy(e) {
    console.log(e.target.value)
    setOrderBy(e.target.value)
    setRun(true);
  }
  function handleOrder(e) {
    console.log(e.target.value)
    setOrder(e.target.value)
    setRun(true);
  }


  return (
    <>
      <Container className="mt--7 data-table" fluid>
        <AddProduct open={modal} toggle={toggle} run={setRun} />
        <EditProduct open={editModal} toggle={toggleEdit} edit={edit} setEditModal={setEditModal} run={setRun} />
        <Del open={delModal} toggle={toggleDel} del={del} />
        <Row>
          <div className="col-lg-10 mx-auto col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h5 className="mb-0">Hi {props.user.fName + " " + props.user.lName}</h5>
                <h3 className="mb-0">Products Data</h3>
                <div className="row">
                  <div className="col-lg-4 col-sm-8 col112">
                    <p>Show</p>
                    <select onChange={handleLimit} name="limit" class="browser-default select custom-select mb-4">
                      <option value="10" defaultValue>10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                    <p>entries per page</p>
                  </div>
                  <div className="col-lg-4 col-sm-4">
                    <button className="btn btn-primary add-p-btn" onClick={toggle}>Add Product</button>
                  </div>
                  <div className="col-lg-4">
                    <input
                      className="user-search-box"
                      type="text"
                      placeholder="Search user"
                      onChange={handleSearchBox}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-sm-8 col112">
                    <p>Order By</p>
                    <select onChange={handleOrderBy} class="browser-default select2 custom-select mb-4">
                      <option value="name">Name</option>
                      <option value="brandName">Brand</option>
                      <option value="price" defaultValue>Price</option>
                      <option value="condition">Condition</option>
                    </select>
                    <select onChange={handleOrder} name="limit" class="browser-default select2 custom-select mb-4">
                      <option value="1">ascending</option>
                      <option value="-1">descending </option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center datatable table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Price</th>
                    <th scope="col">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {props.products.map((value, index) => {
                    return <tr className="user-row">
                      <td className="name-col" scope="row">
                        <span className="">{value.name}</span>
                        <br />
                        <div className="actions">
                          <ul>
                            <li>
                              <span onClick={() => clickEdit(value)}>Edit</span>
                            </li>
                            <li className="del">
                              <span onClick={() => clickDel(value._id)}>Delete</span>
                            </li>
                          </ul>
                        </div>

                      </td>
                      <td>{value.brandName}</td>
                      <td>${value.price}</td>
                      <td>{value.condition}</td>
                    </tr>
                  })}


                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="..."></nav>
                <div className="row">
                  <div className="col-lg-6">
                    <p className="enteries">Showing {(limit * (activePage - 1)) + 1} to {(limit * (activePage - 1)) + props.products.length} of {total} entries{}</p>
                  </div>
                  <div className="col-lg-6">
                    <Pagination
                      prevPageText="prev"
                      nextPageText="next"
                      firstPageText="first"
                      lastPageText="last"
                      activePage={activePage}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={3}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
const mSTP = (store) => {
  return {
    products: store.productReducer,
    user: store.userReducer
  }
}
export default connect(mSTP)(DataTable);



const AddProduct = (props) => {
  const [err, setErr] = useState("");
  const [values, setValues] = useState({
    name: "",
    price: "",
    brandName: "",
    condition: ""
  })
  const {
    buttonLabel,
    className
  } = props;

  function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!(values.name && values.price && values.brandName && values.condition)) {
      setErr("Please fill all fields to continue")
    } else {
      fetch(`/records/add_product?name=${values.name}&price=${values.price}&brandName=${values.brandName}&condition=${values.condition}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success) {
            props.run(true);
            props.toggle();
          }
        })
        .catch(err => { console.log(err) })
    }
  }
  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={props.open} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <form class="text-center border border-light p-4" >

            <p class="h4 mb-4">Product Details</p>
            <input type="text" name="name" onChange={handleInput} class="form-control mb-4" placeholder="Product Name" />

            <input type="number" name="price" onChange={handleInput} class="form-control mb-4" placeholder="Price in $" />

            <label>Brand Name</label>
            <select onChange={handleInput} name="brandName" class="browser-default custom-select mb-4">
              <option value="" disabled selected>Choose option</option>
              <option value="Samsung" defaultValue>Samsung</option>
              <option value="Sony">Sony</option>
              <option value="Huawei">Huawei</option>
            </select>
            <label>Condition</label>
            <select onChange={handleInput} name="condition" class="browser-default custom-select mb-4">
              <option value="" disabled>Choose option</option>
              <option value="New" defaultValue>New</option>
              <option value="Used">Used</option>
            </select>
            <small class="form-text text-muted mb-4">
              {err}
            </small>
            <button onClick={handleSubmit} class="btn btn-info btn-block">Save</button>

          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
const EditProduct = (props) => {
  const [err, setErr] = useState("");
  const [values, setValues] = useState({
    name: props.edit.name,
    price: props.edit.price,
    brandName: "",
    condition: ""
  })
  const {
    buttonLabel,
    className
  } = props;

  function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!(values.name && values.price && values.brandName && values.condition)) {
      setErr("Please fill all fields to continue")
    } else {
      fetch(`/records/edit_product?name=${values.name}&price=${values.price}&brandName=${values.brandName}&condition=${values.condition}&_id=${props.edit._id}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success) {
            props.run(true);
            props.setEditModal(false);
          }
        })
        .catch(err => { console.log(err) })
    }
  }
  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={props.open} toggle={() => props.setEditModal(false)} className={className}>
        <ModalHeader toggle={() => props.setEditModal(false)}>Modal title</ModalHeader>
        <ModalBody>
          <form class="text-center border border-light p-4" >

            <p class="h4 mb-4">Product Details</p>
            <input type="text" name="name" defaultValue={props.edit.name} onChange={handleInput} class="form-control mb-4" placeholder="Product Name" />

            <input type="number" name="price" defaultValue={props.edit.price} onChange={handleInput} class="form-control mb-4" placeholder="Price in $" />

            <label>Brand Name</label>
            <select onChange={handleInput} name="brandName" class="browser-default custom-select mb-4">
              <option value="" disabled>Choose option</option>
              <option value="Samsung" defaultValue>Samsung</option>
              <option value="Sony">Sony</option>
              <option value="Huawei">Huawei</option>
            </select>
            <label>Condition</label>
            <select onChange={handleInput} name="condition" class="browser-default custom-select mb-4">
              <option value="" disabled>Choose option</option>
              <option value="New" defaultValue>New</option>
              <option value="Used">Used</option>
            </select>
            <small class="form-text text-muted mb-4">
              {err}
            </small>
            <button onClick={handleSubmit} class="btn btn-info btn-block">Save</button>

          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}


const Del = (props) => {
  const {
    buttonLabel,
    className
  } = props;



  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={props.open} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Delete Item?</ModalHeader>
        <ModalBody>
          Are you sure you want to delete item? Click on delete to confirm
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.del}>Delete</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}