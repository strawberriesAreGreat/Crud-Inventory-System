import React from 'react';
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery,useMutation } from "react-query";
import './InventoryList.css';
import rmv from './delete.png';
import save from './save.png';
import add from './add.png';
import { set, useForm } from "react-hook-form";
const endpoint = "http://localhost:8080/api";

const queryClient = new QueryClient();




const InventoryList = () => {

  const[inventory, setInventory] = React.useState('');


  {/* default city is toronto */}
  const [city, setCity] = React.useState('1');
  const [location, setLocation] = React.useState({ location_id:"1",weather:"unknown ATM"});
  const [warehouses, setWarehouses] = React.useState('1');
  
  const[refresh,forceRefresh ]= React.useState(false);
  const [hiddenMenu, setHidden] = React.useState(false);
  const [hiddenMenu2, setHidden2] = React.useState(false);
  const [prods, setMissingProducts] = React.useState("");
  const [findweather, pullWeather] = React.useState(false);


  
  const SELECT_QUERY = `
  {
    inventory(location_id:`+ location.location_id +`) {
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
  const SELECT_MISING_PRODUCTS = `
  query{
    productsNotInInventory(location_id:`+ location.location_id +`){
       sku
      name
    }
  }
  `
  const SELECT_WAREHOUSES = `
  query{
    locations(city_id:`+ city +`){
      location_id
      street
			longitude
    	latitude
    	weather
    }
  }
  `
  const FETCH_WEATHER = `
  query{
    location(location_id:`+ location.location_id +`){
      location_id
			longitude
    	latitude
    	weather
    }
  }
  `

  const toggleHidden = (e) => {
    console.log("hidden: " + hiddenMenu);
    setHidden(!hiddenMenu);
    e.preventDefault();
  }
  const toggleHidden2 = (e) => {  
    setHidden2(!hiddenMenu2);
    e.preventDefault();
  }
  const handleCityChange = (e) => {
    setCity(e);
    location.location_id = e;
    console.log("NEW CITY: " + e);
    pullWeather(!findweather);
  }
  const handleWarehouseSelect = (e) => {
    console.log(e[0]);
    setLocation({ location_id:e[0],weather:e[1]})
    pullWeather(!findweather);
  }
  const setWeather = (e) => {
    console.log(e);
    setLocation({ location_id:e.location_id,weather:e.weather})
  }
  
  const { fetchWeather } = useQuery(['query-weather', findweather], () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: FETCH_WEATHER
      }
    }).then( response => { setWeather(response.data.data.location[0])} );
  }); 

const { fetchWareHouses } = useQuery(['query-warehouses', location, city], () => {
  return axios({
    url: endpoint,
    method: "POST",
    data: {
      query: SELECT_WAREHOUSES
    }
  }).then( response => { setWarehouses(response.data.data)} );
});
  
  const { missingProducts } = useQuery(['query-missingProducts', hiddenMenu], () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: SELECT_MISING_PRODUCTS
      }
    }).then( response => { setMissingProducts(response.data.data)} );
  });
  

  const mutation = useMutation(data => {

    return axios({
      url: endpoint,
      method: "POST",
      data:{ query:  "mutation{delete_inventory(location_id:"+data.location_id+",sku:"+data.sku+"){sku}}" }
    }).then();

  });

  const addNewProduct = (event) =>{
    event.preventDefault();
    const location_id = location.location_id; 
    const sku = event.target.sku.value; 
    const stock = event.target.stock.value; 
    setHidden(!hiddenMenu);
    axios({
      url: endpoint,
      method: "POST",
      data:{ query:  "mutation{insert_inventory(location_id:"+location_id+",sku:"+sku+",stock:"+stock+"){sku}}" }
    }).then( forceRefresh(!refresh) );
  }
  const addNewLocation = (event) =>{
    event.preventDefault();



    console.log(event);

    const city_id = String(event.target[0].value);
    const country = String(event.target[3].value);
    const region = String(event.target[4].value);
    const city =String(event.target[5].value);
    const street =String(event.target[6].value);
    const zipCode = String(event.target[7].value);
    const latitude = String(event.target[1].value);
    const longitude = String(event.target[2].value);

    const ourQuery =  "mutation{insert_location(city_id:"+city_id+",country:\""+country+"\",region:\""+region+"\",city:\""+city+"\", street:\" "+street+"\",zipCode:\""+zipCode+"\",latitude:"+latitude+", longitude:"+longitude+") { location_id }}"
    console.log(ourQuery);
    setHidden2(!hiddenMenu2);
    axios({
      url: endpoint,
      method: "POST",
      data:{ query: ourQuery }
    }).then( forceRefresh(!refresh) );
  }



  const { data, isLoading, error } = useQuery(['query-tutorials', location, city, refresh], () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: SELECT_QUERY
      }
    }).then( response => setInventory(response.data.data));
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
    }).then( forceRefresh(!refresh) );
  };

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
 
    <div>
  
      <div className='body'>
      <ul>
        
      <div>
        <div className='location_name'>
            <select name="city" value={city} onChange={event => handleCityChange(event.target.value)}>
              <option id="1" value="1">Toronto</option>
              <option id="2" value="2">Montreal</option>
              <option id="3" value="3">Chicago</option>
              <option id="4" value="4">Nashville</option>
              <option id="5" value="5">Columbus</option>
            </select>
            <select onChange={event => handleWarehouseSelect(event.target.value)}>
            {warehouses.locations.map((location) => (
              <option  value={[location.location_id,location.weather]} >{location.street}</option>
              ))}
            </select>
            </div>
            <div className='location_weather'>
            <h3> {location.weather}</h3>
            </div>
            <div className='add'>
            <button onClick={() => { toggleHidden() }}>
                  <img src={add} alt='add' width='30vw'/>   
            </button>
            <button onClick={() => { toggleHidden2() }}>
                  <img src={add} alt='add' width='30vw'/>   
            </button>
              {hiddenMenu &&  
            
              <div className='inventory_form'>
                <form onSubmit={ addNewProduct }>
                <table>
                  <tr>
                    <th>Select Product</th>
                    <select name="sku" id="newProduct">
                      {prods.productsNotInInventory.map((product) => (
                      <option  value={product.sku} >{product.name}</option>
                      ))}
                    </select>
                    </tr>
                  <tr>
                    <td>Current Inventory Stock</td>
                    <td> 
                      <input
                      type="number"
                      id="stock"
                      name="stock"
                      defaultValue="0"
                      />
                    </td>
                  
                  </tr>
                </table>
                <button type="submit" >
                  <img src={save} alt='save' width='30vw'/>
                </button>
                </form> 
              </div>
              }
                {hiddenMenu2 &&  
            
            <div className='inventory_form'>
              <form onSubmit={ addNewLocation }>
                <table>
                  <tr>
                    <th>Select city</th>
                    <select id="city_id" name="city_id">
                      <option id="1" value="1">Toronto</option>
                      <option id="2" value="2">Montreal</option>
                      <option id="3" value="3">Chicago</option>
                      <option id="4" value="4">Nashville</option>
                      <option id="5" value="5">Columbus</option>
                    </select>
                    </tr>
                  <tr>
                    <td>latitude</td>
                    <td><input
                      type="number"
                      id="latitude"
                      name="latitude"
                      step="any"
                      defaultValue="0.0"
                      />
                    </td>
                    </tr>
                    <tr>
                    <td>logitude</td>
                    <td> 
                      <input
                      type="number"
                      id="logitude"
                      name="logitude"
                      step="any"
                      defaultValue="0.0"
                      />
                    </td>
                    </tr>
                    <tr>
                    <td>country</td>
                    <td> 
                      <input
                      type="text"
                      id="country"
                      name="country"
                
                      />
                    </td>
                    </tr>
                    <tr>
                    <td>region</td>
                    <td> 
                      <input
                      type="text"
                      id="region"
                      name="region"
              
                      />
                    </td>
                    </tr>
                    <tr>
                    <td>city</td>
                    <td> 
                      <input
                      type="text"
                      id="city"
                      name="city"
                     
                      />
                    </td>
                    </tr>
                    <tr>
                    <td>street</td>
                    <td> 
                      <input
                      type="text"
                      id="street"
                      name="street"
                      />
                    </td>
                    </tr>
                    <tr>
                    <td>postal code</td>
                    <td> 
                      <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      />
                    </td>
                    </tr>
               
                </table>
                <button type="submit" >
                  <img src={save} alt='save' width='30vw'/>
                </button>
              </form> 
            </div>
            }
            </div>
        <div className='inventory-titles'>
            <div className='sku'>sku</div>
            <div className='name'>product name</div>
            <div className='price'>price</div>
            <div className='stock'>inventory count</div>
            <div className='category'>product category</div>
            <div className='description'>product description</div>
            <div className='edit'> save changes</div>
            <div className='delete'> delete</div>
          </div>

        </div>
        {inventory.inventory.map((unit) => (

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
  
