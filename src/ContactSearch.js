import React, { Component } from 'react'

export default class ContactSearch extends Component{
  render(){
    return ( 
      <form onSubmit={this.props.onSearchContact}>
   		   <input type='text' name='busqueda' placeholder='Buscar contacto...'/>
      </form>
    );
  }
}