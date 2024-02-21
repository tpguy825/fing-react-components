/**
 * Created by marco on 3/22/21.
 *
 * (C) Copyright Fing
 */

import React, {PureComponent} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';

import {
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Area,
    AreaChart,
    Tooltip
} from 'recharts';
import {convertDailySamplesToChartData} from "./InternetPerformanceLogic";
import {DATE_FORMAT_LONG, formatAbsoluteDate} from "../../helpers/DateHelper";

const Y_AXIS_TICK_COUNT = 5;
const chartBlueColor = "#1a6aff";
const chartGreenColor = "#26a65d";

// Why PureComponent?
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    
export default class DailySpeedHistoryChart extends PureComponent {

    // --------------------------------------------------------------------------------------------------------------
    // RENDERING
    // --------------------------------------------------------------------------------------------------------------

    render() {
        const {startDate, endDate, daySamples, tooltip, height, exampleData} = this.props;
        let chartData = exampleData || convertDailySamplesToChartData(daySamples, startDate, endDate)
        
        return (chartData ?
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartBlueColor} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={chartBlueColor} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartGreenColor} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={chartGreenColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3"/>
                    {tooltip === true && <Tooltip content={<CustomTooltip/>}/>}
                    <XAxis dataKey="formattedDate"/>
                    <YAxis type="number"
                           orientation="right"
                           ticks={this.getAreaChartTicks(chartData)}/>
                    <Area type="monotone"
                          connectNulls
                          id="area-upload"
                          dot={{r: 2}}
                          dataKey="avgUpload"
                          stroke="#1a6aff"
                          fill="url(#colorUpload)"/>
                    <Area type="monotone"
                          connectNulls
                          dot={{r: 2}}
                          id="area-download"
                          dataKey="avgDownload"
                          stroke="#26a65d"
                          fill="url(#colorDownload)"/>
                </AreaChart>
            </ResponsiveContainer>
        : '')
    }

    getAreaChartTicks(data) {
        const ticks = [];
        const values = data.map(val => Math.max(val.avgDownload || 0, val.avgUpload || 0));
        const max = Math.max(...values);
        for (let i = 0; i <= Y_AXIS_TICK_COUNT; i++) {
            const offset = max / Y_AXIS_TICK_COUNT * i;
            ticks.push(Math.trunc(offset));
        }
        return ticks;
    }
}

/**
 * Custom rendering function of Chart tooltip, based on the payload.
 */
const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        let title = label;
        if (payload[0].payload && payload[0].payload.date) {
            title = formatAbsoluteDate(payload[0].payload.date, DATE_FORMAT_LONG);
        }
        console.log(payload)
        return (
            <div className="card card-bordered">
                <div className="card-body">
                    <h4 className="label">{title}</h4>
                    <div className="label">{intl.get('internet_average_download', {value: payload[1].value})}</div>
                    <div className="label">{intl.get('internet_average_upload', {value: payload[0].value})}</div>
                </div>
            </div>
        );
    }
    return null;
};

DailySpeedHistoryChart.propTypes = {
    exampleData: PropTypes.array,
    height: PropTypes.number,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    daySamples: PropTypes.array,
    tooltip: PropTypes.bool
};

