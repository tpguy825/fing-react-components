/**
 * Created by marco on 2/6/21.
 *
 * (C) Copyright Fing
 */

import React, {Component} from 'react';

import {ReactComponent as Generic} from "../../assets/svg/device/generic_24.svg";
import {ReactComponent as Mobile} from "../../assets/svg/device/mobile_24.svg";
import {ReactComponent as Tablet} from "../../assets/svg/device/tablet_24.svg";
import {ReactComponent as IPod} from "../../assets/svg/device/ipod_24.svg";
import {ReactComponent as EReader} from "../../assets/svg/device/ereader_24.svg";
import {ReactComponent as Watch} from "../../assets/svg/device/watch_24.svg";
import {ReactComponent as Wearable} from "../../assets/svg/device/wearable_24.svg";
import {ReactComponent as Car} from "../../assets/svg/device/car_24.svg";

import {ReactComponent as MediaPlayer} from "../../assets/svg/device/media_player_24.svg";
import {ReactComponent as Television} from "../../assets/svg/device/television_24.svg";
import {ReactComponent as GameConsole} from "../../assets/svg/device/game_console_24.svg";
import {ReactComponent as StreamingDongle} from "../../assets/svg/device/streaming_dongle_24.svg";
import {ReactComponent as Loudspeaker} from "../../assets/svg/device/loudspeaker_24.svg";
import {ReactComponent as SoundSystem} from "../../assets/svg/device/sound_system_24.svg";
import {ReactComponent as SetTopBox} from "../../assets/svg/device/stb_24.svg";
import {ReactComponent as DiscPlayer} from "../../assets/svg/device/disc_player_24.svg";
import {ReactComponent as Satellite} from "../../assets/svg/device/satellite_24.svg";
import {ReactComponent as Music} from "../../assets/svg/device/music_24.svg";
import {ReactComponent as RemoteControl} from "../../assets/svg/device/remote_control_24.svg";
import {ReactComponent as Radio} from "../../assets/svg/device/radio_24.svg";
import {ReactComponent as PhotoCamera} from "../../assets/svg/device/photo_camera_24.svg";
import {ReactComponent as Photos} from "../../assets/svg/device/photos_24.svg";
import {ReactComponent as Microphone} from "../../assets/svg/device/microphone_24.svg";
import {ReactComponent as Projector} from "../../assets/svg/device/projector_24.svg";

import {ReactComponent as Computer} from "../../assets/svg/device/computer_24.svg";
import {ReactComponent as Laptop} from "../../assets/svg/device/laptop_24.svg";
import {ReactComponent as Desktop} from "../../assets/svg/device/desktop_24.svg";
import {ReactComponent as Printer} from "../../assets/svg/device/printer_24.svg";
import {ReactComponent as Phone} from "../../assets/svg/device/phone_24.svg";
import {ReactComponent as VoIP} from "../../assets/svg/device/voip_24.svg";
import {ReactComponent as Conferencing} from "../../assets/svg/device/conferencing_24.svg";
import {ReactComponent as Scanner} from "../../assets/svg/device/scanner_24.svg";
import {ReactComponent as Pos} from "../../assets/svg/device/pos_24.svg";
import {ReactComponent as Clock} from "../../assets/svg/device/clock_24.svg";
import {ReactComponent as Barcode} from "../../assets/svg/device/barcode_24.svg";

import {ReactComponent as Surveillance} from "../../assets/svg/device/surveillance_camera_24.svg";
import {ReactComponent as SmartHome} from "../../assets/svg/device/smart_home_24.svg";
import {ReactComponent as SmartPlug} from "../../assets/svg/device/smart_plug_24.svg";
import {ReactComponent as Light} from "../../assets/svg/device/light_24.svg";
import {ReactComponent as VoiceControl} from "../../assets/svg/device/voice_control_24.svg";
import {ReactComponent as Thermostat} from "../../assets/svg/device/thermostat_24.svg";
import {ReactComponent as PowerSystem} from "../../assets/svg/device/power_system_24.svg";
import {ReactComponent as SolarPanel} from "../../assets/svg/device/solar_panel_24.svg";
import {ReactComponent as SmartMeter} from "../../assets/svg/device/smart_meter_24.svg";
import {ReactComponent as Heating} from "../../assets/svg/device/heating_24.svg";
import {ReactComponent as Appliance} from "../../assets/svg/device/appliance_24.svg";
import {ReactComponent as Washer} from "../../assets/svg/device/washer_24.svg";
import {ReactComponent as Fridge} from "../../assets/svg/device/fridge_24.svg";
import {ReactComponent as Cleaner} from "../../assets/svg/device/cleaner_24.svg";
import {ReactComponent as Sleep} from "../../assets/svg/device/sleep_24.svg";
import {ReactComponent as Fitness} from "../../assets/svg/device/fitness_24.svg";
import {ReactComponent as Garage} from "../../assets/svg/device/garage_24.svg";
import {ReactComponent as Pool} from "../../assets/svg/device/pool_24.svg";
import {ReactComponent as Sprinkler} from "../../assets/svg/device/sprinkler_24.svg";
import {ReactComponent as Bell} from "../../assets/svg/device/bell_24.svg";
import {ReactComponent as KeyLock} from "../../assets/svg/device/key_lock_24.svg";
import {ReactComponent as ControlPanel} from "../../assets/svg/device/control_panel_24.svg";
import {ReactComponent as SmartController} from "../../assets/svg/device/smart_controller_24.svg";
import {ReactComponent as Scale} from "../../assets/svg/device/scale_24.svg";
import {ReactComponent as Toy} from "../../assets/svg/device/toy_24.svg";
import {ReactComponent as Robot} from "../../assets/svg/device/robot_24.svg";
import {ReactComponent as Weather} from "../../assets/svg/device/weather_24.svg";
import {ReactComponent as HealthMonitor} from "../../assets/svg/device/health_monitor_24.svg";
import {ReactComponent as BabyMonitor} from "../../assets/svg/device/baby_monitor_24.svg";
import {ReactComponent as PetMonitor} from "../../assets/svg/device/pet_monitor_24.svg";
import {ReactComponent as Alarm} from "../../assets/svg/device/alarm_24.svg";
import {ReactComponent as MotionDetector} from "../../assets/svg/device/motion_detector_24.svg";
import {ReactComponent as SecuritySystem} from "../../assets/svg/device/security_system_24.svg";
import {ReactComponent as Smoke} from "../../assets/svg/device/smoke_24.svg";
import {ReactComponent as Humidity} from "../../assets/svg/device/humidity_24.svg";
import {ReactComponent as Sensor} from "../../assets/svg/device/sensor_24.svg";
import {ReactComponent as Fingbox} from "../../assets/svg/device/fingbox_24.svg";
import {ReactComponent as DomotzBox} from "../../assets/svg/device/domotz_box_24.svg";

import {ReactComponent as Router} from "../../assets/svg/device/router_24.svg";
import {ReactComponent as Wifi} from "../../assets/svg/device/wifi_24.svg";
import {ReactComponent as WifiExtender} from "../../assets/svg/device/wifi_extender_24.svg";
import {ReactComponent as NasStorage} from "../../assets/svg/device/nas_storage_24.svg";
import {ReactComponent as Modem} from "../../assets/svg/device/modem_24.svg";
import {ReactComponent as Switch} from "../../assets/svg/device/switch_24.svg";
import {ReactComponent as Gateway} from "../../assets/svg/device/gateway_24.svg";
import {ReactComponent as Firewall} from "../../assets/svg/device/firewall_24.svg";
import {ReactComponent as Vpn} from "../../assets/svg/device/vpn_24.svg";
import {ReactComponent as Poe} from "../../assets/svg/device/poe_plug_24.svg";
import {ReactComponent as Usb} from "../../assets/svg/device/usb_24.svg";
import {ReactComponent as SmallCell} from "../../assets/svg/device/small_cell_24.svg";
import {ReactComponent as Cloud} from "../../assets/svg/device/cloud_24.svg";
import {ReactComponent as Battery} from "../../assets/svg/device/battery_24.svg";
import {ReactComponent as NetworkAppliance} from "../../assets/svg/device/network_appliance_24.svg";

import {ReactComponent as VirtualMachine} from "../../assets/svg/device/virtual_machine_24.svg";
import {ReactComponent as Server} from "../../assets/svg/device/server_24.svg";
import {ReactComponent as Terminal} from "../../assets/svg/device/terminal_24.svg";
import {ReactComponent as MailServer} from "../../assets/svg/device/mail_server_24.svg";
import {ReactComponent as FileServer} from "../../assets/svg/device/file_server_24.svg";
import {ReactComponent as ProxyServer} from "../../assets/svg/device/proxy_server_24.svg";
import {ReactComponent as WebServer} from "../../assets/svg/device/web_server_24.svg";
import {ReactComponent as DomainServer} from "../../assets/svg/device/domain_server_24.svg";
import {ReactComponent as Communication} from "../../assets/svg/device/communication_24.svg";
import {ReactComponent as Database} from "../../assets/svg/device/database_24.svg";

import {ReactComponent as Raspberry} from "../../assets/svg/device/raspberry_24.svg";
import {ReactComponent as Arduino} from "../../assets/svg/device/arduino_24.svg";
import {ReactComponent as Processor} from "../../assets/svg/device/processor_24.svg";
import {ReactComponent as CircuitCard} from "../../assets/svg/device/circuit_card_24.svg";
import {ReactComponent as Rfid} from "../../assets/svg/device/rfid_24.svg";

import {ReactComponent as Industrial} from "../../assets/svg/device/industrial_24.svg";
import {ReactComponent as Medical} from "../../assets/svg/device/medical_24.svg";
import {ReactComponent as Automotive} from "../../assets/svg/device/automotive_24.svg";
import {ReactComponent as Energy} from "../../assets/svg/device/electric_24.svg";
import {ReactComponent as Automatic} from "../../assets/svg/generic/automatic.svg";

import {
    DT_ALARM,
    DT_ALL_TYPES,
    DT_APPLIANCE,
    DT_ARDUINO,
    DT_AUTOMOTIVE,
    DT_BABY_MONITOR,
    DT_BARCODE,
    DT_BATTERY,
    DT_BELL,
    DT_CAR,
    DT_CIRCUIT_CARD,
    DT_CLEANER,
    DT_CLOCK,
    DT_CLOUD,
    DT_COMMUNICATION,
    DT_COMPUTER,
    DT_CONFERENCING,
    DT_CONTROL_PANEL,
    DT_DATABASE,
    DT_DESKTOP,
    DT_DISC_PLAYER,
    DT_DOMAIN_SERVER,
    DT_DOMOTZ_BOX,
    DT_ENERGY,
    DT_EREADER,
    DT_FILE_SERVER,
    DT_FINGBOX,
    DT_FIREWALL,
    DT_FITNESS,
    DT_FRIDGE,
    DT_GAME_CONSOLE,
    DT_GARAGE,
    DT_GATEWAY,
    DT_GENERIC,
    DT_HEALTH_MONITOR,
    DT_HEATING,
    DT_HUMIDITY,
    DT_INDUSTRIAL,
    DT_IPOD,
    DT_KEY_LOCK,
    DT_LAPTOP,
    DT_LIGHT,
    DT_LOUDSPEAKER,
    DT_MAIL_SERVER,
    DT_MEDIA_PLAYER,
    DT_MEDICAL,
    DT_MICROPHONE,
    DT_MOBILE,
    DT_MODEM,
    DT_MOTION_DETECTOR,
    DT_MUSIC,
    DT_NAS_STORAGE,
    DT_NETWORK_APPLIANCE,
    DT_PET_MONITOR,
    DT_PHONE,
    DT_PHOTO_CAMERA,
    DT_PHOTOS,
    DT_POE_PLUG,
    DT_POOL,
    DT_POS,
    DT_POWER_SYSTEM,
    DT_PRINTER,
    DT_PROCESSOR,
    DT_PROJECTOR,
    DT_PROXY_SERVER,
    DT_RADIO,
    DT_RASPBERRY,
    DT_REMOTE_CONTROL,
    DT_RFID,
    DT_ROBOT,
    DT_ROUTER,
    DT_SATELLITE,
    DT_SCALE,
    DT_SCANNER,
    DT_SECURITY_SYSTEM,
    DT_SENSOR,
    DT_SERVER,
    DT_SLEEP,
    DT_SMALL_CELL,
    DT_SMART_CONTROLLER,
    DT_SMART_HOME,
    DT_SMART_METER,
    DT_SMART_PLUG,
    DT_SMOKE,
    DT_SOLAR_PANEL,
    DT_SOUND_SYSTEM,
    DT_SPRINKLER,
    DT_STB,
    DT_STREAMING_DONGLE,
    DT_SURVEILLANCE_CAMERA,
    DT_SWITCH,
    DT_TABLET,
    DT_TELEVISION,
    DT_TERMINAL,
    DT_THERMOSTAT,
    DT_TOY,
    DT_USB,
    DT_VIRTUAL_MACHINE,
    DT_VOICE_CONTROL,
    DT_VOIP,
    DT_VPN,
    DT_WASHER,
    DT_WATCH,
    DT_WEARABLE,
    DT_WEATHER,
    DT_WEB_SERVER,
    DT_WIFI,
    DT_AUTOMATIC,
    DT_WIFI_EXTENDER,
    TINT_PRIMARY,
    TINT_SECONDARY,
    TINT_SUCCESS,
    TINT_WARNING,
    TINT_DANGER,
    TINT_NAVY,
    TINT_DARK,
    TINT_WHITE
} from '../../model/Constants';

const defaultIconSize = "24px";

/**
 */
export default class DeviceTypeIcon extends Component {

    tintToClass(tint){
        if (!tint) return "fill-dark";
        switch (tint) {
            case TINT_WHITE: return "fill-white";
            case TINT_PRIMARY: return "fill-primary";
            case TINT_SECONDARY: return "fill-secondary";
            case TINT_SUCCESS: return "fill-success";
            case TINT_WARNING: return "fill-warning";
            case TINT_DANGER: return "fill-danger";
            case TINT_NAVY: return "fill-navy";
            case TINT_DARK: return "fill-dark";
            default: return "fill-dark";
        }
    }

    render() {
        const { type, size, tint } = this.props;

        if (!DT_ALL_TYPES.includes(type))
            return "";

        const className = this.props.className || '';
        const currentTint = this.tintToClass(tint);
        const iconSize = size || defaultIconSize;
        return <figure className={`svg-icon ${currentTint} ${className}`}>{this.renderIcon(type, iconSize)}</figure>;
    }

    renderIcon(type, iconSize) {
        if (!type) return "";

        switch (type.toUpperCase()) {
            // Personal devices
            case DT_AUTOMATIC:
                return <Automatic width={iconSize} height={iconSize} />;
            case DT_GENERIC:
                return <Generic width={iconSize} height={iconSize} />;
            case DT_MOBILE:
                return <Mobile width={iconSize} height={iconSize} />;
            case DT_TABLET:
                return <Tablet width={iconSize} height={iconSize} />;
            case DT_IPOD:
                return <IPod width={iconSize} height={iconSize} />;
            case DT_EREADER:
                return <EReader width={iconSize} height={iconSize} />;
            case DT_WATCH:
                return <Watch width={iconSize} height={iconSize} />;
            case DT_WEARABLE:
                return <Wearable width={iconSize} height={iconSize} />;
            case DT_CAR:
                return <Car width={iconSize} height={iconSize} />;

            // Audio & Video
            case DT_MEDIA_PLAYER:
                return <MediaPlayer width={iconSize} height={iconSize} />;
            case DT_TELEVISION:
                return <Television width={iconSize} height={iconSize} />;
            case DT_GAME_CONSOLE:
                return <GameConsole width={iconSize} height={iconSize} />;
            case DT_STREAMING_DONGLE:
                return <StreamingDongle width={iconSize} height={iconSize} />;
            case DT_LOUDSPEAKER:
                return <Loudspeaker width={iconSize} height={iconSize} />;
            case DT_SOUND_SYSTEM:
                return <SoundSystem width={iconSize} height={iconSize} />;
            case DT_STB:
                return <SetTopBox width={iconSize} height={iconSize} />;
            case DT_DISC_PLAYER:
                return <DiscPlayer width={iconSize} height={iconSize} />;
            case DT_SATELLITE:
                return <Satellite width={iconSize} height={iconSize} />;
            case DT_MUSIC:
                return <Music width={iconSize} height={iconSize} />;
            case DT_REMOTE_CONTROL:
                return <RemoteControl width={iconSize} height={iconSize} />;
            case DT_RADIO:
                return <Radio width={iconSize} height={iconSize} />;
            case DT_PHOTO_CAMERA:
                return <PhotoCamera width={iconSize} height={iconSize} />;
            case DT_PHOTOS:
                return <Photos width={iconSize} height={iconSize} />;
            case DT_MICROPHONE:
                return <Microphone width={iconSize} height={iconSize} />;
            case DT_PROJECTOR:
                return <Projector width={iconSize} height={iconSize} />;

            // Home & Office
            case DT_COMPUTER:
                return <Computer width={iconSize} height={iconSize} />;
            case DT_LAPTOP:
                return <Laptop width={iconSize} height={iconSize} />;
            case DT_DESKTOP:
                return <Desktop width={iconSize} height={iconSize} />;
            case DT_PRINTER:
                return <Printer width={iconSize} height={iconSize} />;
            case DT_PHONE:
                return <Phone width={iconSize} height={iconSize} />;
            case DT_VOIP:
                return <VoIP width={iconSize} height={iconSize} />;
            case DT_CONFERENCING:
                return <Conferencing width={iconSize} height={iconSize} />;
            case DT_SCANNER:
                return <Scanner width={iconSize} height={iconSize} />;
            case DT_POS:
                return <Pos width={iconSize} height={iconSize} />;
            case DT_CLOCK:
                return <Clock width={iconSize} height={iconSize} />;
            case DT_BARCODE:
                return <Barcode width={iconSize} height={iconSize} />;

            // Smart Home
            case DT_SURVEILLANCE_CAMERA:
                return <Surveillance width={iconSize} height={iconSize} />;
            case DT_SMART_HOME:
                return <SmartHome width={iconSize} height={iconSize} />;
            case DT_SMART_PLUG:
                return <SmartPlug width={iconSize} height={iconSize} />;
            case DT_LIGHT:
                return <Light width={iconSize} height={iconSize} />;
            case DT_VOICE_CONTROL:
                return <VoiceControl width={iconSize} height={iconSize} />;
            case DT_THERMOSTAT:
                return <Thermostat width={iconSize} height={iconSize} />;
            case DT_POWER_SYSTEM:
                return <PowerSystem width={iconSize} height={iconSize} />;
            case DT_SOLAR_PANEL:
                return <SolarPanel width={iconSize} height={iconSize} />;
            case DT_SMART_METER:
                return <SmartMeter width={iconSize} height={iconSize} />;
            case DT_HEATING:
                return <Heating width={iconSize} height={iconSize} />;
            case DT_APPLIANCE:
                return <Appliance width={iconSize} height={iconSize} />;
            case DT_WASHER:
                return <Washer width={iconSize} height={iconSize} />;
            case DT_FRIDGE:
                return <Fridge width={iconSize} height={iconSize} />;
            case DT_CLEANER:
                return <Cleaner width={iconSize} height={iconSize} />;
            case DT_SLEEP:
                return <Sleep width={iconSize} height={iconSize} />;
            case DT_FITNESS:
                return <Fitness width={iconSize} height={iconSize} />;
            case DT_GARAGE:
                return <Garage width={iconSize} height={iconSize} />;
            case DT_POOL:
                return <Pool width={iconSize} height={iconSize} />;
            case DT_SPRINKLER:
                return <Sprinkler width={iconSize} height={iconSize} />;
            case DT_BELL:
                return <Bell width={iconSize} height={iconSize} />;
            case DT_KEY_LOCK:
                return <KeyLock width={iconSize} height={iconSize} />;
            case DT_CONTROL_PANEL:
                return <ControlPanel width={iconSize} height={iconSize} />;
            case DT_SMART_CONTROLLER:
                return <SmartController width={iconSize} height={iconSize} />;
            case DT_SCALE:
                return <Scale width={iconSize} height={iconSize} />;
            case DT_TOY:
                return <Toy width={iconSize} height={iconSize} />;
            case DT_ROBOT:
                return <Robot width={iconSize} height={iconSize} />;
            case DT_WEATHER:
                return <Weather width={iconSize} height={iconSize} />;
            case DT_HEALTH_MONITOR:
                return <HealthMonitor width={iconSize} height={iconSize} />;
            case DT_BABY_MONITOR:
                return <BabyMonitor width={iconSize} height={iconSize} />;
            case DT_PET_MONITOR:
                return <PetMonitor width={iconSize} height={iconSize} />;
            case DT_ALARM:
                return <Alarm width={iconSize} height={iconSize} />;
            case DT_MOTION_DETECTOR:
                return <MotionDetector width={iconSize} height={iconSize} />;
            case DT_SECURITY_SYSTEM:
                return <SecuritySystem width={iconSize} height={iconSize} />;
            case DT_SMOKE:
                return <Smoke width={iconSize} height={iconSize} />;
            case DT_HUMIDITY:
                return <Humidity width={iconSize} height={iconSize} />;
            case DT_SENSOR:
                return <Sensor width={iconSize} height={iconSize} />;
            case DT_FINGBOX:
                return <Fingbox width={iconSize} height={iconSize} />;
            case DT_DOMOTZ_BOX:
                return <DomotzBox width={iconSize} height={iconSize} />;

            case DT_ROUTER:
                return <Router width={iconSize} height={iconSize} />;
            case DT_WIFI:
                return <Wifi width={iconSize} height={iconSize} />;
            case DT_WIFI_EXTENDER:
                return <WifiExtender width={iconSize} height={iconSize} />;
            case DT_NAS_STORAGE:
                return <NasStorage width={iconSize} height={iconSize} />;
            case DT_MODEM:
                return <Modem width={iconSize} height={iconSize} />;
            case DT_SWITCH:
                return <Switch width={iconSize} height={iconSize} />;
            case DT_GATEWAY:
                return <Gateway width={iconSize} height={iconSize} />;
            case DT_FIREWALL:
                return <Firewall width={iconSize} height={iconSize} />;
            case DT_VPN:
                return <Vpn width={iconSize} height={iconSize} />;
            case DT_POE_PLUG:
                return <Poe width={iconSize} height={iconSize} />;
            case DT_USB:
                return <Usb width={iconSize} height={iconSize} />;
            case DT_SMALL_CELL:
                return <SmallCell width={iconSize} height={iconSize} />;
            case DT_CLOUD:
                return <Cloud width={iconSize} height={iconSize} />;
            case DT_BATTERY:
                return <Battery width={iconSize} height={iconSize} />;
            case DT_NETWORK_APPLIANCE:
                return <NetworkAppliance width={iconSize} height={iconSize} />;

            case DT_VIRTUAL_MACHINE:
                return <VirtualMachine width={iconSize} height={iconSize} />;
            case DT_SERVER:
                return <Server width={iconSize} height={iconSize} />;
            case DT_TERMINAL:
                return <Terminal width={iconSize} height={iconSize} />;
            case DT_MAIL_SERVER:
                return <MailServer width={iconSize} height={iconSize} />;
            case DT_FILE_SERVER:
                return <FileServer width={iconSize} height={iconSize} />;
            case DT_PROXY_SERVER:
                return <ProxyServer width={iconSize} height={iconSize} />;
            case DT_WEB_SERVER:
                return <WebServer width={iconSize} height={iconSize} />;
            case DT_DOMAIN_SERVER:
                return <DomainServer width={iconSize} height={iconSize} />;
            case DT_COMMUNICATION:
                return <Communication width={iconSize} height={iconSize} />;
            case DT_DATABASE:
                return <Database width={iconSize} height={iconSize} />;

            case DT_RASPBERRY:
                return <Raspberry width={iconSize} height={iconSize} />;
            case DT_ARDUINO:
                return <Arduino width={iconSize} height={iconSize} />;
            case DT_PROCESSOR:
                return <Processor width={iconSize} height={iconSize} />;
            case DT_CIRCUIT_CARD:
                return <CircuitCard width={iconSize} height={iconSize} />;
            case DT_RFID:
                return <Rfid width={iconSize} height={iconSize} />;

            case DT_INDUSTRIAL:
                return <Industrial width={iconSize} height={iconSize} />;
            case DT_MEDICAL:
                return <Medical width={iconSize} height={iconSize} />;
            case DT_AUTOMOTIVE:
                return <Automotive width={iconSize} height={iconSize} />;
            case DT_ENERGY:
                return <Energy width={iconSize} height={iconSize} />;

            default:
                return "";
        }

    }

}