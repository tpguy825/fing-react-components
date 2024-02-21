import React, {Component} from 'react';
import intl from "react-intl-universal";
import PropTypes from 'prop-types';
import { DATE_FORMAT_LONG, DATE_FORMAT_SMART, formatAbsoluteDate, formatRelativeDate } from '../../helpers/DateHelper';
import ContactAvatar, { AVT_SIZE_MINI, AVT_SIZE_SMALL } from '../presence/ContactAvatar';
import { TINT_DARK, TINT_SECONDARY, TINT_SUCCESS } from '../../model/Constants';
import DeviceTypeIcon from '../../component/icons/DeviceTypeIcon';
import ActionButton, { BTN_TINT_PRIMARY, BTN_TYPE_SOFT } from '../../component/ActionButton';
import Contact from '../../model/Contact';

export default class NotificationTimelineTableRow extends Component {

    constructor(props) {
        super(props);
        this.onClickNotification = this.onClickNotification.bind(this);
    }

    onClickNotification(data) {
        if (this.props.onClickNotification) {
            this.props.onClickNotification(data)
        }
    }

    render() {
        const {item} = this.props;
        const banner = item.data.banner;

        return (
            <tr>
                {this.renderState(banner)}
                {this.renderTimestamp(item)}
                {this.renderSubjectCell(banner)}
                {this.renderDetailCell(banner)}
                {this.renderActions(item)}
            </tr>
        );
    }
    renderState(banner){

        const netContact = banner.contactInfo;
        let contact;

        if (netContact) {
            contact = new Contact();
            contact.contactId = netContact.identifier;
            contact.contactName = netContact.displayName;

            if (netContact.pictureUrl)
                contact.imageURL = netContact.pictureUrl;
            else if (netContact.pictureImageData)
                contact.imageURL = "data:image/jpeg;base64," + netContact.pictureImageData;

            contact.contactType = netContact.contactType;
            contact.gender = netContact.gender;
            contact.online = (banner.icon.glyph === "fa-arrow-up"); // THIS IS A TRICK - Because of the tricky structure of these notifications
        }
        let background;
        let glyph;
        if(banner.icon){
            if(banner.icon.background){
                background = banner.icon.background;
            }
            if(banner.icon.glyph){
                glyph = banner.icon.glyph;
            }
        }

        return (
            <td data-title={this.headerForColumn(0)}>
                <div className="mr-3 d-block">
                    <div className="step mx-0">
                        <span className={`step-icon step-icon-xs ${background}`}>
                            {netContact ? 
                                <ContactAvatar size={AVT_SIZE_MINI} contact={contact}/> :
                                <i className={`fa fa-fw ${glyph}`}/>}
                        </span>
                    </div>
                </div>
            </td>
        )
    }
    renderTimestamp(item){
        const timestamp = item.time;
        const longDate = formatAbsoluteDate(timestamp, DATE_FORMAT_LONG);
        const smartDate = formatRelativeDate(timestamp, DATE_FORMAT_SMART);
        return (
            <td data-title={this.headerForColumn(1)}>
                {timestamp &&
                <>
                    <h5 className="mb-0">{longDate}</h5>
                    <p className="mb-0 small text-secondary">{smartDate}</p>
                </>}
            </td>
        )
    }
    renderSubjectCell(banner) {
        let icon = banner.supportPicture;
        
        
        return (
            <td data-title={this.headerForColumn(2)}>
                <div className="d-flex align-items-center justify-content-center">
                    {icon && !icon.startsWith("http") && <DeviceTypeIcon type={icon} size={32} color={TINT_DARK}/>}
                    {icon && icon.startsWith("http") && <img src={icon} height={32} className={"d-block mx-auto"} />}
                </div>
            </td>
            
        )
    }

    renderDetailCell(banner) {      
        return (
            <td data-title={this.headerForColumn(3)}>
                <div className="d-flex align-items-center">
                    <div className="d-inline-block ml-2">
                        <h5 className="mb-0">{banner.title}</h5>
                        <p className="mb-0">{banner.body}</p>
                    </div>
                </div>
            </td>
        )
    }

    renderActions(item) {
        if(item && item.data && item.data.banner && item.data.banner.link){
            return (
                <td className="text-md-right" data-title={this.headerForColumn(4)}>
                    <ActionButton 
                        action={()=>this.onClickNotification(item.data)}
                        chevron={"fa-chevron-right"}
                        type={BTN_TYPE_SOFT}
                        tint={BTN_TINT_PRIMARY}
                        rounded={true}
                        className="mr-2"
                        title={intl.get("generic_inspect")}
                        titleClass="d-md-none" />
                </td>
                
            )
        }
        return <td></td>;
        
    }

    headerForColumn(idx) {
        if (idx === 0) return intl.get("timeline_table_header_state");
        if (idx === 1) return intl.get("timeline_table_header_when");
        if (idx === 2) return '';
        if (idx === 3) return intl.get("timeline_table_header_details");
        if (idx === 4) return intl.get("generic_actions");
        return '';
    }

}

NotificationTimelineTableRow.propTypes = {
    item: PropTypes.object,
    onClickNotification: PropTypes.func
}