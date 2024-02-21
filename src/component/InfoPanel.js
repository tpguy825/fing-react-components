/**
 * Created by marco on 17/11/2019.
 *
 * (C) Copyright Fing
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfoPanel extends Component {

    render() {
        const { title, values, image } = this.props;

        return (
            <div>
                <h4 className="card-title">{title}</h4>
                {
                    image && 
                    <div className="text-center mb-3">
                        <img height="64" src={image} />
                    </div>
                }
                {values && values.length > 0 ? this.renderValuesMapped(values) : ''}
            </div>
        );
    }

    renderValuesMapped(values){
        return React.Children.toArray(values.map(val => {
            if(val.action){
                return (
                    <div className="row">
                        <dt className="col-sm-6 text-muted font-weight-normal ">{val.value}</dt>
                        <dd className="col-sm-6 text-dark font-weight-normal ">
                            <a className={"link link-underline " + (val.action ? "link-cursor-pointer" : "link-cursor-not-allowed")}
                                onClick={val.action} href="#">{val.description}</a>
                        </dd>
                    </div>
                );
            }
            return (
                <div className="row">
                    <dt className="col-sm-6 text-muted font-weight-normal">{val.value}</dt>
                    <dd className="col-sm-6 text-dark font-weight-normal">
                        <div className="d-flex">
                            {val.description}
                            {val.icon ? val.icon : ''}
                        </div>
                        
                    </dd>
                </div>
            );
        }))
    }
}

InfoPanel.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    values: PropTypes.array
};
