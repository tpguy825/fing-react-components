

 import React, {Component} from 'react';
 import PropTypes from 'prop-types';
import { RTI_STAR} from './icons/RatingTypeIcon';
import RatingBar, { RB_SMALL } from './RatingBar';
import ProgressBar, { PB_VISIBLE_ALWAYS } from './ProgressBar';
import { TINT_WARNING } from '../model/Constants';
 

 export default class RatingDistribution extends Component {
    
     getProgressBarValue(rate, total){
        return (rate/total)*100
     }

     render() {
         const { average, distribution, label } = this.props; 
         const total = distribution['5'] + distribution['4'] + distribution['3'] + distribution['2'] + distribution['1']
         return (
            <div className="container space-2">
                <div className="row align-items-center">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="card bg-primary text-white text-center py-4 px-3">
                            <span className="display-4">{average}</span>
                            <RatingBar tint={TINT_WARNING} length={5}  value={average} type={RTI_STAR}/>
                            <span>{label}</span>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <ProgressBar visibilityPolicy={PB_VISIBLE_ALWAYS} value={this.getProgressBarValue(distribution['5'],total)}/>
                            </div>
                            
                            <div className="col-lg-7 d-flex align-items-center min-w-21rem">
                                <RatingBar tint={TINT_WARNING} length={5}  value={5} type={RTI_STAR} size={RB_SMALL}/>
                                <span className="text-primary small">{distribution['5']}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <ProgressBar visibilityPolicy={PB_VISIBLE_ALWAYS} value={this.getProgressBarValue(distribution['4'],total)}/>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center min-w-21rem">
                                <RatingBar tint={TINT_WARNING} length={5}  value={4} type={RTI_STAR} size={RB_SMALL}/>
                                <span className="text-primary small">{distribution['4']}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <ProgressBar visibilityPolicy={PB_VISIBLE_ALWAYS} value={this.getProgressBarValue(distribution['3'],total)}/>
                            </div>                            
                            <div className="col-lg-6 d-flex align-items-center min-w-21rem">
                                <RatingBar tint={TINT_WARNING} length={5}  value={3} type={RTI_STAR} size={RB_SMALL}/>
                                <span className="text-primary small">{distribution['3']}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <ProgressBar visibilityPolicy={PB_VISIBLE_ALWAYS} value={this.getProgressBarValue(distribution['2'],total)}/>
                            </div>
                            
                            <div className="col-lg-6 d-flex align-items-center min-w-21rem">
                                
                                <RatingBar tint={TINT_WARNING} length={5}  value={2} type={RTI_STAR} size={RB_SMALL}/>
                                <span className="text-primary small">{distribution['2']}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <ProgressBar visibilityPolicy={PB_VISIBLE_ALWAYS} value={this.getProgressBarValue(distribution['1'],total)}/>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center min-w-21rem">
                                
                                <RatingBar tint={TINT_WARNING} length={5}  value={1} type={RTI_STAR} size={RB_SMALL}/>
                                <span className="text-primary small">{distribution['1']}</span>
                            </div>
                        </div>
                        
                        
                        
                    </div>

                </div>
            </div>
            
            
            
             
             
         )
     }
     
     
 }

 
 RatingDistribution.propTypes = {
    average: PropTypes.number,
    distribution: PropTypes.object
};