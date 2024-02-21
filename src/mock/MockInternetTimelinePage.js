import React, {Component} from 'react';
import DataIstAnalysis from "./data/DataIstAnalysis.json";
import InternetTimeline from '../view/internet/InternetTimeline';
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from '../component/ActionButton';
import NavigationBar from '../component/NavigationBar';
import MockSidebar from './MockSidebar';
export default class MockInternetTimelinePage extends Component {

    render(){
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
                    <NavigationBar left={action} title={"Internet Timeline"}/>
                </header>
                <main className="app-main">
                    <div className="container-fluid space-2">
                        <InternetTimeline istAnalysis={DataIstAnalysis.result}/>
                    </div>
                </main>
            </> 
        );
    }
    
}