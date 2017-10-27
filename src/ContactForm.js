import React, { Component } from 'react'

export default class ContactForm extends Component{
  render(){
    return ( 
      <form onSubmit={this.props.onAddContact}>
      	 <label htmlFor='photo'>URL Imagen de perfil<span className='requerido'>*</span></label>
   		 <input type='text' name='photo' required/>

   		 <label htmlFor="name">Nombre<span className='requerido'>*</span></label>
   		 <input type='text' name='name' required/>

    	<label htmlFor='description'>Descripci&oacute;n<span className='requerido'>*</span></label>
   		<input type="text" name='description' required/> 
         
         <div className='buttonHolder'>
          <button type='submit' id='btn-guardar'></button>
         </div>
      </form>
    );
  }
}