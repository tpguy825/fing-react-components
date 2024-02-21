import React, {Component} from "react";
import {pageNavigationBar, sectionTitle} from "./ShowcaseUtils";
import ActionButton from "../component/ActionButton";
import ToolHeader from "../component/ToolHeader";
import StatusIcon, {
    SI_SHAPE_CIRCLE,
    SI_SHAPE_SHIELD,
    SI_STATUS_ERROR,
    SI_STATUS_SUCCESS,
    SI_STATUS_SYNC,
    SI_STATUS_WARNING
} from "../component/icons/StatusIcon";
import ProgressBar from "../component/ProgressBar";

export default class ShowcaseHeaders extends Component {
    render() {
        const subtitleComponent = <ul className="list-inline list-separator font-size-1">
            <li className="list-inline-item">
                <i className="fas fa-map-marker-alt text-primary mr-1"/> London, UK
            </li>
            <li className="list-inline-item">maria@gmail.com</li>
            <li className="list-inline-item">+1 (062) 109-9222</li>
        </ul>;

        return (
            <>
                {pageNavigationBar("Headers")}

                <section className="container mt-10 mb-5">
                    <h2>Headers</h2>
                    <p>
                        Use Visual Languages's header as introductory items in pages.
                    </p>

                    {sectionTitle('Tool Header')}
                    <p className='small'>
                        Use the property <code>back</code> to set the back button
                        component, <code>url</code> or <code>action</code> to react
                        properly to button clicks.
                    </p>
                    <hr/>
                    <ToolHeader title='Analysing your setup'
                                subtitle='11 checks completed, 4 pending.'
                                statusIcon={<StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_SYNC} />}
                                progressBar={<ProgressBar value={0} />}
                                className="mb-3"
                    />
                    <ToolHeader title='All good in your network'
                                subtitle='34 checks completed.'
                                statusIcon={<StatusIcon shape={SI_SHAPE_CIRCLE} status={SI_STATUS_SUCCESS} />}
                                action={<ActionButton title="Share" chevron='fa-share'/>}
                                progressBar={<ProgressBar value={0} />}
                                className="mb-3"
                    />
                    <ToolHeader title='Analysing your setup'
                                subtitle='11 checks completed, 4 pending.'
                                action={<ActionButton title="Share" chevron='fa-share'/>}
                                progressBar={<ProgressBar value={35} />}
                                className="mb-3"
                    />
                    <ToolHeader title="Something's wrong"
                                subtitle='11 checks completed, 4 pending.'
                                statusIcon={<StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_WARNING} />}
                                action={<ActionButton title="Share" chevron='fa-share'/>}
                                progressBar={<ProgressBar value={60} />}
                                className="mb-3"
                    />
                    <ToolHeader title="Something's very very wrong"
                                subtitle='11 checks completed, 4 pending.'
                                statusIcon={<StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_ERROR} />}
                                action={<ActionButton title="Share" chevron='fa-share'/>}
                                progressBar={<ProgressBar value={60} barClassName="bg-danger"/>}
                                className="mb-3"
                    />
                    <ToolHeader title="Something's very very wrong"
                                subtitle={subtitleComponent}
                                statusIcon={<StatusIcon shape={SI_SHAPE_SHIELD} status={SI_STATUS_ERROR} />}
                                action={<ActionButton title="Share" chevron='fa-share'/>}
                                progressBar={<ProgressBar value={60} barClassName="bg-danger"/>}
                                className="mb-3"
                    />

                </section>
            </>);
    }

}