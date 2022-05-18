import React from 'react';
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery,useMutation } from "react-query";
import './InventoryList.css';
import rmv from './delete.png';
import save from './save.png';
import { set, useForm } from "react-hook-form";
const endpoint = "http://localhost:8080/api";

const queryClient = new QueryClient();




const InventoryList = () => {

  {/* default city is toronto */}
  const [city, setCity] = React.useState('1');
  const [refresh, setRefresh] = React.useState(false);
  const SELECT_QUERY = `
  {
    inventory(location_id:`+ city +`) {
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
  const handleCityChange = (newCity) => {
    setCity(newCity);
    console.log(newCity);
 }


  const { data, isLoading, error } = useQuery(['query-tutorials', city, refresh], () => {
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
    }).then(setRefresh( !refresh ));

  });

  const handleSubmit = (event) => {
    {/*getting the form to behave was the hardest part of this entire project */}
    console.log(event.target.stock.value);
    event.preventDefault();
    const location_id = event.target.location_id.value; 
    const sku = event.target.sku.value; 
    const stock = event.target.stock.value; 
    axios({
      url: endpoint,
      method: "POST",
      data:{ query:  "mutation{update_inventory(location_id:"+location_id+",sku:"+sku+",stock:"+stock+"){sku}}" }
  }).then(setRefresh(!refresh));
  };

   useMutation((location_id, sku, stock) => {
    return axios({
      url: endpoint,
      method: "POST",
      data:{ query:  "mutation{delete_inventory(location_id:"+location_id+",sku:"+sku+",stock:"+stock+"){sku}}" }
    })
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
 
    <div>
      <div className='head'>
        <div className='location_details'>
          <div className='location_name'>
          <select name="city" value={city} onChange={event => handleCityChange(event.target.value)}>
            <option id="1" value="1">West Toronto</option>
            <option id="2" value="2">Montreal - Plateau </option>
            <option id="3" value="3">Central Chicago</option>
            <option id="4" value="4">Oak Hill</option>
            <option id="5" value="5">Columbus</option>
          </select>
          </div>
          <div className='location_weather'>
           <h3> Right now conditions are sunny, with a temperature of 21 celcius but feeling like 15.</h3>
          </div>
        </div>
        <div className='inventory-item'>
          <div className='sku'>sku</div>
          <div className=' name'>product name</div>
          <div className='price'>price</div>
          <div className='stock'>inventory count</div>
          <div className='category'>product category</div>
          <div className='description'>product description</div>
          <div className='edit'> save changes delete</div>
          <div className='delete'> delete</div>
        </div>
      </div>
      <div className='body'>
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
                  <input type="hidden" id="sku" name="sku" value={unit.sku} />
                  <input
                      type="number"
                      id="stock"
                      name="stock"
                      defaultValue={unit.stock} 
                  
                  />
                </div>
                <div className='category'> {unit.product[0].category} </div>
                <div className='description'> {unit.product[0].description}</div>
                <div className='edit'>
                  <button type="submit" >
                      <img src={save} alt='save' width='30vw'/>
                  </button>
                </div>
              <div className='delete'>
                <button onClick={() => { mutation.mutate({  
                  location_id: unit.location_id,
                  sku: unit.sku, 
                }); }}>
                  <img src={rmv} alt='delete' width='30vw'/>
                </button>
              </div>
              </form>
            </li>
          </div>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default function Wraped(){
  return(<QueryClientProvider client={queryClient}>
          <InventoryList/>
      </QueryClientProvider>
  );
  }