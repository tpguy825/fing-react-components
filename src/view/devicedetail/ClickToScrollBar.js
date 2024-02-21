import React, {Component} from 'react';

export default class ClickToScrollBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.onChangeTab = this.onChangeTab.bind(this);

        this.state = {
            value: 0
        }
    }

    onChangeTab(index){
        this.setState({value: index});
        if(this.props.onChangeTab){
            this.props.onChangeTab(index);
        }
    }

    getActiveTabClass(index){
        return this.state.value === index ? "text-primary" : "text-secondary";
    }


    render() {
        const {idx_array, getTabText, classItem, className} = this.props;
        const itemClass = "list-inline-item " + classItem + " ";

        return (
            <div className={className}>
                <div className="list-inline">
                    {idx_array.map(index => 
                        <a  key={index}
                            onClick={() => this.onChangeTab(index)} 
                            role="button"
                            className={itemClass + this.getActiveTabClass(index)}>{getTabText(index)}</a>)
                    }
                </div>
                <hr className="my-0 mx-2"></hr>
            </div>
            
        )
    }
}