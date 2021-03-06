import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal.js';

export default class IndecisionApp extends React.Component {
    state = {
        options : [],
        selectedOption: undefined
    }
    //LIFECYCLE METHODS

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({options: options}));
            }
        } catch(e) {
            //Do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }   

    //Will work if a website has multiple pages
    componentWillUnmount() {
        console.log('Component will unmount');
    }

    handleModal = () => {
        this.setState(() => ({selectedOption: undefined}));
    }

    handleRemoveAll = () => {
        this.setState(() => ({ options: []}));
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handlePick = () => {
        const random = Math.floor(Math.random() * this.state.options.length);
        const val = this.state.options[random];
        this.setState(() => ({selectedOption: val}));
    }

    handleAddOption = (option) => {
        if(!option) {
            return 'Enter a valid item!'
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This item already exists'
        }
        
        this.setState((prevState) => ({ options: prevState.options.concat(option)}));
    }

    render() { 
    const subtitleName = 'Put you life decisions in the hands of a computer';

    return (
        <div>
            <Header subtitle={subtitleName}/>
            <div className="container">
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                <div className="widget">
                    <Options 
                    opt={this.state.options} 
                    handleRemoveAll={this.handleRemoveAll}
                    handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption handleAddOption={this.handleAddOption}/>
                </div>
            </div>
            <OptionModal 
                selectedOption={this.state.selectedOption}
                handleModal={this.handleModal}/>
        </div>
        )
    }
}