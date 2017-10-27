import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {
 
  handleOnClickEliminar(event){
    this.props.onEliminar(event.target.id);
  }

  //onClickEliminar={this.handleOnClickEliminar.bind(this)

  render () {
    return (
        <table id='contacttable' className='contacttable'>
          <thead>
            <tr>
               <th>Nombre</th>
               <th>Descripci&oacute;n</th>
            </tr>
           </thead>
           <tbody>
          {this.props.users.map(u => {
            return (
              <Contact
                key={u.id}
                id={u.id}
                name={u.name}
                description={u.description}
                photo={u.photo}
                onClickEliminar={this.handleOnClickEliminar.bind(this)}
             />
            );
          })}
          </tbody>
        </table>
    );
  }
}

export default ContactList;