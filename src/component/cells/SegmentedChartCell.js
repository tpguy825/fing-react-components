import React, {Component} from 'react';
import SegmentedChart, { SC_DIM_SMALL } from '../charts/SegmentedChart';

export default class SegmentedChartCell extends Component {
    render() {
        const {coloringFn, value, className, length, valueLabel} = this.props;
        const cName = className || "border w-70 d-flex";

        return (
            <td className={cName} style={{verticalAlign: "middle"}}>
                    <div style={{width: '200px', marginTop: "6px"}}>
                        <SegmentedChart
                            dimension={SC_DIM_SMALL}
                            coloringFn={coloringFn}
                            value={value}
                            length={length || 5}/>
                    </div>
                {valueLabel && <span className="ml-2">{valueLabel}</span>}
            </td>
        )
    }
}