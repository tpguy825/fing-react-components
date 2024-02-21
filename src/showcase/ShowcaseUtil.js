import React, {Component} from "react";
import {pageNavigationBar} from "./ShowcaseUtils";
import {
    DATE_FORMAT_LONG,
    DATE_FORMAT_SHORT,
    DATE_FORMAT_SMART,
    formatAbsoluteDate,
    formatDuration,
    formatRelativeDate,
    MS_ONE_DAY,
    MS_ONE_HOUR,
    MS_ONE_MINUTE,
    MS_ONE_MONTH,
    MS_ONE_WEEK,
    MS_ONE_YEAR
} from "../helpers/DateHelper";

export default class ShowcaseUtil extends Component {

    constructor(props, context) {
        super(props, context);
        this.durations = [
            Math.floor(Math.random() * 1000),
            Math.floor(MS_ONE_MINUTE),
            Math.floor(Math.random() * MS_ONE_MINUTE),
            Math.floor(MS_ONE_HOUR),
            Math.floor(Math.random() * MS_ONE_HOUR),
            Math.floor(MS_ONE_DAY),
            Math.floor(Math.random() * MS_ONE_DAY),
            Math.floor(MS_ONE_WEEK),
            Math.floor(Math.random() * MS_ONE_WEEK),
            Math.floor(MS_ONE_MONTH),
            Math.floor(Math.random() * MS_ONE_MONTH),
            Math.floor(MS_ONE_YEAR),
            Math.floor(Math.random() * MS_ONE_YEAR),
            Math.floor(2 * MS_ONE_YEAR),
            Math.floor(Math.random() * 5 * MS_ONE_YEAR),
        ];

        const now = new Date().getTime();
        this.now = now;
        this.relativeDates = [
            Math.floor(now),
            Math.floor(now - Math.random() * 1000),
            Math.floor(now - MS_ONE_MINUTE),
            Math.floor(now - Math.random() * MS_ONE_MINUTE),
            Math.floor(now - MS_ONE_HOUR),
            Math.floor(now - Math.random() * MS_ONE_HOUR),
            Math.floor(now - MS_ONE_DAY),
            Math.floor(now - Math.random() * MS_ONE_DAY),
            Math.floor(now- MS_ONE_WEEK),
            Math.floor(now - Math.random() * MS_ONE_WEEK),
            Math.floor(now - MS_ONE_MONTH),
            Math.floor(now - Math.random() * MS_ONE_MONTH),
            Math.floor(now - MS_ONE_YEAR),
            Math.floor(now - Math.random() * MS_ONE_YEAR),
            Math.floor(now - 2 * MS_ONE_YEAR),
            Math.floor(now - Math.random() * 5 * MS_ONE_YEAR),
        ]

    }

    render() {
        return (
            <>
                {pageNavigationBar("Utilities & Helpers")}

                <section className="container mt-10 mb-5">
                    <h2>Duration</h2>
                    <p>Random time, in milliseconds, representing a length of time.</p>
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th>Duration</th>
                            <th>Short</th>
                            <th>Short Approx</th>
                            <th>Long</th>
                            <th>Long Approx</th>
                        </tr>
                        </thead>
                        {this.durations.map(duration => (
                                <tr>
                                    <td>{duration}</td>
                                    <td>{formatDuration(duration, DATE_FORMAT_SHORT, false)}</td>
                                    <td>{formatDuration(duration, DATE_FORMAT_SHORT, true)}</td>
                                    <td>{formatDuration(duration, DATE_FORMAT_LONG, false)}</td>
                                    <td>{formatDuration(duration, DATE_FORMAT_LONG, true)}</td>
                                </tr>
                            )
                        )}
                    </table>

                    <h2>Relative dates</h2>
                    <p>Relative dates, in milliseconds, representing a distance of time from the current time.</p>
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Distance</th>
                            <th>Short</th>
                            <th>Long</th>
                        </tr>
                        </thead>
                        {this.relativeDates.map(date => (
                                <tr>
                                    <td>{date}</td>
                                    <td>{this.now-date}</td>
                                    <td>{formatRelativeDate(date, DATE_FORMAT_SHORT)}</td>
                                    <td>{formatRelativeDate(date, DATE_FORMAT_LONG)}</td>
                                </tr>
                            )
                        )}
                    </table>

                    <h2>Absolute dates</h2>
                    <p>Absolute dates, in milliseconds, representing an exact moment of time from the current time.
                        Rendered in the given locale / timezone</p>
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Standard</th>
                            <th>Short</th>
                            <th>Long</th>
                            <th>Smart</th>
                        </tr>
                        </thead>
                        {this.relativeDates.map(date => (
                                <tr>
                                    <td>{date}</td>
                                    <td>{(new Date(date)).toString()}</td>
                                    <td>{formatAbsoluteDate(date, DATE_FORMAT_SHORT)}</td>
                                    <td>{formatAbsoluteDate(date, DATE_FORMAT_LONG)}</td>
                                    <td>{formatAbsoluteDate(date, DATE_FORMAT_SMART)}</td>
                                </tr>
                            )
                        )}
                    </table>

                </section>
            </>);
    }

}
