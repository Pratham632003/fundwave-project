import React, { Fragment } from 'react';
import './Footer.css';
import { VscGithubInverted } from "react-icons/vsc";
import { VscOctoface } from "react-icons/vsc";
import { VscTwitter } from "react-icons/vsc";


const Footer = () => {
    return (
        <Fragment>
            <div className='footer'>
                <div className='footer__left'>
                    <div className='footer__heading'>
                        <p>Scholyz</p>
                    </div>
                    <div className='footer__quote'>
                        <p>Our vision is to make all people the best place to study for them</p>
                    </div>
                    <div className='footer__copyright'>@2021 Scholyz</div>
                </div>

                <div className='footer__right'>
                    <div className='footer__right__row1'>
                        <div className='footer__right__heading'>About</div>
                        <div className='footer__right__content'>
                            <p>About us</p>
                            <p>Features</p>
                            <p>News and blogs</p>
                        </div>
                    </div>
                    <div className='footer__right__row2'>
                        <div className='footer__right__heading'>Company</div>
                        <div className='footer__right__content'>
                            <p>How we work?</p>
                            <p>Capital</p>
                            <p>Security</p>
                        </div>
                    </div>
                    <div className='footer__right__row3'>
                        <div className='footer__right__heading'>Support</div>
                        <div className='footer__right__content'>
                            <p>FAQs</p>
                            <p>Support Center</p>
                            <p>Contact us</p>
                        </div>
                    </div>
                    <div className='footer__right__row4'>
                        <div className='footer__right__heading'>Social</div>
                        <div className='footer__right__content'>
                            <p><VscGithubInverted /></p>
                            <p><VscOctoface /></p>
                            <p><VscTwitter /></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;
