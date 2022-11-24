import React from 'react';
const Footer = () => {
    
    return (
        <div className='bg-footer dark:bg-slate-400'>
            <footer className="footer p-10  text-neutral-content">
                <div>
                    <span className="text-black footer-title">Services</span>
                    <a className="text-black link link-hover">Branding</a>
                    <a className="text-black link link-hover">Design</a>
                    <a className="text-black link link-hover">Marketing</a>
                    <a className="text-black link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="text-black footer-title">Company</span>
                    <a className="text-black link link-hover">About us</a>
                    <a className="text-black link link-hover">Contact</a>
                    <a className="text-black link link-hover">Jobs</a>
                    <a className="text-black link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="text-black footer-title">Legal</span>
                    <a className="text-black link link-hover">Terms of use</a>
                    <a className="text-black link link-hover">Privacy policy</a>
                    <a className="text-black link link-hover">Cookie policy</a>
                </div>
            </footer>
            <h1 className='text-sm text-center font-bold'>Copyright © 2022 - All right reserved by Doctor Portal Ltd</h1>
        </div>
    );
};

export default Footer;