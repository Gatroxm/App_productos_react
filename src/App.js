import React, { Component } from 'react';
import axios from 'axios';

  class App extends Component {
   
    constructor() {
      super();
      this.crearProducto = this.crearProducto.bind(this);
      this.editar = this.editar.bind(this);
   //this.eliminar = this.eliminar.bind(this);
   this.state = {
          
          empleado:[],
          id:'',
          nombre:'',
          referencia:'',
          precio:'',
          peso:'',
          categoria:'',
          stock:'',
          create_at:'',
          frcha_ultima_venta:'',
      };
    }

    componentDidMount() {
      this.getProductos();
    
   }

async getProductos() {
  try {
    const res = await axios.get('http://127.0.0.1/connection/getproductos.php');
        this.setState({
            porducto:res.data
          })
        
     } catch (error) {
       console.error(error);
     }
    }

async crearProducto(e) {
   e.preventDefault();
   
  try {
    if(this.state.envio){
    const {nombre, referencia, precio, peso, categoria, stock, create_at, frcha_ultima_venta} = this.state;
    const obj1 = {nombre:nombre, referencia:referencia, precio:precio, peso:peso, categoria:categoria, stock:stock, create_at:create_at, frcha_ultima_venta:frcha_ultima_venta };
    await axios.post('http://127.0.0.1/connection/createproductos.php',obj1);
    
     }else{
      const {id, nombre, referencia, precio, peso, categoria, stock, create_at, frcha_ultima_venta} = this.state;
      const obj2 = {id:id, nombre:nombre, referencia:referencia, precio:precio, peso:peso, categoria:categoria, stock:stock, create_at:create_at, frcha_ultima_venta:frcha_ultima_venta  };
      await axios.post('http://127.0.0.1/connection/editproductos.php',obj2);
     
     }
      
       } catch (error) {
        console.error(error);
      }
     this.setState({
      id:'',
      nombre:'',
      referencia:'',
      precio:'',
      peso:'',
      categoria:'',
      stock:'',
      create_at:'',
      frcha_ultima_venta:'',
     })
     this.getProductos();
    }

    escribirEstado(e) {
     const {name , value} = e.target;
     this.setState({
      [name]:value
       });
     }

   async eliminar(e,id) {
      e.preventDefault();
      const obj = {id:id}; 
      try {
     
        if(window.confirm("esta seguro de querer elinarlo")){
          await axios.post('http://127.0.0.1/connection/deleteproductos.php',obj); 
          this.getProductos();
        }
         
       } catch (error) {
        console.error(error);
      }
    }
    
async editar(e, id){
  e.preventDefault();
  const obj = {id:id}; 
  try {
    const res = await axios.post('http://127.0.0.1/connection/getproducto.php',obj);
    this.setState({
      id: res.data[0].id,
      nombre: res.data[0].nombre,
      referencia: res.data[0].referencia,
      precio: res.data[0].precio,
      peso: res.data[0].peso,
      categoria: res.data[0].categoria,
      stock: res.data[0].stock,
      create_at: res.data[0].create_at,
      frcha_ultima_venta:res.data[0].frcha_ultima_venta,
    });    
    console.log(res);
        this.getProductos();
       } catch (error) {
        console.error(error);
      }
    }

   
 render(){
      return(

    <div className="container p-4">
      <nav className="navbar navbar-dark bg-dark mb-2">
  <span className="navbar-brand mb-0 h1">CRUD-REACT-PHP-MYSQL </span>
      </nav>
      <form onSubmit={this.crearProducto}>
        <div className="form-group">
          <label htmlFor="">Nombre producto</label>
        <input type="text"  name="nombre"   
        value={this.state.nombre} placeholder="nombre" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="">Referencia del producto</label>
        <input type="text"  name="referencia"   
        value={this.state.referencia} placeholder="referencia" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="">Precio del producto</label>
        <input type="text"  name="precio"   
        value={this.state.precio} placeholder="precio" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="">Peso del producto</label>
        <input type="text"  name="peso"   
        value={this.state.peso} placeholder="peso" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="">Categoria del producto</label>
          <select name=""value={this.state.categoria}id="" name="categoria" className="form-control">}
            <option value="1">Moda mujer</option>
            <option value="2">Moda hombre</option>
            <option value="3">Zapatos</option>
            <option value="4">Accesorios</option>
            <option value="5">Lencería y baño</option>
            <option value="6">Moda Infantil</option>
            <option value="7">Jugetes</option>
            <option value="8">Video Juegos</option>
            <option value="9">Electrónica</option>
            <option value="10">Informática</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Cantidad de unidades</label>
        <input type="text"  name="stock"   
        value={this.state.stock} placeholder="Cantidad de unidades" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="">Fecha de creación</label>
        <input type="date"  name="create_at"   
        value={this.state.create_at} placeholder="Fecha de creación" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="">Fecha de Venta</label>
        <input type="date"  name="frcha_ultima_venta"   
        value={this.state.frcha_ultima_venta} placeholder="Fecha de Venta" className="form-control"/>
        </div>
        <input type="submit" className="btn btn-success" value="Submit" />
      </form>   
       <div className="row p-3">
           
            {
             this.state.empleado.map(item=>{
               return (
                
                 <div className="card p-2 m-2" key={item.id}>
                  <img  width="60" src="logo192.png" alt="img"></img>
                   <div className="card-body">
                    <h6>{item.nombre}</h6>
                    <h6>{item.referencia}</h6>
                    <h6>{item.precio}</h6>
                    <h6>{item.peso}</h6>
                    <h6>{item.categoria}</h6>
                    <h6>{item.stock}</h6>
                    <h6>{item.create_at}</h6>
                    <h6>{item.frcha_ultima_venta}</h6>
                 <button className="btb btn-danger mx-2"
                 onClick={(e)=>this.eliminar(e,item.id)}>delete</button>
                 <button className="btb btn-info"
                 onClick={(e)=>this.editar(e,item.id)}>edit</button>
                 </div>
                 
                 </div>
               )
            })
            }

              </div>
          </div>
         
      );
  
  }
};
export default App;