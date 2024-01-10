import {useState, useEffect } from 'react'
import Currency from '../Currency'
import axios from 'axios'
import { toast } from 'react-toastify'

const History = () => {
    const [products, setProducts] = useState([])
    const userID = localStorage.getItem('userId')
    
    useEffect(() => {
        if(!userID){
            return console.log("No user found")
        }else{
            getHistory()
        }

        return () => {
            setProducts([])
        }
    }, [])

    const getHistory = () => {
        axios.get(`http://localhost:3000/api/v1/orders/find-by-id/${userID}`)
            .then(response => {
                if(!response.data){
                    console.log("No data found");
                    setProducts([]);
                    return;
                }
                if(Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    setProducts([response.data]);
                }
            })
            .catch(error => {
                toast.error(error.message);
            });
    }
        
  return (
    <section>
        {
            <div>
            <div className="container">         
              <h5 className="mb-4">
                Your Order History
              </h5>
            </div>
            <div>
              {!products ? (
                <div className='m-3'>Not Item Founded!</div>
              ) : (
                products.map((product, index) => (
                    <div className="container" key={index}>
                        <div className="row">
                            <div className="col-md-12">
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{product.orderID}</td>
                                            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {
                                                product.products && product.products.map((product, index) => (
                                                    <p key={index}>{product.name}</p>
                                                ))}
                                            </td>
                                            
                                            <td>
                                                {
                                                    product.products && product.products.map((product, index) => (
                                                        <p key={index}>{product.quantity + " " + "Items"}</p>
                                                    ))
                                                }
                                            </td>
                                            <td>
                                                {
                                                    product.totalCost && <Currency price={product.totalCost} />
                                                }
                                            
                                            </td>
                                            <td>
                                                {
                                                    product.status === "Pending" ? (
                                                        <span className="badge badge-warning">Pending</span>
                                                    ) : (
                                                        <span className="badge badge-success">Approved</span>
                                                    )
                                                }
                                            </td>
                                           
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                  </div>

                ))
                    
              )}
            </div>
            </div>
        }
  </section>
  )
}

export default History