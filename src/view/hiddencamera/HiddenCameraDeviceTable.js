import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HiddenCameraDeviceTableRow from './HiddenCameraDeviceTableRow';
import intl from "react-intl-universal";
import { renderHiddenCameraDeviceTableHeader } from '../../helpers/TableHelper';

export default class HiddenCameraDeviceTable extends Component {

    render() {

        const { netNodes, onClickDetail } = this.props;
        
        return (
            <div className="table-responsive">
                <table className="table table-borderless table-nowrap table-align-center">
                    {renderHiddenCameraDeviceTableHeader()}
                    <tbody>
                        {React.Children.toArray(netNodes.map((netNode) => 
                            <HiddenCameraDeviceTableRow
                                netNode={netNode} 
                                onClickDetail={onClickDetail}/>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

HiddenCameraDeviceTable.propTypes = {
    netNodes: PropTypes.array,
    onClickDetail: PropTypes.func
};
