import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TermsOfServicePage extends Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                <h1 style={{ borderBottom: "2px solid black" }}>Terms of Service</h1>
                <p>All ClassicBlacklist.com users must agree to the following <nobr>Terms Of Service.</nobr></p>
                <ol>
                    <li>Users of ClassicBlacklist.com must be at least 13 years of age.</li>
                    <li>ClassicBlacklist.com reserves the right to modify the Terms of Participation at any time and without prior notice to its users.</li>
                    <li>ClassicBlacklist.com reserves the right to block user access to the account.</li>
                    <li>False, defamatory, inaccurate, abusive, vulgar, hateful, harassing, obscene, profane, sexually oriented, threatening, invasive of a person's privacy, adult materials are prohibited on ClassicBlacklist.com, ClassicBlacklist.com reserve the right to remove such content, suspend or delete account involved.</li>
                    <li>ClassicBlacklist.com forbids spam, flooding, advertisements, chain letters, pyramid schemes, and solicitations. ClassicBlacklist.com reserve the right to remove such content, suspend or delete account involved.</li>
                    <li>Users of ClassicBlacklist.com must agree to comply with all laws which apply to their location, including copyright and trademark laws.</li>
                    <li>ClassicBlacklist.com does not warrant the accuracy, completeness, or usefulness of any information presented.</li>
                    <li>As a user of ClassicBlacklist.com you agree that ClassicBlacklist.com is not liable for the content due to the unavailability or loss of the website. ClassicBlacklist.com makes no claims of future reliability in serving, hosting or storing the content.</li>
                    <li>ClassicBlacklist.com will cooperate with any and all legal authorities if an investigation should arise.</li>
                    <li>ClassicBlacklist.com may include links or references to other web sites or services solely as a convenience to Users ("Reference Sites"). ClassicBlacklist.com does not endorse any such Reference Sites or the information, materials, products, or services contained on or accessible through Reference Sites. In addition, your correspondence or business dealings with, or participation in promotions of, advertisers found on or through ClassicBlacklist.com are solely between you and such advertiser. Access and use of Reference Sites, including the information, materials, products, and services on or available through Reference Sites is solely at your own risk.</li>
                </ol>
                <p style={{ width: "100%" }}>The Burning Crusade and World of Warcraft are registered trademarks of <nobr><a href="http://blizzard.com">Blizzard Entertainment, Inc</a></nobr>.<br/> ClassicBlacklist.com is in no way associated with or endorsed by Blizzard Entertainment.</p>
            </div>
        );
    }
}

export default withRouter(TermsOfServicePage);