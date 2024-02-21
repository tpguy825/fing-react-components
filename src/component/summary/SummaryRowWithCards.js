import React, {Component} from 'react';
import SummaryColLeft from './SummaryColLeft';
import SummaryColRight from './SummaryColRight';
import SummaryRow from './SummaryRow';

export default class SummaryRowWithCards extends Component {
    render() {
        const {cardLeft, cardRight} = this.props;
        return (
            <SummaryRow>
                <SummaryColLeft>
                    {cardLeft}
                </SummaryColLeft>
                <SummaryColRight>
                    {cardRight}
                </SummaryColRight>
            </SummaryRow>
        )
    }
}