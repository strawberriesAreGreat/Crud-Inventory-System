import React from 'react';
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery ,useMutation} from "react-query";
import './InventoryList.css';
import rmv from './delete.png';
import save from './save.png';
import { useForm } from "react-hook-form";
const endpoint = "http://localhost:8080/api";
const queryClient = new QueryClient();



const SELECT_QUERY = `
{
  inventory(location_id: 1) {
    location_id,
    sku, 
    stock, 
    product{
      name,
      description,
      price,
      category
    }
  }
}
`
const DELETE_QUERY = `
mutation{
  delete_inventory(location_id:1,sku:2){
    sku
  }
}
`


const InventoryList = () => {
  const [stock, setStock] = React.useState("");

  const { data, isLoading, error } = useQuery("inventory", () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: SELECT_QUERY
      }
    }).then(response => response.data.data);
  });

  const mutation = useMutation(data => {
    return axios({
      url: endpoint,
      method: "POST",
      data:{ query:  "mutation{delete_inventory(location_id:"+data.location_id+",sku:"+data.sku+"){sku}}" }
    })
  },{onSuccess: data => {
    window.location.reload();
  }});


  const handleSubmit = (data, event) => {
    console.log(`
    HELP `
  );
  
  event.preventDefault();
  
  }

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>Store 1's Stock</h1>
      <ul>
        {data.inventory.map((unit) => (

          <div className='inventory-item'>
          <li key={unit.sku}>
          <form onSubmit={ handleSubmit }>
      
                <div className='sku'> {unit.sku} </div>
                <div className='name'> {unit.product[0].name} </div>
                <div className='price'> {unit.product[0].price} </div>
                <div  className='stock'>
                  <input type="hidden" id="location_id" name="location_id" value={unit.location_id} />
                  <input
                      type="number"
                      id="stock"
                      name="stock"
                      defaultValue={unit.stock} 
                      onChange={e => setStock(e.target.value)}
                  />
                </div>
                <div className='category'> {unit.product[0].category} </div>
                <div  className='description'> {unit.product[0].description}</div>
       
                <div className='edit'>
                <button type="submit">
                    <img src={save} alt='save' width='30vw'/>
                </button>
                </div>
          </form>

              <div className='delete'>
                
              <button onClick={() => { mutation.mutate(
                {  
                  location_id: unit.location_id,
                  sku: unit.sku, 
                }
                ); }}>
                <img src={rmv} alt='delete' width='30vw'/>
              </button>
              </div>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;


