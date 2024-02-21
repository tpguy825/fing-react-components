import React, {Component} from 'react';
import DataIstAnalysis from "./data/DataIstAnalysis.json";
import InternetScoreBoard from '../view/internet/InternetScoreBoard';
import ActionButton, { BTN_TINT_DARK, BTN_TYPE_GHOST } from '../component/ActionButton';
import NavigationBar from '../component/NavigationBar';
import MockSidebar from './MockSidebar';
import NoResult from '../assets/svg/storyset/no-results.svg';
import EmptyState from '../component/EmptyState';
import intl from "react-intl-universal";
import DataNotificationsMap from './data/DataNotificationsMap.json';
import NotificationTimeline from '../view/notification/NotificationTimeline';


export default class MockNotificationPage extends Component {

    render(){
        
        return (
            <>
                <MockSidebar active="HOME" />
                <main className="app-main">
                    <div className="container space-1">
                        <NotificationTimeline notifications={DataNotificationsMap}/>
                    </div>
                </main>
            </> 
        );
    }
}


