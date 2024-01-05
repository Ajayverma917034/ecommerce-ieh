import React from 'react'
import './Footer.css'
import { Call, Facebook, Instagram, Mail, WhatsApp } from "@mui/icons-material"

const Footer = () => {
    return (
        <footer>
            <div id="footer_content">
                <div id="footer_contacts">
                    <h1>Logo</h1>
                    <p>It's all about your dreams.</p>

                    <div id="footer_social_media">
                        <a href="/" class="footer-link" id="instagram">
                            <Instagram />
                        </a>

                        <a href="/" class="footer-link" id="facebook">
                            <Facebook />
                        </a>

                        <a href="/" class="footer-link" id="whatsapp">
                            <WhatsApp />
                        </a>
                    </div>
                </div>

                <ul class="footer-list">
                    <li>
                        <h3>Useful Links</h3>
                    </li>
                    <li>
                        <a href="/service" class="footer-link">Services</a>
                    </li>
                    <li>
                        <a href="/about" class="footer-link">About Us</a>
                    </li>
                    <li>
                        <a href="/contact" class="footer-link">Contact Us</a>
                    </li>
                </ul>

                <ul class="footer-list">
                    <li>
                        <h3>Products</h3>
                    </li>
                    <li>
                        <a href="/" class="footer-link">App</a>
                    </li>
                    <li>
                        <a href="/" class="footer-link">Desktop</a>
                    </li>
                    <li>
                        <a href="/" class="footer-link">Cloud</a>
                    </li>
                </ul>

                <div id="footer_subscribe">
                    <h3>Know more</h3>
                    <ul className='footer-link'>
                        <li><a href="/" className="footer-link"><Mail /></a></li>
                        <li><a href="/" className="footer-link"><Call /></a></li>

                    </ul>
                </div>
            </div>

            <div id="footer_copyright">
                {
                    new Date().getFullYear()
                }
                &nbsp;All rights reserved
            </div>
        </footer>
    )
}

export default Footer