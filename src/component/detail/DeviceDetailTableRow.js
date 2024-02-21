import React, {Component} from 'react';

export default class DeviceDetailTableRow extends Component {
    render() {
        const {className} = this.props;
        const cName = className || ''; 
        return (
            <tr style={{width:'100%'}} className={cName}> 
                {this.props.children}
            </tr>
        );
    }
}