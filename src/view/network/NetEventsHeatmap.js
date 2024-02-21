import React, {Component} from "react";
import PropTypes from 'prop-types';
import HeatMap from 'react-heatmap-grid';
import { capitalize } from "../../helpers/CommonHelper";
import { getDayName } from "../../helpers/DateHelper";
import intl from 'react-intl-universal';

export default class NetEventsHeatmap extends Component {

    
    
    render(){
        const { heatMapData } = this.props;
        if (!heatMapData) return '';
        const currentLocale = intl.getInitOptions() && intl.getInitOptions().currentLocale || "en-US";

        const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
        const yLabels = heatMapData.map((obj,i) => {
            var curStart = new Date(new Date().getTime() - 86400000 * i);
            curStart.setHours(0, 0, 0, 0);
            const dayName = i == 0 ? intl.get('time_today') : i == 1 ? intl.get('time_yesterday') : capitalize(getDayName(curStart, currentLocale))
            return <small className="overflow-hidden text-nowrap mr-2">{dayName}</small>
        });
        
        return (
            <HeatMap 
                xLabels={xLabels} 
                yLabelWidth={130} 
                yLabels={yLabels} 
                data={heatMapData} 
                height={15} 
                width={15} 
                cellStyle={(background, value, min, max, data, x, y) => {
                    return ({
                        background: `${value ? 'rgba(0, 109, 44,' + 0.9 + ')' : 'rgba(0, 0, 0,  0.1)'}`,
                        fontSize: "11px",
                        marginTop: "10px",
                        marginBottom: "10px",
                    });
                }}/>
        );
    }

}
NetEventsHeatmap.propTypes = {
    heatMapData: PropTypes.array,
};
