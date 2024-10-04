import React from "react";

class AddUser extends React.Component {
    userAdd = {}
    constructor(props){
        super(props)
        this.state = {
            firt_name: "",
            last_name: "",
            email: "",
            age: 1,
            isHappy: false
        }
    }

    render() {
        return (
            <form ref={(el) => this.myForm = el}>
                <input placeholder="Имя" onChange={(e) => this.setState({first_name: e.target.value}) } />
                <input placeholder="Фамилия" onChange={(e) => this.setState({last_name: e.target.value}) }/>
                <textarea placeholder="Почта" onChange={(e) => this.setState({email: e.target.value}) }></textarea>
                <input placeholder="Возраст" onChange={(e) => this.setState({age: e.target.value}) } />
                <label htmlFor="isHappy">Счастлив?</label>
                <input type="checkbox" id="isHappy" onChange={(e) => this.setState({isHappy: e.target.value}) } />
                <button type="button"onClick={() => {
                this.myForm.reset()
                this.userAdd = {
                    firstname: this.state.firtname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    age: this.state.age,
                    isHappy: this.state.isHappy,
                }
                if(this.props.user)
                    this.userAdd.id = this.props.user.id
                this.props.onAdd(this.userAdd)
                }}>Добавить</button>
            </form>
        )
    }
}

export default AddUser