import React, {Component} from 'react';
import DataIstAnalysis from "./data/DataIstAnalysis.json";
import InternetScoreBoard from '../view/internet/InternetScoreBoard';
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from '../component/ActionButton';
import NavigationBar from '../component/NavigationBar';
import MockSidebar from './MockSidebar';
import NoResult from '../assets/svg/storyset/no-results.svg';
import EmptyState from '../component/EmptyState';
import intl from "react-intl-universal";


export default class MockInternetScoreBoardPage extends Component {

    goToCatalog(ispId,countryName,cityName){
        console.log(ispId,countryName,cityName)
        const link = '/internet/provider/' + ispId + '/' + countryName + '/all/' + cityName
        // window.open(link, "_blank");
        // '/internet/provider/' + ispinfo.id + '/' + countryName + '/all/' + place.cityName
    }
    render(){
        const emptyState = <EmptyState  className="my-8 w-60 mx-auto"
                                        image={NoResult}
                                        title={intl.get('generic_data_not_available')}/>
        const action = <ActionButton    route="/mock/discovery" 
                                        title="Internet" 
                                        icon='fa-arrow-left'
                                        type={BTN_TYPE_GHOST} 
                                        tint={BTN_TINT_DARK} 
                                        rounded={true} />
        return (
            <>
                <MockSidebar active="HOME" />
                <header id="header" className="header header-sticky-top bg-white container-fluid p-2 app-header">
                    <NavigationBar left={action} title={"Internet Provider Scoreboard"}/>
                </header>
                <main className="app-main">
                    <div className="container space-2">
                        <InternetScoreBoard onClickName={(ispId,countryName,cityName)=>this.goToCatalog(ispId,countryName,cityName)} 
                                            emptyState={emptyState}
                                            istAnalysis={DataIstAnalysis.result}/>
                    </div>
                </main>
            </> 
        );
    }
}


