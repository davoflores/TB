import React, { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import ContactSearch from './ContactSearch';
import {Modal} from './Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      currentPage: 1,
      contactsPerPage: 10,
      nextPage: false,
      prevPage: false
    };
  }

  //si hay contactos en la siguiente página setea el estado nextPage en true
  checkNextPage() {
    var next = Number(this.state.currentPage)+1;
    fetch('http://localhost:4000/api/users?_page='+next+'&_limit='+this.state.contactsPerPage)
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        if(users.length>0) this.setState({ nextPage: true });
        else this.setState({ nextPage: false });
      })
  }

  //si hay contactos en la página anterior setea el estado prevPage en true
  checkPrevPage() {
    var anterior = Number(this.state.currentPage)-1;
    
    if(anterior>0){
      fetch('http://localhost:4000/api/users?_page='+anterior+'&_limit='+this.state.contactsPerPage)
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        if(users.length>0) this.setState({ prevPage: true });
        else this.setState({ prevPage: false });
      })
    }
    else{
      this.setState({ prevPage: false });
    }
  }


  //obtiene el listado de Contact usando la api y la agrega al estado
  //pagina: pagina del listado
  getListado(pagina){
    fetch('http://localhost:4000/api/users?_page='+pagina+'&_limit='+this.state.contactsPerPage)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        if(users.length>0){
          this.checkPrevPage();
          this.checkNextPage();
        }
        else{
          if(pagina>1) this.getListado(pagina-1);
        }
        this.setState({ users: users });
      })
  }

  componentWillMount() {
    this.getListado(this.state.currentPage);
  }

  handleOnClickNextPage = (event) => {
    event.preventDefault();
    this.setState({ currentPage: Number(event.target.id)+1 }, function () {this.getListado(this.state.currentPage); });
  }

  handleOnClickPrevPage = (event) => {
    event.preventDefault();
    this.setState({ currentPage: Number(event.target.id)-1 }, function () {this.getListado(this.state.currentPage); });
  }

  //se llama cada vez que se presiona el boton eliminar en el componente Contact
  handleOnEliminar(id){
    //obtenemos la id del Contact que desea eliminar
    id= id.substring(14);

    //eliminamos el contact    
    fetch('http://localhost:4000/api/users/'+id, {method: 'DELETE'})
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ alerta: 'Se ha eliminado un contacto.'  });
        this.getListado(this.state.currentPage);
      })
  }

  
  //abre un formulario para agregar contactos en un modal
  handleOpenModal = () => {
    const modal = new Modal(document.querySelector('.modal-overlay'));
    window.openModal = modal.open.bind(modal);
    window.openModal();   
  }

  
  //maneja el evento submit del formulario para agregar contactos
  handleOnAddContact(event) {
    event.preventDefault();

    fetch('http://localhost:4000/api/users/',
    {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: event.target.name.value, description: event.target.description.value, photo: event.target.photo.value})
    })
    .then((response) => {return response.json();})
    .then((users) => {
                        this.setState({ alerta: 'Se ha agregado un contacto.'  });
                        this.getListado(this.state.currentPage);
                      })
  }

   //maneja el evento submit del formulario para buscar un contacto
  handleOnSearchContact(event) {
    event.preventDefault(event.target.busqueda.value);
    console.log();
    fetch('http://localhost:4000/api/users?q='+event.target.busqueda.value)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ alerta: null  });
        this.setState({ prevPage: false });
        this.setState({ nextPage: false });
        this.setState({ users: users });
      })
  }

  render() {
    var page = this.state.currentPage;

    return (
      <div className='contenido'>
        <header>
          <h1><span>test</span> Beetrack</h1>
          
          <div className='div-buscar'>
            <ContactSearch onSearchContact={this.handleOnSearchContact.bind(this)} />
          </div>
          <div className='div-agregar'>
            <button onClick={this.handleOpenModal} className='btnNuevoContacto'></button>
          </div>
        </header>

     <main>
         {
          this.state.alerta 
          ? <div className='alerta'>{this.state.alerta}</div>
          : ""
         }

        <div className='is-hidden modal-overlay' id='div-modal'>
          <div className='modal'>
            <div className='header'>Agregar nuevo contacto</div>
            <ContactForm onAddContact={this.handleOnAddContact.bind(this)} />
          </div>
        </div>
        

        {
          this.state.users.length > 0 
          ? <ContactList users={this.state.users} onEliminar={this.handleOnEliminar.bind(this)}/> 
          : <p>No hay contactos registrados.</p>
        }



        </main>

        <footer>
          <div className='paginacion'>
            {
              this.state.prevPage
              ? <a id={page} href='' onClick={this.handleOnClickPrevPage} className='prevPage'>P&aacute;gina anterior</a>
              : ""
            }

            {
              (this.state.prevPage && this.state.nextPage)
              ?   <span>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</span> 
              : ""
            }
             

            {
              this.state.nextPage
              ? <a id={page} href='' onClick={this.handleOnClickNextPage} className='nextPage'>Siguiente p&aacute;gina</a>
              : ""
            }
          </div>
        </footer>
      </div>
    );     
  }
}

export default App;