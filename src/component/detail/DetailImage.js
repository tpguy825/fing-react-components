import React, {Component} from 'react';
import { DEFAULT_CDN } from '../../model/Constants';

export default class DetailImage extends Component {
    
    render() {
        const {data} = this.props;
        let heightImg = 48;
        let widthImg = 84;
        if (data && data.bannerImageUrl) {
            heightImg = 42;
            return <img height={heightImg} width={widthImg} src={data.bannerImageUrl} />;
        } else if (data && data.logoImageUrl) {
            widthImg = 48;
            return <img height={heightImg} width={widthImg} src={data.logoImageUrl} />;
        } 
        return ''
        
    }
}