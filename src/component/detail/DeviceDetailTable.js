import React, {Component} from 'react';

export default class DeviceDetailTable extends Component {
    render() {
        const {tableHead, className} = this.props;
        return (
            <table className={`table table-striped table-md ${className ? className : ""}`}>
                {tableHead && <thead>{tableHead}</thead>}
                <tbody>{React.Children.toArray(this.props.children)}</tbody>
            </table>
        )
    }
}