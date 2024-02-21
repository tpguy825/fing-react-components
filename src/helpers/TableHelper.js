import React from 'react';
import intl from 'react-intl-universal';

export function renderRouterPortMappingTableHeader(){
    return (
        <thead>
            <tr>
                <th/>
                <th>{intl.get('generic_device')}</th>
                <th>{intl.get('generic_service')}</th>
                <th>{intl.get('generic_details')}</th>
                <th>{intl.get('generic_enabled')}</th>
                <th>{intl.get('generic_first_seen')}</th>
            </tr>
        </thead>
    )
}

export function renderVulnerabilityTestTimelineTableHeader(){
    return (
        <thead>
            <tr>
                <th style={{width: "5rem"}}>{intl.get("timeline_table_header_state")}</th>
                <th style={{width: "8rem"}}>{intl.get("timeline_table_header_when")}</th>
                <th style={{width: "20rem"}}>{intl.get("timeline_table_header_details")}</th>
                <th style={{width: "15rem"}}>{intl.get('tooltargetbar_open_ports')}</th>
                <th>{intl.get('timeline_table_header_port')}</th>
                <th>{intl.get('timeline_table_header_type')}</th>
            </tr>
        </thead>
    )
}

export function renderPresenceTimelineTableHeader(){
    return (
        <thead>
            <tr>
                <th style={{width: "5rem"}}>{intl.get("timeline_table_header_state")}</th>
                <th style={{width: "8rem"}}>{intl.get("timeline_table_header_when")}</th>
                <th>{intl.get("timeline_table_header_subject")}</th>
                <th>{intl.get("timeline_table_header_details")}</th>
                <th style={{width: "4rem"}}/>
            </tr>
        </thead>
    )
}

export function renderNetworkTimelineTableHeader(){
    return (
        <thead>
            <tr>
                <th style={{width: "5rem"}}>{intl.get("timeline_table_header_state")}</th>
                <th style={{width: "8rem"}}>{intl.get("timeline_table_header_when")}</th>
                <th>{intl.get("timeline_table_header_subject")}</th>
                <th>{intl.get("timeline_table_header_details")}</th>
                <th style={{width: "4rem"}}/>
            </tr>
        </thead>
    )
}

export function renderInternetTimelineTableHeader(){
    return (
        <thead>
            <tr>
                <th style={{width: "5rem"}}>{intl.get("timeline_table_header_state")}</th>
                <th style={{width: "8rem"}}>{intl.get("timeline_table_header_when")}</th>
                <th style={{width: "18rem"}}>{intl.get("speedtest_download")}</th>
                <th style={{width: "8rem"}}>{intl.get("speedtest_upload")}</th>
                <th style={{width: "8rem"}}>{intl.get("internet_latency")}</th>
                <th>{intl.get("timeline_table_header_type")}</th>
            </tr>
        </thead>
    )
}

export function renderNotificationTimelineTableHeader(){
    return (
        <thead>
            <tr>
                <th style={{width: "5rem"}}>{intl.get("timeline_table_header_state")}</th>
                <th style={{width: "8rem"}}>{intl.get("timeline_table_header_when")}</th>
                <th></th>
                <th>{intl.get("timeline_table_header_details")}</th>
                <th style={{width: "8rem"}}/>
            </tr>
        </thead>
    )
}

export function renderHiddenCameraDeviceTableHeader(){
    return (
        <thead>
            <tr>
                <th>{intl.get("timeline_table_header_type")}</th>
                <th>{intl.get("generic_name")}</th>
                <th>{intl.get("tooltargetbar_ip_address")}</th>
                <th>{intl.get("tooltargetbar_mac_address")}</th>
            </tr>
        </thead>
    )
}