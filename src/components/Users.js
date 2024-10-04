import React from 'react';
import User from './User';


class Users extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firtname: "",
            lastname: "",
            bio: "",
            age: 1,
            isHappy: false
        }
    }
  render() {
    if (this.props.users.length > 0)
        return (
        <div>
            {this.props.users.map((el) => (
                <User onEdit={this.props.onEdit} onDelete={this.props.onDelete} key={el.id} user={el} />
            ))}    
        </div>)
    else 
    return (
        <div className='user'>
            <h3>Пользователей нет</h3>
            
        </div>        
    )
  }

}

export default Users