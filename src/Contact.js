import React, { Component } from 'react';

class Contact extends Component {
	onMouseOverHandler(id) {
		document.getElementById('eliminar-span-'+id).style.display = 'block';
    }

    onMouseOutHandler(id) {
		document.getElementById('eliminar-span-'+id).style.display = 'none';
    }

  render () {
    return (
	 <tr onMouseOver={() => this.onMouseOverHandler(this.props.id)} onMouseOut={() => this.onMouseOutHandler(this.props.id)}>
      	<td className='td-nombre'>
      		<img src={this.props.photo} alt={this.props.name} />
 	     	  <span>
            <div>{this.props.name}</div>
            <a onClick={this.props.onClickEliminar} id={'eliminar-span-' + this.props.id} >Eliminar</a>
          </span>
  	     	
 	     </td>
      	<td className='td-description'>{this.props.description}</td>
      </tr>
    );
  }
}

export default Contact;